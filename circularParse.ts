export function circularParse(value: string): any {
    const map = new Map<number, any>();
    const calls: (() => void)[] = [];
    const result = JSON.parse(value, (k, v) => {
        if (typeof v !== "object" || v === null) return v;

        const id = v?.["Symbol.identity"];
        calls.push(() => {
            Object.keys(v).forEach((key) => {
                const rf = v[key]?.["Symbol.reference"];

                if (typeof rf !== "undefined") {
                    if (map.has(rf)) {
                        v[key] = map.get(rf);
                    }
                }
            });
        });

        if (typeof id !== "undefined") {
            map.set(id, v);
            Reflect.deleteProperty(v, "Symbol.identity");
            return v;
        }
        return v;
    });
    calls.forEach((call) => call());

    return result;
}

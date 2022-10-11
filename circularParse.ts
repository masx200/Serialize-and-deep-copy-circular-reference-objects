export function circularParse(value: string): any {
    const map = new Map<number, any>();
    const calls: (() => void)[] = [];
    const result = JSON.parse(value, (k, v) => {
        if (typeof v !== "object" || v === null) return v;

        const id = v?.["Symbol.identity"];
        calls.push(() => {
            // console.log("call", v);
            Object.keys(v).forEach((key) => {
                const rf = v[key]?.["Symbol.reference"];
                // console.log([v, key, v[key], rf]);
                if (typeof rf !== "undefined") {
                    // console.log(v, key, v[key], rf);

                    // console.log(v, key, rf, map.get(rf));
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
        return v
    });
    calls.forEach((call) => call());
    // console.log(map);
    return result;
}

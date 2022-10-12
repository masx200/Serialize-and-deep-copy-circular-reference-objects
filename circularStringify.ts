export function circularStringify(
    value: any,
    space: string | number = 4,
): string {
    const map = new Map<any, number>();
    const calls: (() => void)[] = [];
    const result = JSON.stringify(
        value,
        (_k, v) => {
            if (typeof v !== "object" || v === null) return v;
            calls.push(() => {
                Reflect.deleteProperty(v, "Symbol.identity");
            });
            const id = map.get(v) ?? map.size;
            if (map.has(v)) {
                return { "Symbol.reference": id };
            } else {
                map.set(v, id);

                return Object.assign(v, {
                    ...v,
                    "Symbol.identity": id,
                });
            }
        },
        space,
    );
    calls.forEach((call) => call());
    return result;
}

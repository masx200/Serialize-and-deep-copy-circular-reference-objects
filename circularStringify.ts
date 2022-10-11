export function circularStringify(value: any): string {
    const map = new Map<any, number>();

    return JSON.stringify(
        value,
        (k, v) => {
            if (typeof v !== "object" || v === null) return v;
            const id = map.get(v) ?? map.size;
            if (map.has(v)) {
                return { "Symbol.reference": id };
            } else {
                map.set(v, id);

                return Object.assign(
                    v,
                    {
                        ...v,
                        "Symbol.identity": id,
                    },
                );
            }
        },
        4,
    );
}

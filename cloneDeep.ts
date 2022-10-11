import { ListNode } from "./ListNode.ts";

export function cloneDeep(value: any, map = new Map<any, any>()): any {
    if (map.has(value)) return map.get(value);
    if (typeof value === "bigint") {
        const result: any = Object.assign(
            {},
            {
                value: value.toString(),
                "Symbol.toStringTag": "BigInt",
            },
        );

        map.set(value, result);
        return result;
    }
    if (value instanceof Date) {
        const result = new Date(value);
        map.set(value, result);
        return result;
    }

    if (typeof value !== "object" || value === null) return value;

    if (value instanceof Set) {
        const result: any = {};
        map.set(value, result);
        Object.assign(result, {
            "Symbol.toStringTag": "Set",
        });
        Array.prototype.push.call(
            result,
            ...[...value.values()].map((v) => cloneDeep(v, map)),
        );
        return result;
    }
    if (value instanceof Map) {
        const result: any = {};

        map.set(value, result);
        Object.assign(result, {
            "Symbol.toStringTag": "Map",
        });
        Array.prototype.push.call(
            result,
            ...[...value.entries()].map((v) => cloneDeep(v, map)),
        );
        return result;
    }
    if (value instanceof ListNode) {
        const result: any = Object.assign(new ListNode(), {
            "Symbol.toStringTag": "ListNode",
        });
        map.set(value, result);
        Object.keys(value).forEach(
            (key) => (result[key] = cloneDeep(value[key], map)),
        );
        return result;
    } else {
        const tag = Object.prototype.toString
            .call(value)
            .match(/^\[object (.*)\]$/)?.[1];

        const result: any = Object.assign(
            Object.create(Reflect.getPrototypeOf(value)),
            {
                ...value,

                "Symbol.toStringTag": value["Symbol.toStringTag"] ?? tag,
            },
        );
        if (typeof value?.length !== "undefined") {
            Object.assign(result, { length: value.length });
        }
        map.set(value, result);
        Object.keys(value).forEach(
            (key) => (result[key] = cloneDeep(value[key], map)),
        );
        return result;
    }
}

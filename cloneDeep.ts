import { Customizer } from "./Customizer.ts";
import { ListNode } from "./ListNode.ts";
export function cloneDeep(value: any, ...customizers: Array<Customizer>): any {
    function dfs(value: any, map: Map<any, any>): any {
        if (map.has(value)) return map.get(value);
        for (const customizer of customizers) {
            if (customizer.match(value)) {
                const result = customizer.clone(value);
                map.set(value, result);
                customizer.children?.(value, result, (v) => dfs(v, map));
                return result;
            }
        }
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
                ...[...value.values()].map((v) => dfs(v, map)),
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
                ...[...value.entries()].map((v) => dfs(v, map)),
            );
            return result;
        }
        if (value instanceof ListNode) {
            const result: any = Object.assign(new ListNode(), value, {
                "Symbol.toStringTag": "ListNode",
            });
            map.set(value, result);
            Object.keys(value).forEach(
                (
                    key,
                ) => (result[key] = dfs(Reflect.get(value, key, value), map)),
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
                (key) => (result[key] = dfs(value[key], map)),
            );
            return result;
        }
    }
    return dfs(value, new Map<any, any>());
}

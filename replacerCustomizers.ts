import { Customizer } from "./Customizer.ts";
import { getTag } from "./getTag.ts";
export const replacerCustomizers: Customizer[] = [
    {
        check(value) {
            return typeof value === "bigint";
        },
        clone(value) {
            const tag = getTag(value);
            const result: any = Object.assign(
                {},
                {
                    value: value.toString(),
                    "Symbol.toStringTag": tag,
                },
            );
            return result;
        },
    },
    {
        check(value) {
            return value instanceof Date;
        },
        clone(value) {
            const result = new Date(value);
            return result;
        },
    },
    {
        check(value) {
            return value instanceof Set;
        },
        clone(value) {
            const tag = getTag(value);
            const result: any = {};
            Object.assign(result, {
                "Symbol.toStringTag": tag,
            });
            return result;
        },
        children(value, result, dfs) {
            Array.prototype.push.call(
                result,
                ...[...value.values()].map((v) => dfs(v)),
            );
        },
    },
    {
        check(value) {
            return value instanceof Map;
        },
        clone(value) {
            const tag = getTag(value);
            const result: any = {};
            Object.assign(result, {
                "Symbol.toStringTag": tag,
            });
            return result;
        },
        children(value, result, dfs) {
            Array.prototype.push.call(
                result,
                ...[...value.entries()].map((v) => dfs(v)),
            );
        },
    },
];

import { Customizer } from "./Customizer.ts";
import { getTag } from "./getTag.ts";
import { ListNode } from "./ListNode.ts";
import { TreeNode } from "./TreeNode.ts";
export const replacerCustomizers: Customizer[] = [
    {
        match(value) {
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
        match(value) {
            return value instanceof Date;
        },
        clone(value) {
            const tag = getTag(value);
            const result: any = {};
            Object.assign(result, {
                value: value.toJSON(),
                "Symbol.toStringTag": tag,
            });
            return result;
        },
    },
    {
        match(value) {
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
        match(value) {
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
    {
        match(value) {
            return value instanceof ListNode;
        },
        clone(value) {
            const result: any = new ListNode();
            Object.assign(result, value, {
                "Symbol.toStringTag": "ListNode",
            });
            return result;
        },
        children(value, result, dfs) {
            Object.keys(value).forEach(
                (key) => (result[key] = dfs(value[key])),
            );
        },
    },
    {
        match(value) {
            return value instanceof TreeNode;
        },
        clone(value) {
            const result: any = new TreeNode();
            Object.assign(result, value, {
                "Symbol.toStringTag": "TreeNode",
            });
            return result;
        },
        children(value, result, dfs) {
            Object.keys(value).forEach(
                (key) => (result[key] = dfs(value[key])),
            );
        },
    },
    {
        match(value) {
            return !(typeof value !== "object" || value === null);
        },
        clone(value) {
            const tag = getTag(value);
            const result: any = Object.create(Reflect.getPrototypeOf(value));
            Object.assign(result, value, {
                "Symbol.toStringTag": tag,
            });
            if (typeof value?.length !== "undefined") {
                Object.assign(result, { length: value.length });
            }
            return result;
        },
        children(value, result, dfs) {
            Object.keys(value).forEach(
                (key) => (result[key] = dfs(value[key])),
            );
        },
    },
];

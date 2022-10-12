import { Customizer } from "./Customizer.ts";

import { ListNode } from "./ListNode.ts";
import { TreeNode } from "./TreeNode.ts";
export const reviverCustomizers: Customizer[] = [
    {
        check(value) {
            return value?.["Symbol.toStringTag"] === "BigInt";
        },
        clone(value) {
            return BigInt(value?.value);
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
            return value?.["Symbol.toStringTag"] === "Set";
        },
        clone() {
            const result: any = new Set();

            return result;
        },
        children(value, result, dfs) {
            Array.from(value, (v) => dfs(v)).forEach((v) => result.add(v));
        },
    },
    {
        check(value) {
            return value?.["Symbol.toStringTag"] === "Map";
        },
        clone() {
            const result: any = new Map();

            return result;
        },
        children(value, result, dfs) {
            Array.from(value, (v) => dfs(v)).forEach(([k, v]) =>
                result.set(k, v)
            );
        },
    },
    {
        check(value) {
            return value?.["Symbol.toStringTag"] === "ListNode";
        },
        clone() {
            const result: any = new ListNode();

            return result;
        },
        children(value, result, dfs) {
            Object.keys(value)
                .filter((key) => key !== "Symbol.toStringTag")
                .forEach((key) => (result[key] = dfs(value[key])));
        },
    },
    {
        check(value) {
            return value?.["Symbol.toStringTag"] === "TreeNode";
        },
        clone() {
            const result: any = new TreeNode();

            return result;
        },
        children(value, result, dfs) {
            Object.keys(value)
                .filter((key) => key !== "Symbol.toStringTag")
                .forEach((key) => (result[key] = dfs(value[key])));
        },
    },
    {
        check(value) {
            return !(typeof value !== "object" || value === null);
        },
        clone(value) {
            if (value?.["Symbol.toStringTag"] === "Array") {
                return Array(value.length);
            }
            return { ...value };
        },
        children(value, result, dfs) {
            Object.keys(value)
                .filter((key) => key !== "Symbol.toStringTag")
                .forEach((key) => (result[key] = dfs(value[key])));
            if (["Object", "Array"].includes(value?.["Symbol.toStringTag"])) {
                Reflect.deleteProperty(result, "Symbol.toStringTag");
            }
        },
    },
];

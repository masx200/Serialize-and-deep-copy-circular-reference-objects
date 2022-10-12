import { circularParse } from "./circularParse.ts";
import { circularStringify } from "./circularStringify.ts";
import {
    assert,
    assertEquals,
} from "https://deno.land/std@0.159.0/testing/asserts.ts";
import { teststringify } from "./teststringify.ts";
import { testparse } from "./testparse.ts";
import { ArrayToCircularDoublyTreeList } from "./ArrayToCircularDoublyTreeList.ts";
Deno.test("basic object", () => {
    const obj = {};
    //@ts-ignore
    obj.a = obj;
    const stringified = circularStringify(structuredClone(obj), 0);

    const clone = circularParse(stringified);
    console.log(stringified);
    console.log(obj);
    console.log(clone);
    assert(clone !== obj);
    assertEquals(clone, obj);
    assert(clone.a === clone); // -> true
    assertEquals(
        stringified,
        `{"a":{"Symbol.reference":0},"Symbol.identity":0}`
    );
});
Deno.test("basic array", () => {
    const obj: any[][] = [[1]];
    obj.push(obj);
    const stringified = teststringify(obj);
    console.log(stringified);
    console.log(obj);
    const clone = testparse(stringified);
    assert(clone !== obj);
    assertEquals(clone, obj);
    assertEquals(clone, clone[1]);
    assertEquals(
        stringified,
        `{
    "0": {
        "0": 1,
        "Symbol.toStringTag": "Array",
        "length": 1,
        "Symbol.identity": 1
    },
    "1": {
        "Symbol.reference": 0
    },
    "Symbol.toStringTag": "Array",
    "length": 2,
    "Symbol.identity": 0
}`
    );
});
Deno.test("basic tree list", () => {
    const obj = ArrayToCircularDoublyTreeList(
        Array.from({ length: 10 }, (_, i) => i + 100)
    );
    const stringified = teststringify(obj);
    console.log(stringified);
    console.log(obj);
    const clone = testparse(stringified);
    assert(clone !== obj);
    assertEquals(clone, obj);

    assertEquals(
        stringified,
        `{
    "val": 100,
    "left": {
        "val": 109,
        "left": {
            "val": 108,
            "left": {
                "val": 107,
                "left": {
                    "val": 106,
                    "left": {
                        "val": 105,
                        "left": {
                            "val": 104,
                            "left": {
                                "val": 103,
                                "left": {
                                    "val": 102,
                                    "left": {
                                        "val": 101,
                                        "left": {
                                            "Symbol.reference": 0
                                        },
                                        "right": {
                                            "Symbol.reference": 8
                                        },
                                        "Symbol.toStringTag": "TreeNode",
                                        "Symbol.identity": 9
                                    },
                                    "right": {
                                        "Symbol.reference": 7
                                    },
                                    "Symbol.toStringTag": "TreeNode",
                                    "Symbol.identity": 8
                                },
                                "right": {
                                    "Symbol.reference": 6
                                },
                                "Symbol.toStringTag": "TreeNode",
                                "Symbol.identity": 7
                            },
                            "right": {
                                "Symbol.reference": 5
                            },
                            "Symbol.toStringTag": "TreeNode",
                            "Symbol.identity": 6
                        },
                        "right": {
                            "Symbol.reference": 4
                        },
                        "Symbol.toStringTag": "TreeNode",
                        "Symbol.identity": 5
                    },
                    "right": {
                        "Symbol.reference": 3
                    },
                    "Symbol.toStringTag": "TreeNode",
                    "Symbol.identity": 4
                },
                "right": {
                    "Symbol.reference": 2
                },
                "Symbol.toStringTag": "TreeNode",
                "Symbol.identity": 3
            },
            "right": {
                "Symbol.reference": 1
            },
            "Symbol.toStringTag": "TreeNode",
            "Symbol.identity": 2
        },
        "right": {
            "Symbol.reference": 0
        },
        "Symbol.toStringTag": "TreeNode",
        "Symbol.identity": 1
    },
    "right": {
        "Symbol.reference": 9
    },
    "Symbol.toStringTag": "TreeNode",
    "Symbol.identity": 0
}`
    );
});

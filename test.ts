import { circularParse } from "./circularParse.ts";
import { circularStringify } from "./circularStringify.ts";
import {
    assert,
    assertEquals,
} from "https://deno.land/std@0.159.0/testing/asserts.ts";
import { teststringify } from "./teststringify.ts";
import { testparse } from "./testparse.ts";
import { ArrayToCircularDoublyTreeList } from "./ArrayToCircularDoublyTreeList.ts";
import { createCircular } from "./createCircular.ts";
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
        `{"a":{"Symbol.reference":0},"Symbol.identity":0}`,
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
}`,
    );
});
Deno.test("basic tree list", () => {
    const obj = ArrayToCircularDoublyTreeList(
        Array.from({ length: 10 }, (_, i) => i + 100),
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
}`,
    );
});
Deno.test("all customizers", () => {
    const obj = createCircular();
    const stringified = teststringify(obj);
    console.log(stringified);
    console.log(obj);
    const clone = testparse(stringified);
    assert(clone !== obj);
    assertEquals(clone, obj);

    assertEquals(
        stringified,
        `{
    "0": {
        "value": "1000000000000000000000000000000000000007",
        "Symbol.toStringTag": "BigInt",
        "Symbol.identity": 1
    },
    "1": {
        "val": 50,
        "next": {
            "val": 51,
            "next": {
                "val": 52,
                "next": {
                    "val": 53,
                    "next": {
                        "val": 54,
                        "next": {
                            "val": 55,
                            "next": {
                                "val": 56,
                                "next": {
                                    "val": 57,
                                    "next": {
                                        "val": 58,
                                        "next": {
                                            "val": 59,
                                            "next": {
                                                "Symbol.reference": 2
                                            },
                                            "Symbol.toStringTag": "ListNode",
                                            "Symbol.identity": 11
                                        },
                                        "Symbol.toStringTag": "ListNode",
                                        "Symbol.identity": 10
                                    },
                                    "Symbol.toStringTag": "ListNode",
                                    "Symbol.identity": 9
                                },
                                "Symbol.toStringTag": "ListNode",
                                "Symbol.identity": 8
                            },
                            "Symbol.toStringTag": "ListNode",
                            "Symbol.identity": 7
                        },
                        "Symbol.toStringTag": "ListNode",
                        "Symbol.identity": 6
                    },
                    "Symbol.toStringTag": "ListNode",
                    "Symbol.identity": 5
                },
                "Symbol.toStringTag": "ListNode",
                "Symbol.identity": 4
            },
            "Symbol.toStringTag": "ListNode",
            "Symbol.identity": 3
        },
        "Symbol.toStringTag": "ListNode",
        "Symbol.identity": 2
    },
    "2": {
        "value": "2022-10-12T05:39:33.511Z",
        "Symbol.toStringTag": "Date",
        "Symbol.identity": 12
    },
    "3": {
        "n": null,
        "m": 1.7976931348623157e+308,
        "s": {
            "0": 9999,
            "1": {
                "Symbol.reference": 13
            },
            "2": {
                "Symbol.reference": 14
            },
            "Symbol.toStringTag": "Set",
            "length": 3,
            "Symbol.identity": 14
        },
        "c": {
            "0": "world",
            "1": {
                "b": {
                    "0": "hello",
                    "1": {
                        "a": {
                            "Symbol.reference": 13
                        },
                        "Symbol.toStringTag": "Object",
                        "Symbol.identity": 18
                    },
                    "Symbol.toStringTag": "Array",
                    "length": 2,
                    "Symbol.identity": 17
                },
                "Symbol.toStringTag": "Object",
                "Symbol.identity": 16
            },
            "Symbol.toStringTag": "Array",
            "length": 2,
            "Symbol.identity": 15
        },
        "Symbol.toStringTag": "Object",
        "Symbol.identity": 13
    },
    "4": {
        "0": {
            "0": {
                "Symbol.reference": 13
            },
            "1": "aaaa",
            "Symbol.toStringTag": "Array",
            "length": 2,
            "Symbol.identity": 20
        },
        "1": {
            "0": 8888,
            "1": 7777,
            "Symbol.toStringTag": "Array",
            "length": 2,
            "Symbol.identity": 21
        },
        "Symbol.toStringTag": "Map",
        "length": 2,
        "Symbol.identity": 19
    },
    "5": {
        "Symbol.reference": 0
    },
    "Symbol.toStringTag": "Array",
    "length": 6,
    "Symbol.identity": 0
}`,
    );
});

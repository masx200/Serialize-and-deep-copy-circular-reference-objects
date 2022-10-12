import { circularParse } from "./circularParse.ts";
import { circularStringify } from "./circularStringify.ts";
import {
    assert,
    assertEquals,
} from "https://deno.land/std@0.159.0/testing/asserts.ts";
import { teststringify } from "./teststringify.ts";
import { testparse } from "./testparse.ts";
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

import { circularParse } from "./circularParse.ts";
import { circularStringify } from "./circularStringify.ts";
import {
    assert,
    assertEquals,
} from "https://deno.land/std@0.159.0/testing/asserts.ts";
Deno.test("basic", () => {
    // deno-lint-ignore no-var
    var obj = {};
    //@ts-ignore
    obj.a = obj;
    const stringified = circularStringify(structuredClone(obj), 0);
    // deno-lint-ignore no-var
    var clone = circularParse(stringified);
    console.log(stringified);
    console.log(obj);
    console.log(clone);
    assert(clone !== obj);
    assert(clone.a === clone); // -> true
    assertEquals(
        stringified,
        `{"a":{"Symbol.reference":0},"Symbol.identity":0}`,
    );
});

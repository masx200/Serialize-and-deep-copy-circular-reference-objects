import { circularParse } from "./circularParse.ts";
import { cloneDeep } from "./cloneDeep.ts";
import { reviverCustomizers } from "./reviverCustomizers.ts";
export function testparse(case1: any) {
    console.log("stringified", case1);
    const parsed1 = circularParse(case1);
    console.log("parsed", parsed1);
    const cloned = cloneDeep(parsed1, ...reviverCustomizers);
    console.log("cloned", cloned);
    return cloned;
}

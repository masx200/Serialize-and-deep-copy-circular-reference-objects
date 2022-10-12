import { circularStringify } from "./circularStringify.ts";
import { cloneDeep } from "./cloneDeep.ts";
import { replacerCustomizers } from "./replacerCustomizers.ts";
export function teststringify(origin: any) {
    const cloned = cloneDeep(origin, ...replacerCustomizers);
    console.log("origin", origin);
    console.log("cloned", cloned);
    const stringified = circularStringify(cloned);

    console.log("stringified", stringified);
    return stringified;
}

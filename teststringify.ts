import { ArrayToCircularLinkedList } from "./ArrayToCircularLinkedList.ts";
import { circularStringify } from "./circularStringify.ts";
import { cloneDeep } from "./cloneDeep.ts";
import { createCircular } from "./createCircular.ts";
import { ArrayToCircularDoublyTreeList } from "./ArrayToCircularDoublyTreeList.ts";

function test(origin: any) {
    const cloned = cloneDeep(origin);
    console.log("origin", origin);
    console.log("cloned", cloned);
    const stringified = circularStringify(cloned);

    console.log("stringified", stringified);
}
const d: any[] = createCircular();

const origin = ArrayToCircularLinkedList(
    Array.from({ length: 10 }, (_, i) => i + Math.random())
);

test(origin);

test(d);

test(
    ArrayToCircularDoublyTreeList(
        Array.from({ length: 10 }, (_, i) => i + Math.random())
    )
);
const case2: any[][] = [[1]];
case2.push(case2);
test(case2);

import { ArrayToCircularLinkedList } from "./ArrayToCircularLinkedList.ts";
import { createCircular } from "./createCircular.ts";
import { ArrayToCircularDoublyTreeList } from "./ArrayToCircularDoublyTreeList.ts";
import { teststringify } from "./teststringify.ts";

Deno.test("stringify", () => {
    const d: any[] = createCircular();
    const origin = ArrayToCircularLinkedList(
        Array.from({ length: 10 }, (_, i) => i + 300),
    );

    teststringify(origin);

    teststringify(d);

    teststringify(
        ArrayToCircularDoublyTreeList(
            Array.from({ length: 10 }, (_, i) => i + 600),
        ),
    );
    const case2: any[][] = [[1]];
    case2.push(case2);
    teststringify(case2);
});

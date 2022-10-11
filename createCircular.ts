import { ArrayToCircularLinkedList } from "./ArrayToCircularLinkedList.ts";

export function createCircular() {
    const a = { n: null, m: Number.MAX_VALUE, s: new Set([9999]) };
    const b = ["hello", { a }];
    Object.assign(a, { c: ["world", { b }] });
    a.s.add(a);

    const d: any[] = [
        10n ** 39n + 7n,
        ArrayToCircularLinkedList(
            Array.from({ length: 10 }, (_, i) => i + Math.random()),
        ),
        new Date(),
        a,
        new Map([
            [a, "aaaa"],
            [8888, 7777],
        ]),
    ];
    a.s.add(a.s);
    d.push(d);
    return d;
}

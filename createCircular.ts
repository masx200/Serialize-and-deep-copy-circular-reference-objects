import { ArrayToCircularLinkedList } from "./ArrayToCircularLinkedList.ts";

export function createCircular() {
    const a = { n: null, m: Number.MAX_VALUE, s: new Set([9999]) };
    const b = ["hello", { a }];
    Object.assign(a, { c: ["world", { b }] });
    //@ts-ignore
    a.s.add(a);

    const d: any[] = [
        10n ** 39n + 7n,
        ArrayToCircularLinkedList(Array.from({ length: 10 }, (_, i) => i + 50)),
        new Date("2022-10-12T05:39:33.511Z"),
        a,
        //@ts-ignore
        new Map([
            //@ts-ignore
            [a, "aaaa"],
            //@ts-ignore
            [8888, 7777],
        ]),
    ];
    //@ts-ignore
    a.s.add(a.s);
    d.push(d);
    return d;
}

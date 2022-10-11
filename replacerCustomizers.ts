import { Customizer } from "./Customizer.ts";
export const replacerCustomizers: Customizer[] = [
    {
        check(value) {
            return typeof value === "bigint";
        },
        clone(value) {
            const result: any = Object.assign(
                {},
                {
                    value: value.toString(),
                    "Symbol.toStringTag": "BigInt",
                },
            );
            return result;
        },
    },
];

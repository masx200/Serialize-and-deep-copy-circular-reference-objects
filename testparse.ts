import { circularParse } from "./circularParse.ts";

const case1 = ` {
    "val": 0.5975351479243165,
    "left": {
        "val": 9.952593730970571,
        "left": {
            "val": 8.675239320278793,
            "left": {
                "val": 7.2322280148804765,
                "left": {
                    "val": 6.380463676869825,
                    "left": {
                        "val": 5.572343184458919,
                        "left": {
                            "val": 4.34129351312313,
                            "left": {
                                "val": 3.3454803721034403,
                                "left": {
                                    "val": 2.4442102505218775,
                                    "left": {
                                        "val": 1.2501632611462867,
                                        "left": {
                                            "Symbol.reference": 0
                                        },
                                        "right": {
                                            "Symbol.reference": 8
                                        },
                                        "Symbol.toStringTag": "Object",
                                        "Symbol.identity": 9
                                    },
                                    "right": {
                                        "Symbol.reference": 7
                                    },
                                    "Symbol.toStringTag": "Object",
                                    "Symbol.identity": 8
                                },
                                "right": {
                                    "Symbol.reference": 6
                                },
                                "Symbol.toStringTag": "Object",
                                "Symbol.identity": 7
                            },
                            "right": {
                                "Symbol.reference": 5
                            },
                            "Symbol.toStringTag": "Object",
                            "Symbol.identity": 6
                        },
                        "right": {
                            "Symbol.reference": 4
                        },
                        "Symbol.toStringTag": "Object",
                        "Symbol.identity": 5
                    },
                    "right": {
                        "Symbol.reference": 3
                    },
                    "Symbol.toStringTag": "Object",
                    "Symbol.identity": 4
                },
                "right": {
                    "Symbol.reference": 2
                },
                "Symbol.toStringTag": "Object",
                "Symbol.identity": 3
            },
            "right": {
                "Symbol.reference": 1
            },
            "Symbol.toStringTag": "Object",
            "Symbol.identity": 2
        },
        "right": {
            "Symbol.reference": 0
        },
        "Symbol.toStringTag": "Object",
        "Symbol.identity": 1
    },
    "right": {
        "Symbol.reference": 9
    },
    "Symbol.toStringTag": "Object",
    "Symbol.identity": 0
}`;
console.log("stringified", case1);
console.log("parsed", circularParse(case1));
const case2 = `{
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
}`;
console.log("stringified", case2);
console.log("parsed", circularParse(case2));

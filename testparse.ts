import { circularParse } from "./circularParse.ts";
import { cloneDeep } from "./cloneDeep.ts";
import { reviverCustomizers } from "./reviverCustomizers.ts";

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
                                        "Symbol.toStringTag": "TreeNode",
                                        "Symbol.identity": 9
                                    },
                                    "right": {
                                        "Symbol.reference": 7
                                    },
                                    "Symbol.toStringTag": "TreeNode",
                                    "Symbol.identity": 8
                                },
                                "right": {
                                    "Symbol.reference": 6
                                },
                                "Symbol.toStringTag": "TreeNode",
                                "Symbol.identity": 7
                            },
                            "right": {
                                "Symbol.reference": 5
                            },
                            "Symbol.toStringTag": "TreeNode",
                            "Symbol.identity": 6
                        },
                        "right": {
                            "Symbol.reference": 4
                        },
                        "Symbol.toStringTag": "TreeNode",
                        "Symbol.identity": 5
                    },
                    "right": {
                        "Symbol.reference": 3
                    },
                    "Symbol.toStringTag": "TreeNode",
                    "Symbol.identity": 4
                },
                "right": {
                    "Symbol.reference": 2
                },
                "Symbol.toStringTag": "TreeNode",
                "Symbol.identity": 3
            },
            "right": {
                "Symbol.reference": 1
            },
            "Symbol.toStringTag": "TreeNode",
            "Symbol.identity": 2
        },
        "right": {
            "Symbol.reference": 0
        },
        "Symbol.toStringTag": "TreeNode",
        "Symbol.identity": 1
    },
    "right": {
        "Symbol.reference": 9
    },
    "Symbol.toStringTag": "TreeNode",
    "Symbol.identity": 0
}`;
test(case1);
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
test(case2);
const case3 = ` {
    "val": 0.2556659509869501,
    "next": {
        "val": 1.2277812641050994,
        "next": {
            "val": 2.3907396938797394,
            "next": {
                "val": 3.016428274329547,
                "next": {
                    "val": 4.369877129100735,
                    "next": {
                        "val": 5.259096514813646,
                        "next": {
                            "val": 6.036077271143199,
                            "next": {
                                "val": 7.02278355450377,
                                "next": {
                                    "val": 8.870950796699386,
                                    "next": {
                                        "val": 9.267242386606252,
                                        "next": {
                                            "Symbol.reference": 0
                                        },
                                        "Symbol.toStringTag": "ListNode",
                                        "Symbol.identity": 9
                                    },
                                    "Symbol.toStringTag": "ListNode",
                                    "Symbol.identity": 8
                                },
                                "Symbol.toStringTag": "ListNode",
                                "Symbol.identity": 7
                            },
                            "Symbol.toStringTag": "ListNode",
                            "Symbol.identity": 6
                        },
                        "Symbol.toStringTag": "ListNode",
                        "Symbol.identity": 5
                    },
                    "Symbol.toStringTag": "ListNode",
                    "Symbol.identity": 4
                },
                "Symbol.toStringTag": "ListNode",
                "Symbol.identity": 3
            },
            "Symbol.toStringTag": "ListNode",
            "Symbol.identity": 2
        },
        "Symbol.toStringTag": "ListNode",
        "Symbol.identity": 1
    },
    "Symbol.toStringTag": "ListNode",
    "Symbol.identity": 0
}`;
test(case3);
const case4 = ` {
    "0": {
        "value": "1000000000000000000000000000000000000007",
        "Symbol.toStringTag": "BigInt",
        "Symbol.identity": 1
    },
    "1": {
        "val": 0.26838766064860486,
        "next": {
            "val": 1.054121524850339,
            "next": {
                "val": 2.0682264976649893,
                "next": {
                    "val": 3.556165882759723,
                    "next": {
                        "val": 4.0426207287215945,
                        "next": {
                            "val": 5.599727405726615,
                            "next": {
                                "val": 6.745836755962819,
                                "next": {
                                    "val": 7.34243565087919,
                                    "next": {
                                        "val": 8.26725097613973,
                                        "next": {
                                            "val": 9.535134149362133,
                                            "next": {
                                                "Symbol.reference": 2
                                            },
                                            "Symbol.toStringTag": "ListNode",
                                            "Symbol.identity": 11
                                        },
                                        "Symbol.toStringTag": "ListNode",
                                        "Symbol.identity": 10
                                    },
                                    "Symbol.toStringTag": "ListNode",
                                    "Symbol.identity": 9
                                },
                                "Symbol.toStringTag": "ListNode",
                                "Symbol.identity": 8
                            },
                            "Symbol.toStringTag": "ListNode",
                            "Symbol.identity": 7
                        },
                        "Symbol.toStringTag": "ListNode",
                        "Symbol.identity": 6
                    },
                    "Symbol.toStringTag": "ListNode",
                    "Symbol.identity": 5
                },
                "Symbol.toStringTag": "ListNode",
                "Symbol.identity": 4
            },
            "Symbol.toStringTag": "ListNode",
            "Symbol.identity": 3
        },
        "Symbol.toStringTag": "ListNode",
        "Symbol.identity": 2
    },
    "2": {
        "value": "2022-10-12T02:54:42.734Z",
        "Symbol.toStringTag": "Date",
        "Symbol.identity": 12
    },
    "3": {
        "n": null,
        "m": 1.7976931348623157e+308,
        "s": {
            "0": 9999,
            "1": {
                "Symbol.reference": 13
            },
            "2": {
                "Symbol.reference": 14
            },
            "Symbol.toStringTag": "Set",
            "length": 3,
            "Symbol.identity": 14
        },
        "c": {
            "0": "world",
            "1": {
                "b": {
                    "0": "hello",
                    "1": {
                        "a": {
                            "Symbol.reference": 13
                        },
                        "Symbol.toStringTag": "Object",
                        "Symbol.identity": 18
                    },
                    "Symbol.toStringTag": "Array",
                    "length": 2,
                    "Symbol.identity": 17
                },
                "Symbol.toStringTag": "Object",
                "Symbol.identity": 16
            },
            "Symbol.toStringTag": "Array",
            "length": 2,
            "Symbol.identity": 15
        },
        "Symbol.toStringTag": "Object",
        "Symbol.identity": 13
    },
    "4": {
        "0": {
            "0": {
                "Symbol.reference": 13
            },
            "1": "aaaa",
            "Symbol.toStringTag": "Array",
            "length": 2,
            "Symbol.identity": 20
        },
        "1": {
            "0": 8888,
            "1": 7777,
            "Symbol.toStringTag": "Array",
            "length": 2,
            "Symbol.identity": 21
        },
        "Symbol.toStringTag": "Map",
        "length": 2,
        "Symbol.identity": 19
    },
    "5": {
        "Symbol.reference": 0
    },
    "Symbol.toStringTag": "Array",
    "length": 6,
    "Symbol.identity": 0
}`;
test(case4);

function test(case1: any) {
    console.log("stringified", case1);
    const parsed1 = circularParse(case1);
    console.log("parsed", parsed1);
    console.log("cloned", cloneDeep(parsed1, ...reviverCustomizers));
}

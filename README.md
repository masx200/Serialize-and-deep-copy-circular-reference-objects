# Serialize-and-deep-copy-circular-reference-objects

#### 介绍

序列化和深拷贝循环引用对象

Serialize and deep copy circular reference objects

#### 软件架构

软件架构说明

#### 使用说明

`cloneDeep`:可自定义的深拷贝循环引用对象的方法

```ts
function teststringify(origin: any) {
    const cloned = cloneDeep(origin, ...replacerCustomizers);
    console.log("origin", origin);
    console.log("cloned", cloned);
    const stringified = circularStringify(cloned);

    console.log("stringified", stringified);
}
```

```ts
function testparse(case1: any) {
    console.log("stringified", case1);
    const parsed1 = circularParse(case1);
    console.log("parsed", parsed1);
    console.log("cloned", cloneDeep(parsed1, ...reviverCustomizers));
}
```

### 例子

```
stringified {
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
}
parsed <ref *1> {
  "0": { "0": 1, "Symbol.toStringTag": "Array", length: 1 },
  "1": [Circular *1],
  "Symbol.toStringTag": "Array",
  length: 2
}
cloned [ [ 1 ], [Circular *1] ]
```

```
origin <ref *3> TreeNode {
  val: 0.5880302339096724,
  left: <ref *2> TreeNode {
    val: 9.125346300899016,
    left: <ref *1> TreeNode {
      val: 8.00411854488926,
      left: TreeNode { val: 7.8539983781024985, left: [Object], right: [Circular *1] },
      right: [Circular *2]
    },
    right: [Circular *3]
  },
  right: <ref *4> TreeNode {
    val: 1.829227394260811,
    left: [Circular *3],
    right: <ref *5> TreeNode {
      val: 2.998137681404465,
      left: [Circular *4],
      right: TreeNode { val: 3.6831026696928055, left: [Circular *5], right: [Object] }
    }
  }
}
cloned <ref *3> TreeNode {
  val: 0.5880302339096724,
  left: <ref *2> TreeNode {
    val: 9.125346300899016,
    left: <ref *1> TreeNode {
      val: 8.00411854488926,
      left: TreeNode {
        val: 7.8539983781024985,
        left: [Object],
        right: [Circular *1],
        "Symbol.toStringTag": "TreeNode"
      },
      right: [Circular *2],
      "Symbol.toStringTag": "TreeNode"
    },
    right: [Circular *3],
    "Symbol.toStringTag": "TreeNode"
  },
  right: <ref *4> TreeNode {
    val: 1.829227394260811,
    left: [Circular *3],
    right: <ref *5> TreeNode {
      val: 2.998137681404465,
      left: [Circular *4],
      right: TreeNode {
        val: 3.6831026696928055,
        left: [Circular *5],
        right: [Object],
        "Symbol.toStringTag": "TreeNode"
      },
      "Symbol.toStringTag": "TreeNode"
    },
    "Symbol.toStringTag": "TreeNode"
  },
  "Symbol.toStringTag": "TreeNode"
}
stringified {
    "val": 0.5880302339096724,
    "left": {
        "val": 9.125346300899016,
        "left": {
            "val": 8.00411854488926,
            "left": {
                "val": 7.8539983781024985,
                "left": {
                    "val": 6.001457616409839,
                    "left": {
                        "val": 5.479078167073621,
                        "left": {
                            "val": 4.1469239540288365,
                            "left": {
                                "val": 3.6831026696928055,
                                "left": {
                                    "val": 2.998137681404465,
                                    "left": {
                                        "val": 1.829227394260811,
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
}
```

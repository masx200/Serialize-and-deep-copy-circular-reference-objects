export function getTag(value: any) {
    return Object.prototype.toString
        .call(value)
        .match(/^\[object (.*)\]$/)?.[1];
}

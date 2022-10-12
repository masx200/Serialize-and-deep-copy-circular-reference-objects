export interface Customizer {
    check(v: any): boolean;
    clone(v: any): any;
    children?: (source: any, target: any, dfs: (v: any) => any) => void;
}

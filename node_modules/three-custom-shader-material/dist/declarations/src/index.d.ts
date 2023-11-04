import { iCSMParams, MaterialConstructor } from "./types.js";
declare const _default: <T extends MaterialConstructor>(props: {
    baseMaterial: T | InstanceType<T>;
    vertexShader?: string | undefined;
    fragmentShader?: string | undefined;
    cacheKey?: (() => string) | undefined;
    patchMap?: import("./types.js").iCSMPatchMap | undefined;
    silent?: boolean | undefined;
    uniforms?: {
        [key: string]: import("three").IUniform<any>;
    } | undefined;
} & (ConstructorParameters<T>[0] extends undefined ? {} : ConstructorParameters<T>[0]) & {
    ref?: unknown;
    attach?: string | undefined;
}) => JSX.Element;
export default _default;
export * from "./types.js";

import * as THREE from 'three';
import { iCSMParams, iCSMUpdateParams, MaterialConstructor, Uniform } from "./types.js";
export default class CustomShaderMaterial<T extends MaterialConstructor = typeof THREE.Material> extends THREE.Material {
    uniforms: Uniform;
    private __csm;
    constructor({ baseMaterial, //
    fragmentShader, vertexShader, uniforms, patchMap, cacheKey, silent, ...opts }: iCSMParams<T>);
    /**
     *
     * Update the material with new arguments.
     * TODO: Fix memory leak.
     *
     * @param opts Options to update the material with.
     *
     * @deprecated This method leaks memory.
     */
    update(opts?: iCSMUpdateParams<T>): void;
    /**
     * Returns a new instance of this material with the same options.
     *
     * @returns A clone of this material.
     */
    clone(): this;
    /**
     * Internally calculates the cache key for this instance of CSM.
     * If no specific CSM inputs are provided, the cache key is the same as the default
     * cache key, i.e. `baseMaterial.onBeforeCompile.toString()`. Not meant to be called directly.
     *
     * This method is quite expensive owing to the hashing function and string manip.
     *
     * TODO:
     * - Optimize string manip.
     * - Find faster hash function
     *
     * @returns {string} A cache key for this instance of CSM.
     */
    private getCacheHash;
    /**
     * Does the internal shader generation. Not meant to be called directly.
     *
     * @param fragmentShader
     * @param vertexShader
     * @param uniforms
     */
    private generateMaterial;
    /**
     * Patches input shader with custom shader. Not meant to be called directly.
     * @param customShader
     * @param shader
     * @param isFrag
     * @returns
     */
    private patchShader;
    /**
     * This method is expensive owing to the tokenization and parsing of the shader.
     *
     * TODO:
     * - Replace tokenization with regex
     *
     * @param shader
     * @returns
     */
    private parseShader;
    /**
     * Gets the material type as a string. Not meant to be called directly.
     * @returns
     */
    private getMaterialDefine;
    /**
     * Gets the right patch map for the material. Not meant to be called directly.
     * @returns
     */
    private getPatchMapForMaterial;
    /**
     * Gets the shader from the tokens. Not meant to be called directly.
     * @param tokens
     * @param index
     * @returns
     */
    private getShaderFromIndex;
}
export * from "./types.js";

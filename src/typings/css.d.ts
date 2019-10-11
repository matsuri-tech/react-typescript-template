import { StandardLonghandProperties } from "csstype"
/**
 * @example
 * const sx: StyleFactory = {
 *   root:{
 *      margin: 0
 *   }
 * }
 */
export type StyleFactory = {
    readonly [key: string]: StandardLonghandProperties
}

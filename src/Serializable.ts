/**
 * .what = a recursively-defined type that describes JSON-safe values
 * .why  = enables strict typing of structures that can be serialized (e.g., for APIs, storage, or LLM variables)
 *   - includes primitives, arrays, and nested objects
 *   - excludes functions, undefined, class instances, and non-JSON types
 */
export type Serializable =
  | string
  | number
  | boolean
  | null
  | Serializable[]
  | { [key: string]: Serializable };

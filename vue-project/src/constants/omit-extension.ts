/**
 * Omit variant to handle union types
 */
export type DistributiveOmit<T, K extends PropertyKey> = T extends any ? Omit<T, K> : never;

/**
 * Strict mode of Omit to ensure that the keys are present in the object
 */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>;
/**
 * 构造递归数组
 */
declare type NestedArray<T> = Array<T | NestedArray<T>>

/**
 * 表达式
 */
declare type RawExp = NestedArray<string>

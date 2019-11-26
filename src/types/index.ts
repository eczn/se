declare type NestedArray<T> = Array<T | NestedArray<T>>

declare type RawExp = NestedArray<string>

declare type Exp = NestedArray<string | number>
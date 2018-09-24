import {mock, Optional} from "./mock";

export function spy<T>(actualObject:T, stubs: Optional<T>): T {
    return Object.assign(Object.create(actualObject as any), mock(stubs));
}
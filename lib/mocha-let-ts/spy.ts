import {mock, Optional} from "./mock";

export function spy<T>(actualObject:T, stubs: Optional<T>): T {
    const theMock = mock(stubs);
    const propNames = Object.getOwnPropertyNames(theMock);
    const propDescriptorMap = propNames.reduce((p,c) => ({...p, [c]: Object.getOwnPropertyDescriptor(theMock, c)}), {});
    return Object.defineProperties(Object.create(actualObject as any), propDescriptorMap);
}
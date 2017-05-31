import * as sinon from 'sinon';

export type Optional<T> = {
    [P in keyof T]?:T[P];
}

export function mock<T>(stubs:Optional<T>):T {
    let mock:T = {...(stubs as object)} as T;
    const stubsAsAny:any = stubs as any;
    const members = Object.keys(stubs);
    const methodNames = members.filter(member => stubsAsAny[member] instanceof Function);
    methodNames.forEach(methodName => sinon.stub(mock, methodName, stubsAsAny[methodName]));
    return mock as T;
}
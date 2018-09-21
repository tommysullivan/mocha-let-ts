import * as sinon from 'sinon';

export type Optional<T> = {
    [P in keyof T]?:T[P];
}

export function mock<T>(stubs:Optional<T>):T {
    let mock:T = {...(stubs as object)} as T;
    const memberNames = Object.keys(stubs) as (keyof T)[];
    const x = memberNames[0];
    const isFunction = (possibleFunction:any):possibleFunction is Function => possibleFunction instanceof Function;
    const methodNames = memberNames.filter(memberName => isFunction(stubs[memberName]));
    type AnyFunc = (...args:any[])=>void;
    methodNames.forEach(methodName => sinon.stub(mock, methodName).callsFake(stubs[methodName] as any as AnyFunc));
    return mock as T;
}
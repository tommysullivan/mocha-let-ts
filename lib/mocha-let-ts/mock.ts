import * as sinon from 'sinon';

export type Optional<T> = {
    [P in keyof T]?:T[P];
}

export function mock<T>(stubs:Optional<T>):T {
    let mock:T = {...(stubs as object)} as T;
    const stubsAsAny:any = stubs as any;
    const memberNames = Object.keys(stubs);
    const methodNames = memberNames.filter(memberName => stubsAsAny[memberName] instanceof Function);
    methodNames.forEach(methodName => sinon.stub(mock, methodName).callsFake(stubsAsAny[methodName]));
    return mock as T;
}
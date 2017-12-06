import ISuiteCallbackContext = Mocha.ISuiteCallbackContext;
import {GivenCallback} from "./mochaTypes";

export type MethodNames<T> = {
    [P in keyof T]: string;
}

export type MemberDescribeCallback<T> = (this: ISuiteCallbackContext, describeMember: DescribeMember<T>) => void;

export type DescribeMember<T> = {
    [P in keyof T]: (cb:GivenCallback) => void;
}

export interface NativeClassReference<T> {
    new (...args:any[]):T;
}

export function memberNamesOf<T>(theClass:NativeClassReference<T>):string[] {
    const sampleObject = new theClass();
    const instanceWithLiterals = Object.getOwnPropertyNames(sampleObject);
    const classDefinitions = Object.getOwnPropertyNames(theClass.prototype);
    return classDefinitions.concat(instanceWithLiterals);
}

export function dictionaryOfMemberNamesOf<T>(theClass:NativeClassReference<T>):MethodNames<T> {
    return memberNamesOf(theClass).reduce((previous, current) => ({...previous, [current]: current}), {}) as MethodNames<T>;
}

export const describeClass = <T>(theClass:NativeClassReference<T>, cb:MemberDescribeCallback<T>) => context(`Class: ${theClass.name}`, function() {
    const describeMember = memberNamesOf(theClass).reduce(
        (previous, current) => ({
            ...previous,
            [current]: (nativeGivenCallback:GivenCallback) => describe(`Member: ${theClass.name}.${current}`, nativeGivenCallback)
        }),
        {}
    ) as DescribeMember<T>;
    cb.call(this, describeMember);
});
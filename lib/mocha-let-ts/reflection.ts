export type MethodNames<T> = {
    [P in keyof T]: string;
}

export function instanceMemberNamesOf<T>(theClass:new (...args:any[]) => T):MethodNames<T> {
    const sampleObject = new theClass();
    const instanceWithLiterals = Object.getOwnPropertyNames(sampleObject);
    const classDefinitions = Object.getOwnPropertyNames(theClass.prototype);
    const propNames = classDefinitions.concat(instanceWithLiterals);
    return propNames.reduce((previous, current) => ({...previous, [current]: current}), {}) as MethodNames<T>;
}
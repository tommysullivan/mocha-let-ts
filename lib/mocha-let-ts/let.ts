declare const def:any, get:any;

export interface RSpecStyleLetObject<T> {
    ():T;
    (factory:()=>T):void;
}

var numLetInstances = 0;

export class UnresolvedLetError extends Error {
    constructor(letInstanceName:string) {
        super(`Could not resolve "Let" as no factory was defined for ${letInstanceName}`)
    }
}

export function Let<T>(factory?:()=>T):RSpecStyleLetObject<T> {
    const instanceNumber = numLetInstances++;
    const instanceName = `LetInstance${instanceNumber}`;
    if(factory) def(instanceName, factory);
    else def(instanceName, () => { throw new UnresolvedLetError(instanceName) });
    return function(factory?:()=>T):T | null {
        if(factory) def(instanceName, factory);
        else return get(instanceName);
    };
}
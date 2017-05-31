declare const def:any, get:any;

export interface RSpecStyleLetObject<T> {
    ():T;
    (factory:()=>T):void;
}

let numLetInstances = 0;

export class UnresolvedLetError extends Error {
    constructor(letInstanceName:string) {
        super(`Could not resolve "Let" as no factory was defined for ${letInstanceName}`)
    }
}

export class MissingBDDLazyVarUIError extends Error {
    constructor() { super('Let usage requires the following mocha cli args: "[mocha-command] -u bdd-lazy-var/getter"')}
}

export function Let<T>(factory?:()=>T):RSpecStyleLetObject<T> {
    if(def==undefined || get==undefined) throw new MissingBDDLazyVarUIError();
    const instanceNumber = numLetInstances++;
    const instanceName = `LetInstance${instanceNumber}`;
    if(factory) def(instanceName, factory);
    else def(instanceName, () => { throw new UnresolvedLetError(instanceName) });
    return function(factory?:()=>T):T | null {
        if(factory) def(instanceName, factory);
        else return get(instanceName);
    };
}
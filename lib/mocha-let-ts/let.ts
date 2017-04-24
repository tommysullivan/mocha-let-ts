declare const def:any, get:any;

export interface RSpecStyleLetObject<T> {
    ():T;
    (factory:()=>T):void;
}

var numLetInstances = 0;

export function Let<T>(factory?:()=>T):RSpecStyleLetObject<T> {
    const instanceNumber = numLetInstances++;
    const instanceName = `LetInstance${instanceNumber}`;
    if(factory) def(instanceName, factory);
    return function(factory?:()=>T):T | null {
        if(factory) def(instanceName, factory);
        else return get(instanceName);
    };
}
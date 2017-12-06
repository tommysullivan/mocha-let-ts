import {GivenCallback, xcontext} from "./mochaTypes";

const newBDDContext = (prefix:string, isEnabled:boolean) => (description: string, cb:GivenCallback) => (isEnabled ? context : xcontext)(`${prefix} ${description}`, cb);

export const given = newBDDContext('Given', true);
export const xgiven = newBDDContext('Given', false);
export const andGiven = newBDDContext('And given', true);
export const xandGiven = newBDDContext('And given', false);
export const when = newBDDContext('When', true);
export const xwhen = newBDDContext('When', false);
export const andWhen = newBDDContext('And when', true);
export const xandWhen = newBDDContext('And when', false);

export const then = it;
export const xthen = xit;
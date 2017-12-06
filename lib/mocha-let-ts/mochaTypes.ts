import {expect as expectFromChai} from 'chai';
import ISuiteCallbackContext = Mocha.ISuiteCallbackContext;

export type GivenCallback = (this: ISuiteCallbackContext) => void;
export const xcontext = xdescribe;
export const expect = expectFromChai;
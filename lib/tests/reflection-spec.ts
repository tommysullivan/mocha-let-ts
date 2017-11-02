import './prepare-test-environment';
import {expect} from 'chai';
import {instanceMemberNamesOf} from "../mocha-let-ts/reflection";

describe('instanceMemberNamesOf', () => {
    class Example {
        firstName:string = 'a';
        get lastName():string { return 'myes'; }
        doSomething(a:number):number { return a + 1; }
    }

    it('yields an object whose properties match class instance members but whose respective values are the typesafe string names of their respective definitions', () => {
        expect(instanceMemberNamesOf(Example).firstName).to.equal('firstName');
        expect(instanceMemberNamesOf(Example).lastName).to.equal('lastName');
        expect(instanceMemberNamesOf(Example).doSomething).to.equal('doSomething');
    });
});

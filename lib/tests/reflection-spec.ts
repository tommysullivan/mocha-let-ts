import './prepare-test-environment';
import {describeClass, dictionaryOfMemberNamesOf} from "../mocha-let-ts/reflection";
import {Example} from "./example";
import {expect} from "../mocha-let-ts/mochaTypes";

describe('dictionaryOfMemberNamesOf', () => {
    it('yields an object whose properties match class instance members but whose respective values are the typesafe string names of their respective definitions', () => {
        expect(dictionaryOfMemberNamesOf(Example).firstName).to.equal('firstName');
        expect(dictionaryOfMemberNamesOf(Example).lastName).to.equal('lastName');
        expect(dictionaryOfMemberNamesOf(Example).myes).to.equal('myes');
    });
});

describeClass(Example, (describeMember) => {
    describeMember.myes(() => {
        it('yields the correct test name when manually inspected by eye');
    });

    describeMember.lastName(() => {
        it('yields the correct test name when manually inspected by eye');
    });
});

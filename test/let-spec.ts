import './prepare-test-environment';
import {expect} from 'chai';
import { Let } from '../src/mocha-let-ts/let';

interface ExampleInterface {
    someProperty:string;
}

describe("Let<T>() for rspec-like mocha tests", () => {
    const subject = Let<ExampleInterface>();
    context("when we define lazy value provider in a nested context", () => {
        subject(() => ({someProperty: "hello"}));
        it("yields the provided value inside the example", () => {
            expect(subject().someProperty).to.equal("hello");
        });
        it("memoizes the provided value for each example block", () => {
            const actualSubject = subject();
            const anotherSubjectIdentifier = subject();
            anotherSubjectIdentifier["thisPropertyWillNotExistInSubsequentTests"]=true;
            expect(actualSubject === anotherSubjectIdentifier);
        });
        it("does not reuse values across 'it' blocks", () => {
            expect(subject()["thisPropertyWillNotExistInSubsequentTests"]).not.to.be.true;
        });
        context("and if we provide a different value in a further nested context block", () => {
            subject(() => ({someProperty: "bonjour"}))
            it("uses the more nested version", () => {
                expect(subject().someProperty).to.equal("bonjour");
            });
        });
        context("when we mutate the Let within a beforeEach hook", () => {
            beforeEach(() => {
                subject().someProperty = "setInBeforeEach";
            });
            it("works as expected", () => {
                expect(subject().someProperty).to.equal("setInBeforeEach");
            });
        });
    });
    context("when we don't define a lazy value provider before use", () => {
        const expectedErrorMessageRegex = /^Could not resolve "Let" as no factory was defined for LetInstance(.*)/;
        it(`yields an exception matching the following regex: ${expectedErrorMessageRegex}`, () => {
            expect(subject).to.throw(expectedErrorMessageRegex);
        });
    });
    context("when we define a lazy value provider that itself uses some other Let<T>()", () => {
        const someOtherLet = Let(() => "the default string");
        subject(() => ({someProperty: someOtherLet()}));
        it("works like you would expect", () => {
            expect(subject().someProperty).to.equal("the default string");
        });
        context("and when the other let is overridden in a more nested context, even though the original let is not", () => {
            someOtherLet(() => "a different string");
            it("uses the more nestedly-defined value", () => {
                expect(subject().someProperty).to.equal("a different string");
            });
        });
    });
});
import './prepare-test-environment';
import {expect} from 'chai';
import {Let, UnresolvedLetError} from "../mocha-let-ts/let";

class Subject {
    constructor(public name:string, public dependency:Dependency) {
        if(!(dependency instanceof Dependency)) throw new Error('dependency not instance of Dependency');
    }
}

class Dependency {
    constructor(public name:string) {}
}

describe('mocha-let-ts', () => {
    context('when the "subject" depends on another "Let" whose default impl is to throw an exception', () => {
        const dependency = Let<Dependency>();
        const subject = Let(()=>new Subject('defaultSubjectName', dependency()));

        context('and the dependency let is not overridden at a lower level', () => {
            it('throws the exception defined in the default impl', () => expect(subject).to.throw('Could not resolve "Let" as no factory was defined'));
        });

        context('and the dependency let is overridden at a lower level', () => {
            dependency(()=>new Dependency('d1'));
            it('uses the more nested definition', () => expect(subject()).to.be.a.instanceof(Subject));
        });

        context('and we defined the dependency factory to produce dependency named d2', () => {
            dependency(()=>{
                return new Dependency('d2');
            });

            beforeEach('mutate name of subject to tommy', () => {
                subject().name = "tommy";
            });

            it('is named tommy', () => {
                expect(subject()).to.have.property('name', 'tommy');
            });

            it('has a dependency named d2', () => {
                expect(subject()).to.have.property('dependency').with.property('name', 'd2');
            });
        })
    });
});
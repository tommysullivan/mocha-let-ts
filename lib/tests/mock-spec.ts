import './prepare-test-environment';
import {expect} from 'chai';
import {mock} from "../mocha-let-ts/mock";

class Subject {
    constructor(public dependency:Dependency) {}

    callDep(n:number):number {
        return this.dependency.performDependentTask(n);
    }
}

class Dependency {
    performDependentTask(n:number):number { throw new Error('dependent task not implemented'); }
}


describe('mock', () => {
    describe('mock', () => {
        it('can be used to generate a typesafe mock with partial implementations', () => {
            const mockDependency = mock<Dependency>({
                performDependentTask(n:number) { return 5; }
            });
            const subject = new Subject(mockDependency);
            expect(subject.callDep(9)).to.equal(5);
            expect(mockDependency.performDependentTask).to.have.been.calledWith(9);
            expect(mockDependency.performDependentTask).to.have.returned(5);
        });
    });
});

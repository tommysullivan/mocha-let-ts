import './prepare-test-environment';
import {expect} from 'chai';
import {mock, Optional} from "../mocha-let-ts/mock";
import {spy} from "../mocha-let-ts/spy";
import {Let} from "../mocha-let-ts/let";

class ClassToSpyOn {
    method(a:string):string { return `aaa${a}aaa`; }
    get getterProperty():string {
        return 'myes';
    }
}

describe(spy.name, () => {
    const instanceToSpyOn = Let(() => new ClassToSpyOn());
    const stubs = Let<Optional<ClassToSpyOn>>(() => ({}));
    const theSpy = Let(() => spy(instanceToSpyOn(), stubs()));

    it('yields a return value', () => expect(theSpy()).to.exist);

    context('when overriding a method', () => {
        stubs(() => ({
            method(a:string):string { return `bbbb${instanceToSpyOn().method(a)}bbbbb`}
        }));

        it('calls the override', () => {
            const arg = 'myes';
            expect(theSpy().method(arg)).to.equal(`bbbbaaa${arg}aaabbbbb`);
            expect(theSpy().method).to.have.been.calledWith(arg);
        });
    });

    context('when overriding a getter', () => {
        stubs(() => ({
            get getterProperty():string {
                return `mno${instanceToSpyOn().getterProperty}`;
            }
        }));

        it('calls the override', () => {
            expect(theSpy().getterProperty).to.equal(`mnomyes`);
        });
    });
});

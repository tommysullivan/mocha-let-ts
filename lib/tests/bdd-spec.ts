import './prepare-test-environment';
import {andGiven, andWhen, given, then, when, xandGiven, xandWhen, xgiven, xthen, xwhen} from "../mocha-let-ts/bdd";
import {expect} from "../mocha-let-ts/mochaTypes";

given('some condition', () => {
    andGiven('some other condition', () => {
        when('some action occurs', () => {
            andWhen('some other action occurs', () => {
                then('the expected outcome is obtained', () => {
                    expect(true).to.be.true;
                });

                xthen('this test should be skipped', () => {
                    expect.fail('forced failure');
                })
            });

            xandWhen('this should be skipped', () => {
                then('this forced failure should not occur', () => {
                    expect.fail('forced failure');
                })
            });
        });

        xwhen('this should be skipped', () => {
            then('this forced failure should not occur', () => {
                expect.fail('forced failure');
            })
        });
    });

    xandGiven('this should be skipped', () => {
        then('this forced failure should not occur', () => {
            expect.fail('forced failure');
        })
    });
});

xgiven('this should be skipped', () => {
    then('this forced failure should not occur', () => {
        expect.fail('forced failure');
    })
});
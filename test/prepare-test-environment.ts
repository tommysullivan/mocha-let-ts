import 'mocha';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as sourceMapSupport from 'source-map-support';

sourceMapSupport.install();
chai.use(sinonChai);
chai.config.includeStack = true;
chai.config.showDiff = true;
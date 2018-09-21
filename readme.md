mocha-let-ts
============

Enables a concise, typesafe, RSpec-like "let" construct. This
is a lightweight typescript wrapper over the bdd-lazy-var library
which does all the heavy lifting.

## Installation

Add to your project as a dev dependency:

    npm i mocha-let-ts --save-dev
    
## Configure Mocha

Mocha must be made aware of the presence of the alternative
UI provided by bdd-lazy-var.

An easy way to do this is by passing the -u param to mocha:

     mocha -u bdd-lazy-var/getter
      
## Usage

Here is an [example mocha test](https://github.com/tommysullivan/mocha-let-ts/blob/master/test/let-spec.ts) demonstrating the use of Let<T>()

## To Publish:

Add your credentials:

    npm adduser
    
Then publish (after updating package version according to semver in package.json):

    npm publish
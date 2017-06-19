# Base Node Module

A project template for creating node modules for the Network Platform in Node/ES6+. This is used as a basic template that has the following out the box.

- Build System ([Gulp](http://gulpjs.com/))
- Code Transformation ([Babel](https://babeljs.io/))
- Code Linting ([ESLint](http://eslint.org/))
- Style Guide ([eslint-config-airbnb](https://github.com/airbnb/javascript))
- Test Runner ([Jest](https://facebook.github.io/jest/))
- CI Ready ([Module CI](https://stash.9msn.net/projects/NM/repos/ci/browse))
- Support Application

## Usage

### Project Structure
---

A module has a defined project structure. This is to ensure that each developer is familiar with each module. The base module uses CommonJs and best practices from the open source community.

- `/` Module meta files.
- `/coverage` Coverage reports.
- `/lib` Transformed JS code, [CommonJS Standard](http://wiki.commonjs.org/wiki/Packages/1.0#Package_Directory_Layout)
- `/src` JS Next source code.
- `/support` Any supporting code for development.
- `/test` Test specs, [CommonJS Standard](http://wiki.commonjs.org/wiki/Packages/1.0#Package_Directory_Layout).

Git by default will ignore `/coverage` and `/lib`. This is intentional as these will be built via CI and available through releasing the module.

### Development
---

It is good practice not to rely on global modules. Modules should run independently with all dependencies. The build task, test, linting, coverage and support application should be able to run within an enclosed directory. To achieve this considering adding `./node_modules/.bin` to your `PATH` env.

_\*nix .bashrc_

```sh
export PATH=$PATH:./node_modules/.bin
```

_Windows_

```
$ set PATH=%PATH%;.\node_modules\.bin
```

### Scripts
---

Scripts are used to build, test, cover, lint and deploy modules. These scripts are set within the `package.json`, and are executed from `npm`. This is for CI purposes, keeping consistent script names enables a module to have it's own build system or use the recommended, [Gulp](http://gulpjs.com/).

##### Testing

```
$ npm test
```

##### Building

Tasks such as code transformation or exposing assets, templates. Follow the project structure and make use of the `/lib` directory to export the module.

```
$ npm run build
```

##### Linting

```
$ npm run lint
```

##### CI

```
$ npm run ci
```

### Deployment
---

Do not publish/deploy a module locally. If the module follows the scripts and uses the module CI for it's testing and deployment, then it's necessary to use it. Module deployments require the `RELEASE` env in the CI pipeline, this is set via the `Build Parameters` in TeamCity.

# DEPLOY ON THE CORRECT BRANCH

When deploying a module, make sure that the correct branch is selected and the relative `RELEASE` is set. *DO NOT* always deploy from `master` unless the deployment is the latest. Bug fixes to previous versions require a new branch.

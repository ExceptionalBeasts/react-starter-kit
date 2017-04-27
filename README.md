# React Starter Kit
Implements a full stack necessary for building a front-end application, complete with a dev server and hot reloading, using:
* React
* Redux (with thunks)
* Sass or Post CSS
* Webpack and Webpack Dev Server
* Babel
* Karma/mocha/chai/sinon/enzyme
* ESlint with Javascript Standard Style

It is not opinionated on how to implement React and Redux, and as such does not provide a sample application.

## Install
```
npm i
```
## Run
To run via Webpack Dev Server, with hot reloading (including React Hot Loading):
```
npm start
```

## Build
To quickly build to the `/dist` folder, for testing directly in the browser:
```
npm run build:quick
```

To build to the `/dist` folder, for production (also runs linting and unit tests):
```
npm run build
```

## Lint
```
npm run lint
```

## Unit Test
```
npm run test
```

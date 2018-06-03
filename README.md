**[Setup](#setup)** | **[Development](#development)** | **[Deployment](#deployment)**

[![Build Status](https://travis-ci.org/jongear/serverless-tour-of-heroes.svg?branch=master)](https://travis-ci.org/jongear/serverless-tour-of-heroes)

# Serverless Tour of Heroes (Serverless ToH)

This is an example project of the Angular Tour of Heroes demo application digitally remaster with serverless architecture.
The Serverless ToH demo is powered by Node.js and is a monorepo containing two applications. The first application is a
serverless API that is backed by API Gateway utilizing Node.js and the [Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/quick-start/).
This application resides in [/api](https://github.com/jongear/serverless-tour-of-heroes/tree/master/api). The second application within
the monorepo is the [Angular Tour of Heroes demo](https://angular.io/tutorial) which is an almost completely untouched replica of the tutorial.
The website resides in [/website](https://github.com/jongear/serverless-tour-of-heroes/tree/master/website) and is deployed out to S3 which is exposed by CloudFront

## Setup

The Serverless ToH demo has been setup to install both application dependencies off of a install command in the root solution directory

```
npm install
```

Running install in the root will kick off a `postinstall` script that will recurse through each directory installing necessary packages.

## Development

For ease of development a few scripts have been added to this demo application

```
npm start
```

Running `npm start` from the root will cause both the api as well as the website projects to start instantly.

### Debugging

A few startup scripts have been configured for VSCode.

`Launch API`: This debug setting will start the Serverless API in offline mode and will attach VSCode's debugger to the process.

`Launch CHrome against localhost angular`: This debug setting will open a browser window to `localhost:4200` and hook up a debug session. It will NOT start the website project. `npm start` must be ran first in the `website` directory first before attaching

## Deployment

The Serverless ToH demo application is backed by [travis-ci](https://docs.travis-ci.com/) for a full CD/CI
pipeline experience. What this means, any merge into master will automatically kickoff the build process.

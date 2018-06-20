**[Prerequisites](#prerequisites)** | **[Setup](#setup)** | **[Development](#development)** | **[Deployment](#deployment)**

# Serverless Tour of Heroes (Serverless ToH)

[![Build Status](https://travis-ci.org/jongear/serverless-tour-of-heroes.svg?branch=master)](https://travis-ci.org/jongear/serverless-tour-of-heroes)

This is an example project of the Angular Tour of Heroes demo application digitally remastered with serverless architecture. The Serverless ToH demo is powered by Node.js and is a monorepo containing two applications.

## Structure

The Serverless ToH demo is structured as a monorepo to allow for a single `git clone` and startup solution.
Within this repository you will find the working codebase for the API as well as for the Angular powered website.

### API

The API is a serverless API that is backed by API Gateway utilizing Node.js and the [Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/quick-start/).
This application resides in [/api](https://github.com/jongear/serverless-tour-of-heroes/tree/master/api) and makes use of [DynamoDB](https://aws.amazon.com/dynamodb/) as a data store.

### Website

The website is the [Angular Tour of Heroes demo](https://angular.io/tutorial) which is an almost completely untouched replica of the tutorial.
The website resides in [/website](https://github.com/jongear/serverless-tour-of-heroes/tree/master/website) and is deployed out to [S3](https://aws.amazon.com/s3/) which is exposed by [CloudFront](https://aws.amazon.com/cloudfront/)

## Prerequisites

### Create User

In order for our serverless application to run we will need to create a user with appropriate privileges. For the puposes of this demo we will assume that you are operating in an account that allowing admin rights to a user will not jeporadize the account. This user will be used by [Travis CI](https://docs.travis-ci.com/) to deploy out our application.

[Create AWS User](https://console.aws.amazon.com/iam/home?#/users$new?step=details)

> Make sure to give the user admin rights

<p align="center">
    <img alt="User admin full access" src="https://github.com/jongear/serverless-tour-of-heroes/raw/master/assets/user-admin.png" width="600" />
</p>

### Create S3 bucket

Next we need to [create an S3 bucket](https://s3.console.aws.amazon.com/s3/home) to house our angular application. I named mine `serverless-tour-of-heroes` but you can name yours whatever you like. One created go to the properties tab of the bucket and enable `Static website hosting` with the following values. Since our angular UI is a single page application we need to ensure that any errors incurred are handled by our `index.html`

<p align="center">
    <img alt="Set S3 static website hosting to index.html" src="https://github.com/jongear/serverless-tour-of-heroes/raw/master/assets/s3-static.png" width="500" />
</p>

### Create CloudFront Distribution

Next we need to [create a CloudFront Distribution](https://console.aws.amazon.com/cloudfront/home). CloudFront is needed as the servicing side to our application. CloudFront allows for custom error page responses as well as direct CNAME integration to bring a fullfledged webhosting experience.

<p align="center">
    <img alt="Setup a CloudFront distribution" src="https://github.com/jongear/serverless-tour-of-heroes/raw/master/assets/cloudfront-settings.png" width="700" />
</p>

When creating the distribution select the S3 bucket you configured in the previous step as the `Origin Domain Name`. You can then scroll down to the `Distirbution Settings` section and add a CNAME if you intend to attach this distribution to a domain, otherwise leave blank. Lastly, make sure to add a `Default Root Object` of `index.html`. This will tell CloudFront that we intend to make the `index.html` of our selected S3 Origin Domain Name the entry point that CloudFront should hand back to browsers.

Create the distribution then navigate to the `Error Pages` tab to add the following configurations.

<p align="center">
    <img alt="Set S3 static website hosting to index.html" src="https://github.com/jongear/serverless-tour-of-heroes/raw/master/assets/cloudfront-errors.png" width="800" />
</p>

The 403 and 404 error code redirects we are adding are needed to route errors back to our angular application so that our angular code can handle them appropriately.

### S3 and CloudFront **BONUS Security**

This section is not needed but is advisable for anything you intend to ship. The S3 configurations we made in an earlier step allow S3 to be publicly accessible which is not always desirable. We can add a `S3 Bucket Policy` that will lock the bucket down to only our deployment user and our CloudFront distribution.

#### Cloudfront **BONUS Security**

To start, we will need to update our CloudFront origin. Go back to your CloudFront distribution, tab over to the `Origins` tab and edit the origin. Elect to `Restrict Bucket Access` and allow `Origin Access Identity` to create a new identity. Save your edit and you should see a screen similar to this

<p align="center">
    <img alt="Restrict Bucket Access in CloudFront" src="https://github.com/jongear/serverless-tour-of-heroes/raw/master/assets/cloudfront-bonus.png" width="800" />
</p>

Copy the `Origin Access Identiy`, this will be needed in our `S3 Bucket Policy` to grant CloudFront access to our secure bucket

#### S3 **BONUS Security**

To bring security full circle we will need to update the `Bucket Policy` to allow our CloudFront distribution and our deployment user to access resources only.

<p align="center">
    <img alt="Restrict Bucket Access in CloudFront" src="https://github.com/jongear/serverless-tour-of-heroes/raw/master/assets/s3-bonus.png" width="800" />
</p>

## Setup

The Serverless ToH demo has been setup to install both application dependencies off of a install command in the root solution directory

```
npm install
```

Running install in the root will kick off a `postinstall` script that will recurse through each directory installing necessary packages.

### Setup API

Copy the example environment file.

```
 cp api/example.env.yml api/env.yml
```

The Serverless API leverages `env.yml` to set environment variables. By default the API is setup to gather variables from `local`.

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

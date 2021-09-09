# Smart Traffic Lights (STL) Web

## Getting Started

1. Install [npm](https://nodejs.org/en/download/) and yarn with `npm install -g yarn`.
2. Clone the repository and enter the project directory with `cd smart-traffic-web`.
3. Install the dependencies with `yarn install`.
4. Create `.env` file based on `.env.example` and fill in with the appropriate values.
5. Run the app with `yarn start`.
6. Open [localhost:3000](http://localhost:3000) to view it in the browser.

To learn React, check out the [React documentation](https://reactjs.org/).

## Deployment: CI/CD with AWS

### Instructions
- You will need an AWS account.
- Setup [STMS API](https://github.com/wulanmantiri/smart-traffic-api) and modify the API endpoint (from Lambda application) in `.env.production`.
- Setup AWS services by following the guidelines below.
- After setup, every push to `master` in your github repository will trigger CI/CD.

### S3
- Create an S3 bucket with the name `smart-traffic-web-<RANDOM-ID>`.
- Leave everything as is for easy configuration.
- After creating, enable static website hosting in `properties` tab with `index.html` as index document. 

### CloudFront
- Create a CloudFront distribution with `origin domain` to be the `smart-traffic-web` S3 bucket.
- Use or create new OAI and update bucket policy.
- In settings, set `index.html` as `default root object`.
- Leave everything as is for easy configuration.
- After creating, copy the Distribution ID for later purposes.

### CodeBuild
- Create a build project with the name `smart-traffic-web-build` and connect to your github repository.
- Enable webhook to rebuild as code changes and add `PUSH` event types.
- Select `Managed image` as environment image with `Amazon Linux 2` OS and `x86_64:3.0` image.
- Use or create new service role that allows full access to your web S3 bucket and CloudFront.
- In `additional configuration`, add the following environment variables:
    1. key: `WEB_S3_BUCKET_NAME`, value: `smart-traffic-web-<RANDOM-ID>`
    2. key: `WEB_CLOUDFRONT_DIST_ID`, value: `<DISTRIBUTION-ID>`
- Optionally, set compute to the lowest spec.
- Leave everything as is for easy configuration.

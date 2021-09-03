# Smart Traffic Management System

## Getting Started

1. Install npm (version 6 or later) and yarn with `npm install -g yarn`.
2. Clone the repository and enter the project directory with `cd smart-traffic-web`.
3. Install the dependencies with `yarn install`.
4. Create `.env` file based on `.env.example` and fill in with the appropriate values.
5. Run the app with `yarn start`.
6. Open [localhost:3000](http://localhost:3000) to view it in the browser.

To learn React, check out the [React documentation](https://reactjs.org/).

## Deployment: AWS

### S3
- Create an S3 bucket with the default configurations. 
- After creating, enable static website hosting in `properties` tab with `index.html` as index document. 

### CloudFront
- Create a CloudFront distribution with `origin domain` to be the S3 bucket. 
- Use or create new OAI and update bucket policy.
- In settings, set `index.html` as `default root object`.
- Leave everything as is for easy configuration.

### CodeBuild
- Create a build project and connect to github repository. 
- Enable webhook to rebuild as code changes and add `PUSH` event types.
- Select `Managed image` as environment image with `Amazon Linux 2` OS and `x86_64:3.0` image. Use or create new service role that allows your web S3 bucket and CloudFront access.
- In `additional configuration`, add `WEB_S3_BUCKET_NAME` and `WEB_CLOUDFRONT_DIST_ID` values in environment variables. Optionally, set compute to the lowest spec.
- Leave everything as is for easy configuration.

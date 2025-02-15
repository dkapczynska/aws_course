import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCourseStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myshop_bucket = new s3.Bucket(this, 'cloud-dev-task2-automated-dep-20250215', {
      versioned: true,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      bucketName: 'cloud-dev-task2-automated-dep-20250215'
  });
  
  myshop_bucket.addToResourcePolicy(new iam.PolicyStatement({
    sid: 'PublicReadGetObject',
    effect: iam.Effect.ALLOW,
    principals: [new iam.AnyPrincipal()],
    actions: ['s3:GetObject'],
    resources: [`${myshop_bucket.bucketArn}/*`]
  }));

  new s3deploy.BucketDeployment(this, 'DeployWebsite', {
    sources: [s3deploy.Source.asset('./myshop_app/nodejs-aws-shop-react/dist')],
    destinationBucket: myshop_bucket,
    destinationKeyPrefix: '/'
  });

}};

# terraform-ecs-template

  

This repository provides a base to setup and ECS Cluster.

  

## Requirements

-  [Terraform](https://www.terraform.io/) - Write, Plan, and Create Infrastructure as Code

-  [ECR](https://aws.amazon.com/ecr/) - This is currently not created in the terraform stack. But can be added

-  [IAM](https://aws.amazon.com/iam/) - IAM Credentials which will be used in your build process

  
  

### Tech

  

Bubble Sort Service uses a number of open source projects to work properly:

*  [node.js] - evented I/O for the backend

*  [Express] - fast node.js network app framework [@tjholowaychuk]

*  [eslint](https://eslint.org/) - The pluggable linting utility for JavaScript and JSX

*  [husky](https://www.npmjs.com/package/husky) - Git hooks made easy

*  [Docker](https://www.docker.com/) - Building and Running Containers

*  [node-docker](https://github.com/tarampampam/node-docker) - Small Docker Image to run node application - tarampampam/node:alpine

*  [Jest](https://jestjs.io/) - Unit Testing

*  [Terraform](https://www.terraform.io/) - Write, Plan, and Create Infrastructure as Code

  

## Project Structure

  

The project is alomost a monolith in itself, and can be split into parts, but for the sake of simplicity and speed we keep everything in one repo.

  

First part we are going to focus on is the src folder

- **app.js** - Starts our express app

- **generateData** - A function that was written to populate the RDS instance

- **startup.js** - Any processes that we want to run at startup is added here. Right now its just ensuring that the database is initialized and tables are sync. It takes in a BOOLEAN value, "true" will clean the DB and recreate the entire schema, false will just ensure that its synced.

- postgres

	- models

	- index.js - This is used to build our DB object dynamically from all the other objects in the folder which are sequelize models.

		## - I know that I coded the DB credentials and this is a NO NO. RED FLAG.

	- How I would solve this: create and .env file dynamically at build. As you can tell hardcoded values are just defaults. Storage for the production data values would be stored as SecureStrings using [SSM](https://aws.amazon.com/blogs/mt/using-aws-systems-manager-parameter-store-secure-string-parameters-in-aws-cloudformation-templates/)

	- Employee.js - This is our domain model for an Employee

	- Region.js - This is a domain model for Region

**To Run this project:**
```bash
$ yarn
$ yarn start
```

 
### Second part of this project is the Dockerfile:
What is does is fairly simple.
 - Copies the code from *src* folder
 - Copies *package.json* as this is all we need for the web-app
 - Copies across a directory called *files*
	 - This contains  a *startupscript.sh* This runs on startup of the container

### Terraform Folder
This is to provision the infrastructure that will run our defined docker container above.

The folder layout is as follows

```
├── asg
|   ├── task-definition
|   |   └──  ecs_task_webapp.tpl
|   ├── alb.tf
|   ├── autoscaling.tf
|   ├── autoscaling_user_data.tpl
|   ├── configuration.auto.tfvars
|   ├── ecs.tf
|   ├── output.tf
|   ├── vars.tf
|   └── terraform.tf
|
├── common
|   ├── configuration.tfvars
|   ├── output.tf
|   ├── security_groups.tf
|   ├── vpc.tf
|   ├── vars.tf
|   └── terraform.tf
|
└── static
    ├── iam
    |   ├── configuration.tfvars
    |   ├── iam.tf
    |   ├── output.tf
    |   └── vars.tf  
	|   └── terraform.tf
    ├── remote-state
    |   ├── bucket.tfvars
    |   ├── dynamodbTable.tf
    |   └── terraform.tf  
    └── ... (other AWS services: SQS, DynamoDB, etc)
```
The "stacks" are split into logical separators. 

 1. **static** - *These are resources will not change often*
	 - **remote-state** - This stack is just created to manage the TF states of all the other stacks 
	 - **iam** - IAM Roles are fairly static and do not need to get rolled out each deployment
2. **common** - This where all the resources will go that are shared across the environment. 
	- **VPC**
			- **Internet Gateways**
			- **Route Tables**
			- **Private/Public Subnets**
	- **Security Groups** 
3. **ASG** - Auto Scaling Group
	-	**ALB** (Application Load Balancer) - Routes traffic to the ECS Cluster (Target Group)
	-	**LaunchConfiguration** - Instructions on what an EC2 instance needs to do in an event of scaling
	-	**ECS** - The ECS Cluster
	-	**Task Definitions** - A list of container definitions that need to run for a task


**Each folder contains a *terraform.tf* folder. This is just the config for where it needs to get the remote state from. This way terraform plan/apply can be run across a team of developers. It will enforce locks each time.**

---
**buildspec.yml**
This is definition file for what gets run on each commit. 

 - env	
	 - variables: Set  *hard-coded* variables
	 - parameter-store: Are retrieved at build time from [SSM](https://aws.amazon.com/blogs/mt/using-aws-systems-manager-parameter-store-secure-string-parameters-in-aws-cloudformation-templates/)

**Some things to note:** We install terraform per build, this can be changed to use a custom docker image with all the prerequisite installed to decrease build time. 

A new image of the Docker Container is pushed to [ECR](https://aws.amazon.com/ecr/) per build.
Post build command runs *terraform apply* only on the **ASG** - (Auto Scaling Group) stack. 
 This can be optimized. To run all 4 stacks, but for the purpose of this exercise it was not necessary.

There is a [CodePipeline](https://eu-west-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/name-and-faces-dev-test-jmaleonard/view?region=eu-west-1) attached to all this. This acts as orchestrator.

---
## THINGS TO IMPROVE

 1. Create a CodeDeploy Task to push new containers to the ECS cluster everytime the ECR image is updated
 2. Add this Task to the CodePipeline
 3. Clean up Code, feels a bit clunky and messy to me still. 

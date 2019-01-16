terraform {
 backend "s3" {
 encrypt = true
 bucket = "bucket-name"
 dynamodb_table = "terraform-state-lock-dynamo"
 region = "eu-west-1"
 key = "common-terraform.tfstate"
 }
}
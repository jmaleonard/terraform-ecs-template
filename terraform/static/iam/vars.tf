/* Terraform constraints */
terraform {
    required_version = ">= 0.11, < 0.12"
}

variable "name_prefix" {
    default = "name-faces-jmaleonard"
    description = "Name prefix for this environment."
}

variable "aws_region" {
    default = "eu-west-1"
    description = "Determine AWS region endpoint to access."
}

/* Region settings for AWS provider */
provider "aws" {
    region = "${var.aws_region}"
}
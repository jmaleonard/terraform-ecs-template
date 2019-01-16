provider "aws" {
  region = "eu-west-1"
}
resource "aws_s3_bucket" "terraform-state-storage-s3" {
    bucket = "bucket name"
 
    versioning {
      enabled = true
    }
 
    lifecycle {
      prevent_destroy = true
    }
 
    tags {
      Name = "S3 Remote Terraform State Store"
    }      
}
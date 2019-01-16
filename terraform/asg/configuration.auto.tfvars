##
# Some of these variables may be removed from this file if the default value exists
# For better understanding, let's specify all variables explicitly here
##
name_prefix = ""
aws_region = "eu-west-1"
ecs_image_id.eu-west-1 = "ami-0693ed7f"
count_webapp = 2
desired_capacity_on_demand = 2
ec2_key_name = "jared-dev-test-key"
instance_type = "t2.micro"
minimum_healthy_percent_webapp = 50

##
# This is a sample (public) Docker image from which can be accessed at https://github.com/docker-training/webapp
# This sample image utilizes Flask and it's not RECOMMENDED to run it directly in production (performance degradation)
# This web server binds to port 8000
##
webapp_docker_image_name = "<YOUR DOCKER IMAGE>"
webapp_docker_image_tag = "latest"

##
# These variables are required, please fill it out with your environment outputs
##
sg_webapp_albs_id = "sg-0471d22c389b50e50"
sg_webapp_instances_id = "sg-00cf320172335d743"
vpc_id = "vpc-0ff9df736460692c9"
subnet_ids = "subnet-0b174d8c3fa6b5814,subnet-0269f55799e7714c2"

ecs_instance_profile = "arn:aws:iam::302705763845:instance-profile/name-faces-jmaleonard_ecs_instance_profile"
ecs_service_role = "name-faces-jmaleonard_ecs_service_role"

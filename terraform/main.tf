provider "aws" {
    region = "${var.aws_region}"
}

data "aws_caller_identity" "current" {}

resource "aws_key_pair" "kp" {
  key_name = "${var.instance_name}_kp"
  public_key =  file("${path.module}/${var.instance_name}_kp.pub") 
}

module "vpc" {
  source = "./modules/vpc"
  instance_name = var.instance_name
}

module "security_group" {
  source = "./modules/security_group"
  vpc_id = module.vpc.vpc_id
  root_ip = "${var.root_ip}"
  instance_name = var.instance_name
}

module "rds" {
  source = "./modules/rds"
  subnet = module.vpc.private_db_subnet_group
  rds_sg_id = module.security_group.rds_sg
  username = var.username
  password = var.password
}

module "ec2_app" {
  source = "./modules/ec2"
  key_name = aws_key_pair.kp.key_name 
  public_subnet = module.vpc.public_subnet_id  
  security_group = module.security_group.ec2_sg
  instance_name = var.instance_name
}



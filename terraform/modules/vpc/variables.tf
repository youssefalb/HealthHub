variable "vpc_cidr_block" {
  description = "CIDR block of the VPC"
  default = "10.0.0.0/16"
}

variable "public_subnet_cidr_block" {
  description = "CIDR block of the public subnet"
  default = "10.0.0.0/24"
}

variable "private_subnet_cidr_block" {
  description = "CIDR block of the public subnet"
  default = "10.0.1.0/24"
}


variable "instance_name" {
  description = "Instance name that is going to be used by vpc"
}

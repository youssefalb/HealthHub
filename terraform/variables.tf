variable "aws_region" {
   default = "eu-central-1"
}

variable "root_ip" {
   description = "Your IP address"
   type = string
   sensitive = true
}

variable "instance_name" {
  description = "name of the key"
  default = "healthHub"
}

variable "username" {
  description = "username for rds"
}

variable "password" {
  description = "password for rds"
}

variable "vpc_id" {
   description = "ID of the VPC"
   type        = string
}

# Variable where we will pass in our IP address from the secrets file
variable "root_ip" {
   description = "My IP address"
   type = string
}

variable "instance_name" {
   description = "Instance name that is going to be used by vpc"
}


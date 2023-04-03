variable "security_group" {
   description = "The security groups assigned to the Jenkins server"
}

# Variable where we will pass in the subnet ID
variable "public_subnet" {
   description = "The public subnet IDs assigned to the healthHub server"
}

variable "instance_type" {
   description = "Instance type to be used by ec2"
   default = "t2.micro"
}

variable "instance_name" {
   description = "Instance name that is going to be used by ec2"
}

variable "key_name" {
   description = "Public key name that is going to be used"
}


variable "docker_compose" {
    type = string
    default =  <<EOF
    version: '3.8'
services:
  web:
    image: claudeperrin228/healthhub:latest
    build:
      context: ./
      target: runner
    volumes:
      - .:/app
    command: npm run dev
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
EOF
}

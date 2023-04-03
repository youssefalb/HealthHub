output "public_ip" {
   description = "The public IP address of the Jenkins server"
   value = aws_eip.ec2_eip.public_ip
}

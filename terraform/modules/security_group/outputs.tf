output "ec2_sg" {
   description = "ec2 security group"
   value = aws_security_group.ec2_sg.id
}

output "rds_sg" {
   description = "rds security group"
   value = aws_security_group.rds_sg.id
}

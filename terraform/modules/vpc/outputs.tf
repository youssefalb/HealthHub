output "public_subnet_id" {
  description = "ID of the public subnet"
  value       = aws_subnet.public_subnet.id
}

output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.vpc.id
}

//output "private_db_subnet_group" {
//  description = ""
//  value       = aws_db_subnet_group.private_db_subnet_group.id
//}

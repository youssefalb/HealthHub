# Data store that holds the available AZs in our region
data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_vpc" "vpc" {
  cidr_block = var.vpc_cidr_block

  enable_dns_hostnames = true

  tags = {
    Name = "${var.instance_name}-vpc"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "${var.instance_name}-igw"
  }
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "${var.instance_name}-public_rt"
  }
}


resource "aws_subnet" "public_subnet" {
  vpc_id = aws_vpc.vpc.id

  cidr_block = var.public_subnet_cidr_block

  availability_zone = data.aws_availability_zones.available.names[0]

  tags = {
    Name = "${var.instance_name}-public_subnet"
  }
}

//resource "aws_subnet" "private_subnet" {
//  vpc_id = aws_vpc.vpc.id
//  cidr_block = var.private_subnet_cidr_block
//  availability_zone = data.aws_availability_zones.available.names[0]
//  
//  tags = {
//  Name = "${var.instance_name}-private_subnet"
//  }
//}
//
//
//resource "aws_db_subnet_group" "private_db_subnet_group" {
//  name       = "private-db-subnet-group"
//  subnet_ids = [aws_subnet.private_subnet.id]
//}
//

resource "aws_route_table_association" "public" {
  route_table_id = aws_route_table.public_rt.id

  subnet_id = aws_subnet.public_subnet.id

}

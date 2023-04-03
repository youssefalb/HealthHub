resource "aws_security_group" "ec2_sg" {
  name = "${var.instance_name}_ec2_sg"
  description = "Security group for HealthHub server"
  vpc_id = var.vpc_id

 # Since HealtHub runs on port 3000, we are allowing all traffic from the internet
  # to be able ot access the EC2 instance on port 3000
  ingress {
    description = "Allow all traffic through port 3000"
    from_port = "3000"
    to_port = "3000"
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Since we only want to be able to SSH into the EC2 instance, we are only
  # allowing traffic from our IP on port 22
  ingress {
    description = "Allow SSH from my computer"
    from_port = "22"
    to_port = "22"
    protocol = "tcp"
//    cidr_blocks = ["0.0.0.0/0"]
    cidr_blocks = ["${var.root_ip}/32"]
  }

  # We want the EC2 instance to being able to talk to the internet
  egress {
    description = "Allow all outbound traffic"
    from_port = "0"
    to_port = "0"
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.instance_name}_ec2_sg"
  }
}

resource "aws_security_group" "rds_sg" {
  name = "${var.instance_name}_rds_sg"
  description = "Security group for HealthHub server"
  vpc_id = var.vpc_id

  ingress {
    description = "Allow traffic through port 5432"
    from_port = "5432"
    to_port = "5432"
    protocol = "tcp"
    security_groups = [aws_security_group.ec2_sg.id]

  }

  tags = {
    Name = "${var.instance_name}_rds_sg"
  }
}



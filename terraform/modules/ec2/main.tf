

data "aws_ami" "ubuntu" {
   most_recent = "true"

   filter {
      name = "name"
      values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
   }

   filter {
      name = "virtualization-type"
      values = ["hvm"]
   }

   owners = ["099720109477"]
}

# Creating an EC2 instance called jenkins_server
resource "aws_instance" "ec2_server" {
   ami = data.aws_ami.ubuntu.id

   subnet_id = var.public_subnet

   instance_type = var.instance_type

   vpc_security_group_ids = [var.security_group]

   key_name = "${var.key_name}"
   
   user_data = "${file("${path.module}/setup.sh")}"

   tags = {
      Name = "${var.instance_name}_server"
   }
}

resource "aws_eip" "ec2_eip" {
   instance = aws_instance.ec2_server.id

   vpc      = true

   tags = {
      Name = "${var.instance_name}_eip"
   }
}

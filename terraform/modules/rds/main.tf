resource "aws_db_instance" "rds_instance" {
  identifier            = "rds-instance"
  engine                = "postgres"
  instance_class        = "db.t2.micro"
  allocated_storage     = 20
  db_subnet_group_name  = var.subnet
  vpc_security_group_ids = [var.rds_sg_id]
  username              = var.username
  password              = var.password
  parameter_group_name  = "default.postgres10"
  skip_final_snapshot   = true
}


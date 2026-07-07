locals {

  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    Owner       = var.owner
    ManagedBy   = "Terraform"
  }

  vnet_name = "${var.project_name}-${var.environment}-vnet"

  frontend_subnet_name = "frontend-subnet"
  backend_subnet_name  = "backend-subnet"
  bastion_subnet_name  = "AzureBastionSubnet"
  appgw_subnet_name    = "appgw-subnet"
  db_subnet_name       = "database-subnet"

}
resource "azurerm_public_ip" "frontend_vm" {

  name                = "${var.project_name}-${var.environment}-frontend-vm-pip"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  allocation_method = "Static"
  sku               = "Standard"

  tags = local.common_tags
}


resource "azurerm_public_ip" "backend_vm" {

  name                = "${var.project_name}-${var.environment}-backend-vm-pip"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  allocation_method = "Static"
  sku               = "Standard"

  tags = local.common_tags
}
resource "azurerm_public_ip" "bastion" {

  name                = "${var.project_name}-${var.environment}-bastion-pip"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  allocation_method = "Static"
  sku               = "Standard"

  tags = local.common_tags
}
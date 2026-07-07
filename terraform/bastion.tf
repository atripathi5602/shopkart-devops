resource "azurerm_bastion_host" "bastion" {

  name                = "${var.project_name}-${var.environment}-bastion"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  sku = "Basic"

  ip_configuration {

    name                 = "configuration"
    subnet_id            = azurerm_subnet.bastion.id
    public_ip_address_id = azurerm_public_ip.bastion.id

  }

  tags = local.common_tags
}
resource "azurerm_network_interface" "frontend_nic" {

  name                = "${var.project_name}-${var.environment}-frontend-nic"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  ip_configuration {

    name                          = "internal"
    subnet_id                     = azurerm_subnet.frontend.id
    private_ip_address_allocation = "Dynamic"

    public_ip_address_id = azurerm_public_ip.frontend_vm.id
  }

  tags = local.common_tags
}

resource "azurerm_network_interface" "backend_nic" {

  name                = "${var.project_name}-${var.environment}-backend-nic"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  ip_configuration {

    name                          = "internal"
    subnet_id                     = azurerm_subnet.backend.id
    private_ip_address_allocation = "Dynamic"

    public_ip_address_id = azurerm_public_ip.backend_vm.id
  }

  tags = local.common_tags
}

resource "azurerm_subnet_network_security_group_association" "frontend" {

  subnet_id                 = azurerm_subnet.frontend.id
  network_security_group_id = azurerm_network_security_group.frontend_nsg.id

}

resource "azurerm_subnet_network_security_group_association" "backend" {

  subnet_id                 = azurerm_subnet.backend.id
  network_security_group_id = azurerm_network_security_group.backend_nsg.id

}
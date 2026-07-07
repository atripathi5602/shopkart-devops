resource "azurerm_linux_virtual_machine" "frontend_vm" {

  name                = var.frontend_vm_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  size                = var.vm_size

  admin_username = var.admin_username

  network_interface_ids = [
    azurerm_network_interface.frontend_nic.id
  ]

  disable_password_authentication = true

  admin_ssh_key {
    username   = var.admin_username
    public_key = tls_private_key.ssh_key.public_key_openssh
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Premium_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts-gen2"
    version   = "latest"
  }

  identity {
    type = "SystemAssigned"
  }

  computer_name = "frontend"

  custom_data = base64encode(file("${path.module}/cloud-init/frontend-cloud-init.yaml"))

  tags = local.common_tags
}
# resource "azurerm_role_assignment" "frontend_acr_pull" {

#   scope                = azurerm_container_registry.acr.id
#   role_definition_name = "AcrPull"

#   principal_id = azurerm_linux_virtual_machine.frontend_vm.identity[0].principal_id
# }
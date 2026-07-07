#####################################
# Resource Group
#####################################

output "resource_group_name" {
  description = "Resource Group Name"
  value       = azurerm_resource_group.rg.name
}

output "resource_group_location" {
  description = "Azure Region"
  value       = azurerm_resource_group.rg.location
}

#####################################
# Virtual Network
#####################################

output "virtual_network_name" {
  description = "Virtual Network Name"
  value       = azurerm_virtual_network.vnet.name
}

output "virtual_network_id" {
  description = "Virtual Network ID"
  value       = azurerm_virtual_network.vnet.id
}

#####################################
# Subnets
#####################################

output "frontend_subnet_id" {
  value = azurerm_subnet.frontend.id
}

output "backend_subnet_id" {
  value = azurerm_subnet.backend.id
}

output "bastion_subnet_id" {
  value = azurerm_subnet.bastion.id
}

output "application_gateway_subnet_id" {
  value = azurerm_subnet.application_gateway.id
}

#####################################
# Virtual Machines
#####################################

output "frontend_vm_id" {
  value = azurerm_linux_virtual_machine.frontend_vm.id
}

output "backend_vm_id" {
  value = azurerm_linux_virtual_machine.backend_vm.id
}

output "frontend_vm_name" {
  value = azurerm_linux_virtual_machine.frontend_vm.name
}

output "backend_vm_name" {
  value = azurerm_linux_virtual_machine.backend_vm.name
}

#####################################
# Network Interfaces
#####################################

output "frontend_nic_id" {
  value = azurerm_network_interface.frontend_nic.id
}

output "backend_nic_id" {
  value = azurerm_network_interface.backend_nic.id
}

#####################################
# Azure Container Registry
#####################################

output "acr_id" {
  value = azurerm_container_registry.acr.id
}

output "acr_name" {
  value = azurerm_container_registry.acr.name
}

output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}

#####################################
# Key Vault
#####################################

output "key_vault_id" {
  value = azurerm_key_vault.kv.id
}

output "key_vault_uri" {
  value = azurerm_key_vault.kv.vault_uri
}

#####################################
# Bastion
#####################################

output "bastion_id" {
  value = azurerm_bastion_host.bastion.id
}

#####################################
# Log Analytics
#####################################

output "log_analytics_workspace_id" {
  value = azurerm_log_analytics_workspace.law.id
}

output "log_analytics_workspace_name" {
  value = azurerm_log_analytics_workspace.law.name
}

output "frontend_public_ip" {
  value = azurerm_public_ip.frontend_vm.ip_address
}


output "backend_public_ip" {
  value = azurerm_public_ip.backend_vm.ip_address
}
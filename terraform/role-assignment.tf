resource "azurerm_role_assignment" "backend_acr_pull" {

  scope = azurerm_container_registry.acr.id

  role_definition_name = "AcrPull"

  principal_id = azurerm_linux_virtual_machine.backend_vm.identity[0].principal_id

}


resource "azurerm_role_assignment" "frontend_acr_pull" {

  scope = azurerm_container_registry.acr.id

  role_definition_name = "AcrPull"

  principal_id = azurerm_linux_virtual_machine.frontend_vm.identity[0].principal_id

}

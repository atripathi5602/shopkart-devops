resource "azurerm_subnet" "frontend" {

  name                 = local.frontend_subnet_name
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name

  address_prefixes = var.frontend_subnet

}

resource "azurerm_subnet" "backend" {

  name                 = local.backend_subnet_name
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name

  address_prefixes = var.backend_subnet

}

resource "azurerm_subnet" "bastion" {

  name                 = local.bastion_subnet_name
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name

  address_prefixes = var.bastion_subnet

}

resource "azurerm_subnet" "application_gateway" {

  name                 = local.appgw_subnet_name
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name

  address_prefixes = var.appgw_subnet

}

resource "azurerm_subnet" "database" {

  name                 = local.db_subnet_name
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name

  address_prefixes = var.database_subnet

  delegation {

    name = "mysql-delegation"

    service_delegation {

      name = "Microsoft.DBforMySQL/flexibleServers"

      actions = [
        "Microsoft.Network/virtualNetworks/subnets/join/action"
      ]
    }
  }

}
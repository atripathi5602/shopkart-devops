resource "azurerm_route_table" "rt" {

  name                = "${var.project_name}-${var.environment}-rt"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  tags = local.common_tags
}

resource "azurerm_subnet_route_table_association" "frontend" {

  subnet_id      = azurerm_subnet.frontend.id
  route_table_id = azurerm_route_table.rt.id

}

resource "azurerm_subnet_route_table_association" "backend" {

  subnet_id      = azurerm_subnet.backend.id
  route_table_id = azurerm_route_table.rt.id

}
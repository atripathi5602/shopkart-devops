# resource "azurerm_mysql_flexible_server" "mysql" {

#   name                = "atripathi5602mysql-eastus"
#   resource_group_name = azurerm_resource_group.rg.name
#   location            = "eastus"

#   administrator_login    = var.mysql_admin_username
#   administrator_password = var.mysql_admin_password

#   sku_name = "B_Standard_B1ms"
#   version  = "8.0.21"

#   storage {
#     size_gb = 20
#   }

#   backup_retention_days = 7

#   tags = local.common_tags
# }

# resource "azurerm_mysql_flexible_database" "shopkart" {
#   name                = "shopkart"
#   resource_group_name = azurerm_resource_group.rg.name
#   server_name         = azurerm_mysql_flexible_server.mysql.name
#   charset             = "utf8mb4"
#   collation           = "utf8mb4_unicode_ci"
# }

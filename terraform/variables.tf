variable "subscription_id" {
  description = "Azure Subscription ID"
  type        = string
}

variable "resource_group_name" {
  description = "Resource Group Name"
  type        = string
}

variable "location" {
  description = "Azure Region"
  type        = string
}

variable "environment" {
  description = "Environment Name"
  type        = string
}

variable "project_name" {
  description = "Project Name"
  type        = string
}

variable "owner" {
  description = "Project Owner"
  type        = string
}


variable "vnet_address_space" {
  type    = list(string)
  default = ["10.0.0.0/16"]
}

variable "frontend_subnet" {
  type    = list(string)
  default = ["10.0.1.0/24"]
}

variable "backend_subnet" {
  type    = list(string)
  default = ["10.0.2.0/24"]
}

variable "bastion_subnet" {
  type    = list(string)
  default = ["10.0.3.0/24"]
}

variable "appgw_subnet" {
  type    = list(string)
  default = ["10.0.4.0/24"]
}

variable "database_subnet" {
  type    = list(string)
  default = ["10.0.5.0/24"]
}

variable "vm_size" {
  type    = string
  default = "Standard_B2ats_v2"
}

variable "admin_username" {
  type    = string
  default = "azureuser"
}
variable "frontend_vm_name" {
  type    = string
  default = "frontend-vm"
}

variable "backend_vm_name" {
  type    = string
  default = "backend-vm"
}
variable "key_vault_name" {
  description = "Azure Key Vault Name"
  type        = string
}
variable "acr_name" {
  description = "Azure Container Registry name"
  type        = string
}

variable "acr_sku" {
  description = "Azure Container Registry SKU"
  type        = string
  default     = "Basic"
}

variable "log_analytics_workspace_name" {
  description = "Log Analytics Workspace Name"
  type        = string
}

variable "log_analytics_sku" {
  description = "Log Analytics Workspace SKU"
  type        = string
  default     = "PerGB2018"
}

variable "log_retention_days" {
  description = "Log retention period"
  type        = number
  default     = 30
}

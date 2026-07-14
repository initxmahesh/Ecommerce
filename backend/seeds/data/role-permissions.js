import { PERMISSIONS } from "./permissions.js";

export const permissionKey = (permission) =>
  `${permission.module}:${permission.action}:${permission.resource}`;

const ALL_PERMISSIONS = PERMISSIONS.map(permissionKey);

export const ROLE_PERMISSIONS = {
  super_admin: ALL_PERMISSIONS,

  admin: [
    "products:manage:product",
    "orders:manage:order",
    "reviews:manage:review",
    "content:manage:content",
    "vendor:manage:shop",
    "inventory:manage:inventory",
    "delivery:manage:shipment",
    "support:manage:ticket",
    "finance:read:payment",
    "finance:read:payout",
    "marketing:read:campaign",
    "analytics:read:analytics",
    "users:read:user",
    "users:manage:user",
    "categories:manage:category",
  ],

  vendor_owner: [
    "products:read:product",
    "products:create:product",
    "products:update:product",
    "products:delete:product",
    "products:import:product",
    "products:export:product",
    "orders:read:order",
    "orders:update:order",
    "vendor:read:shop",
    "vendor:update:shop",
    "vendor:manage:staff",
    "inventory:read:inventory",
    "inventory:update:inventory",
    "inventory:import:inventory",
    "inventory:export:inventory",
    "finance:read:payout",
    "analytics:read:analytics",
  ],

  vendor_manager: [
    "products:read:product",
    "products:create:product",
    "products:update:product",
    "products:import:product",
    "products:export:product",
    "orders:read:order",
    "orders:update:order",
    "vendor:read:shop",
    "vendor:manage:staff",
    "inventory:read:inventory",
    "inventory:update:inventory",
    "inventory:import:inventory",
    "inventory:export:inventory",
    "analytics:read:analytics",
  ],

  vendor_staff: [
    "products:read:product",
    "products:create:product",
    "products:update:product",
    "products:export:product",
    "orders:read:order",
    "orders:update:order",
    "vendor:read:shop",
    "inventory:read:inventory",
    "inventory:update:inventory",
    "inventory:export:inventory",
  ],

  customer: [
    "products:read:product",
    "orders:create:order",
    "orders:read:order",
    "cart:manage:cart",
    "wishlist:manage:wishlist",
    "reviews:create:review",
  ],

  support_agent: [
    "support:read:ticket",
    "support:update:ticket",
    "orders:read:order",
    "users:read:user",
    "products:read:product",
  ],

  warehouse_staff: [
    "inventory:read:inventory",
    "inventory:update:inventory",
    "inventory:manage:inventory",
    "inventory:import:inventory",
    "inventory:export:inventory",
    "orders:read:order",
    "orders:update:order",
    "products:read:product",
    "products:export:product",
  ],

  delivery_partner: [
    "delivery:read:shipment",
    "delivery:update:shipment",
    "orders:read:order",
  ],

  finance: [
    "finance:read:payment",
    "finance:manage:payment",
    "finance:read:payout",
    "finance:manage:payout",
    "orders:read:order",
    "analytics:read:analytics",
    "vendor:read:shop",
  ],

  content_moderator: [
    "content:read:content",
    "content:moderate:content",
    "reviews:manage:review",
    "products:read:product",
  ],

  marketing: [
    "marketing:read:campaign",
    "marketing:create:campaign",
    "marketing:manage:campaign",
    "products:read:product",
    "analytics:read:analytics",
  ],
};

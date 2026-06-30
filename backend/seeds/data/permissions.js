export const PERMISSIONS = [
  // System
  {
    module: "system",
    action: "manage",
    resource: "settings",
    name: "Manage System Settings",
    description: "Configure platform-wide system settings",
  },

  // Products
  {
    module: "products",
    action: "read",
    resource: "product",
    name: "Read Products",
    description: "View product listings and details",
  },
  {
    module: "products",
    action: "create",
    resource: "product",
    name: "Create Products",
    description: "Create new products",
  },
  {
    module: "products",
    action: "update",
    resource: "product",
    name: "Update Products",
    description: "Update existing products",
  },
  {
    module: "products",
    action: "delete",
    resource: "product",
    name: "Delete Products",
    description: "Delete products",
  },
  {
    module: "products",
    action: "manage",
    resource: "product",
    name: "Manage All Products",
    description: "Full product administration across the platform",
  },

  // Orders
  {
    module: "orders",
    action: "create",
    resource: "order",
    name: "Create Orders",
    description: "Place orders",
  },
  {
    module: "orders",
    action: "read",
    resource: "order",
    name: "Read Orders",
    description: "View orders",
  },
  {
    module: "orders",
    action: "update",
    resource: "order",
    name: "Update Orders",
    description: "Update order status and fulfillment details",
  },
  {
    module: "orders",
    action: "manage",
    resource: "order",
    name: "Manage All Orders",
    description: "Full order administration across the platform",
  },

  // Cart & wishlist
  {
    module: "cart",
    action: "manage",
    resource: "cart",
    name: "Manage Cart",
    description: "Add, update, and remove cart items",
  },
  {
    module: "wishlist",
    action: "manage",
    resource: "wishlist",
    name: "Manage Wishlist",
    description: "Add and remove wishlist items",
  },

  // Reviews & content
  {
    module: "reviews",
    action: "create",
    resource: "review",
    name: "Create Reviews",
    description: "Submit product reviews",
  },
  {
    module: "reviews",
    action: "manage",
    resource: "review",
    name: "Manage Reviews",
    description: "Moderate all reviews",
  },
  {
    module: "content",
    action: "read",
    resource: "content",
    name: "Read Content",
    description: "View content pending moderation",
  },
  {
    module: "content",
    action: "moderate",
    resource: "content",
    name: "Moderate Content",
    description: "Approve or reject user-generated content",
  },
  {
    module: "content",
    action: "manage",
    resource: "content",
    name: "Manage Content",
    description: "Full content moderation administration",
  },

  // Vendor shop & staff
  {
    module: "vendor",
    action: "read",
    resource: "shop",
    name: "Read Shop",
    description: "View vendor shop profile",
  },
  {
    module: "vendor",
    action: "update",
    resource: "shop",
    name: "Update Shop",
    description: "Update vendor shop profile",
  },
  {
    module: "vendor",
    action: "manage",
    resource: "shop",
    name: "Manage Vendors",
    description: "Administer all vendor shops on the platform",
  },
  {
    module: "vendor",
    action: "manage",
    resource: "staff",
    name: "Manage Vendor Staff",
    description: "Invite and manage vendor team members",
  },

  // Inventory & warehouse
  {
    module: "inventory",
    action: "read",
    resource: "inventory",
    name: "Read Inventory",
    description: "View stock levels and warehouse data",
  },
  {
    module: "inventory",
    action: "update",
    resource: "inventory",
    name: "Update Inventory",
    description: "Adjust stock levels and warehouse records",
  },
  {
    module: "inventory",
    action: "manage",
    resource: "inventory",
    name: "Manage Inventory",
    description: "Full inventory and warehouse administration",
  },

  // Delivery
  {
    module: "delivery",
    action: "read",
    resource: "shipment",
    name: "Read Shipments",
    description: "View assigned deliveries and shipment status",
  },
  {
    module: "delivery",
    action: "update",
    resource: "shipment",
    name: "Update Shipments",
    description: "Update delivery and shipment progress",
  },
  {
    module: "delivery",
    action: "manage",
    resource: "shipment",
    name: "Manage Deliveries",
    description: "Full delivery operations administration",
  },

  // Support
  {
    module: "support",
    action: "read",
    resource: "ticket",
    name: "Read Support Tickets",
    description: "View support tickets",
  },
  {
    module: "support",
    action: "update",
    resource: "ticket",
    name: "Update Support Tickets",
    description: "Respond to and update support tickets",
  },
  {
    module: "support",
    action: "manage",
    resource: "ticket",
    name: "Manage Support Tickets",
    description: "Full support desk administration",
  },

  // Finance
  {
    module: "finance",
    action: "read",
    resource: "payment",
    name: "Read Payments",
    description: "View payment transactions",
  },
  {
    module: "finance",
    action: "manage",
    resource: "payment",
    name: "Manage Payments",
    description: "Process refunds and payment adjustments",
  },
  {
    module: "finance",
    action: "read",
    resource: "payout",
    name: "Read Payouts",
    description: "View vendor payout records",
  },
  {
    module: "finance",
    action: "manage",
    resource: "payout",
    name: "Manage Payouts",
    description: "Approve and process vendor payouts",
  },

  // Marketing
  {
    module: "marketing",
    action: "read",
    resource: "campaign",
    name: "Read Campaigns",
    description: "View marketing campaigns and promotions",
  },
  {
    module: "marketing",
    action: "create",
    resource: "campaign",
    name: "Create Campaigns",
    description: "Create marketing campaigns and promotions",
  },
  {
    module: "marketing",
    action: "manage",
    resource: "campaign",
    name: "Manage Campaigns",
    description: "Full marketing campaign administration",
  },

  // Analytics
  {
    module: "analytics",
    action: "read",
    resource: "analytics",
    name: "Read Analytics",
    description: "View analytics dashboards",
  },
  {
    module: "analytics",
    action: "manage",
    resource: "analytics",
    name: "Manage Analytics",
    description: "Configure analytics and reporting access",
  },

  // Users & roles
  {
    module: "users",
    action: "read",
    resource: "user",
    name: "Read Users",
    description: "View user profiles",
  },
  {
    module: "users",
    action: "manage",
    resource: "user",
    name: "Manage Users",
    description: "Create, update, and deactivate users",
  },
  {
    module: "roles",
    action: "manage",
    resource: "role",
    name: "Manage Roles",
    description: "Assign roles and permissions",
  },

  // Categories
  {
    module: "categories",
    action: "manage",
    resource: "category",
    name: "Manage Categories",
    description: "Create and update product categories",
  },
];

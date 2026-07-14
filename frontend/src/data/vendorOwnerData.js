export const STATUS_STYLES = {
  Published: { sc: "#059669", sb: "rgba(16,185,129,0.1)" },
  Active: { sc: "#059669", sb: "rgba(16,185,129,0.1)" },
  Draft: { sc: "#64748b", sb: "#f1f5f9" },
  "Pending Review": { sc: "#d97706", sb: "rgba(245,158,11,0.1)" },
  Unfulfilled: { sc: "#d97706", sb: "rgba(245,158,11,0.1)" },
  Fulfilled: { sc: "#059669", sb: "rgba(16,185,129,0.1)" },
  Shipped: { sc: "#2563eb", sb: "rgba(59,130,246,0.1)" },
  Delivered: { sc: "#10b981", sb: "rgba(16,185,129,0.1)" },
  Refunded: { sc: "#dc2626", sb: "rgba(239,68,68,0.1)" },
  Cancelled: { sc: "#64748b", sb: "#f1f5f9" },
  "In Stock": { sc: "#059669", sb: "rgba(16,185,129,0.1)" },
  "Low Stock": { sc: "#d97706", sb: "rgba(245,158,11,0.1)" },
  "Out of Stock": { sc: "#dc2626", sb: "rgba(239,68,68,0.1)" },
};

export const PAGE_TITLES = {
  home: "Dashboard",
  products: "Products",
  "add-product": "Add Product",
  orders: "Orders",
  inventory: "Inventory",
  customers: "Customers",
  analytics: "Analytics",
  discounts: "Discounts",
  marketing: "Marketing",
  staff: "Staff",
  shipping: "Shipping",
  payments: "Payments",
  settings: "Settings",
};

export const NAV_GROUPS = [
  {
    label: "STORE",
    items: [
      {
        id: "home",
        icon: "space_dashboard",
        label: "Dashboard",
        path: "/vendor",
      },
      {
        id: "orders",
        icon: "shopping_bag",
        label: "Orders",
        path: "/vendor/orders",
        badge: "18",
      },
      {
        id: "products",
        icon: "inventory_2",
        label: "Products",
        path: "/vendor/products",
      },
      {
        id: "inventory",
        icon: "warehouse",
        label: "Inventory",
        path: "/vendor/inventory",
      },
      {
        id: "customers",
        icon: "group",
        label: "Customers",
        path: "/vendor/customers",
      },
    ],
  },
  {
    label: "SALES",
    items: [
      {
        id: "analytics",
        icon: "monitoring",
        label: "Analytics",
        path: "/vendor/analytics",
      },
      {
        id: "discounts",
        icon: "local_offer",
        label: "Discounts",
        path: "/vendor/discounts",
      },
      {
        id: "marketing",
        icon: "campaign",
        label: "Marketing",
        path: "/vendor/marketing",
      },
    ],
  },
  {
    label: "MANAGE",
    items: [
      {
        id: "staff",
        icon: "badge",
        label: "Staff",
        path: "/vendor/staff",
      },
      {
        id: "shipping",
        icon: "local_shipping",
        label: "Shipping",
        path: "/vendor/shipping",
      },
      {
        id: "payments",
        icon: "payments",
        label: "Payments",
        path: "/vendor/payments",
      },
      {
        id: "settings",
        icon: "settings",
        label: "Settings",
        path: "/vendor/settings",
      },
    ],
  },
];

export const VENDOR_PROFILE = {
  storeName: "TechGadgets Pro",
  storeDomain: "techgadgets.marketbase.com",
  ownerName: "John Doe",
  initials: "JD",
  greeting: "Good morning, John",
};

export const HOME_KPIS = [
  {
    label: "Today's Sales",
    value: "$1,847",
    change: "+23.1%",
    icon: "attach_money",
    iconBg: "rgba(16,185,129,0.1)",
    iconColor: "#10b981",
    changeColor: "#10b981",
  },
  {
    label: "Orders",
    value: "64",
    change: "+12",
    icon: "shopping_cart",
    iconBg: "rgba(59,130,246,0.1)",
    iconColor: "#3b82f6",
    changeColor: "#10b981",
  },
  {
    label: "Visitors",
    value: "2,341",
    change: "+8.7%",
    icon: "visibility",
    iconBg: "rgba(99,102,241,0.1)",
    iconColor: "#6366f1",
    changeColor: "#10b981",
  },
  {
    label: "Conversion",
    value: "2.7%",
    change: "-0.3%",
    icon: "trending_up",
    iconBg: "rgba(245,158,11,0.1)",
    iconColor: "#f59e0b",
    changeColor: "#ef4444",
  },
];

export const SALES_BARS = [
  { l: "Mon", h: "55%" },
  { l: "Tue", h: "72%" },
  { l: "Wed", h: "65%" },
  { l: "Thu", h: "88%" },
  { l: "Fri", h: "95%" },
  { l: "Sat", h: "78%" },
  { l: "Sun", h: "100%" },
];

export const RECENT_ORDERS = [
  { id: "#1042", customer: "Sarah Chen", total: "$234.50", status: "Unfulfilled" },
  { id: "#1041", customer: "Mike Johnson", total: "$67.80", status: "Shipped" },
  { id: "#1040", customer: "Emma Davis", total: "$189.00", status: "Fulfilled" },
  { id: "#1039", customer: "Alex Kumar", total: "$412.30", status: "Unfulfilled" },
  { id: "#1038", customer: "Lisa Park", total: "$52.99", status: "Delivered" },
  { id: "#1040", customer: "Emma Davis", total: "$189.00", status: "Fulfilled" },
  { id: "#1039", customer: "Alex Kumar", total: "$412.30", status: "Unfulfilled" },
  { id: "#1038", customer: "Lisa Park", total: "$52.99", status: "Delivered" },
  { id: "#1040", customer: "Emma Davis", total: "$189.00", status: "Fulfilled" },
  { id: "#1039", customer: "Alex Kumar", total: "$412.30", status: "Unfulfilled" },
  { id: "#1038", customer: "Lisa Park", total: "$52.99", status: "Delivered" },
];

export const LOW_STOCK = [
  { name: "Wireless Pro Earbuds", sku: "WPE-001", qty: "3", qtyC: "#ef4444", reorder: "20" },
  { name: "USB-C Hub 7-in-1", sku: "UCH-012", qty: "8", qtyC: "#f59e0b", reorder: "15" },
  { name: "Phone Stand MagSafe", sku: "PSM-044", qty: "5", qtyC: "#ef4444", reorder: "10" },
  { name: "Mouse Pad XL", sku: "MPX-033", qty: "12", qtyC: "#f59e0b", reorder: "20" },
];

export const PRODUCT_STATUS = [
  { label: "Published", count: "128", dot: "#10b981" },
  { label: "Draft", count: "8", dot: "#94a3b8" },
  { label: "Out of Stock", count: "3", dot: "#ef4444" },
  { label: "Pending Review", count: "3", dot: "#f59e0b" },
];

export const PRODUCT_TABS = [
  { id: "all", label: "All", count: "142" },
  { id: "published", label: "Published", count: "128" },
  { id: "draft", label: "Draft", count: "8" },
  { id: "pending", label: "Pending", count: "3" },
  { id: "out_of_stock", label: "Out of Stock", count: "3" },
];

export const PRODUCT_ROWS = [
  {
    name: "Wireless Pro Earbuds",
    sku: "WPE-001",
    category: "Audio",
    price: "$29.99",
    stock: "3",
    sold: "142",
    status: "Published",
    imgIcon: "headphones",
    imgBg: "#f0f0ff",
    imgC: "#6366f1",
  },
  {
    name: "USB-C Fast Charger",
    sku: "UCF-023",
    category: "Chargers",
    price: "$29.99",
    stock: "142",
    sold: "98",
    status: "Published",
    imgIcon: "bolt",
    imgBg: "#ecfdf5",
    imgC: "#10b981",
  },
  {
    name: "Laptop Stand Aluminum",
    sku: "LSA-007",
    category: "Stands",
    price: "$39.99",
    stock: "76",
    sold: "76",
    status: "Published",
    imgIcon: "laptop",
    imgBg: "#eff6ff",
    imgC: "#3b82f6",
  },
  {
    name: "Mechanical Keyboard RGB",
    sku: "MKR-056",
    category: "Input",
    price: "$79.99",
    stock: "54",
    sold: "54",
    status: "Published",
    imgIcon: "keyboard",
    imgBg: "#fffbeb",
    imgC: "#f59e0b",
  },
  {
    name: "Smart LED Desk Lamp",
    sku: "SLD-034",
    category: "Lighting",
    price: "$39.99",
    stock: "43",
    sold: "43",
    status: "Published",
    imgIcon: "light",
    imgBg: "#fef2f2",
    imgC: "#ef4444",
  },
  {
    name: "USB-C Hub 7-in-1",
    sku: "UCH-012",
    category: "Accessories",
    price: "$49.99",
    stock: "8",
    sold: "67",
    status: "Published",
    imgIcon: "hub",
    imgBg: "#f8fafc",
    imgC: "#64748b",
  },
  {
    name: "USB-C Dock Pro",
    sku: "UDP-099",
    category: "Accessories",
    price: "$89.99",
    stock: "0",
    sold: "0",
    status: "Draft",
    imgIcon: "dock",
    imgBg: "#f8fafc",
    imgC: "#94a3b8",
  },
  {
    name: "Webcam HD 1080p",
    sku: "WHD-044",
    category: "Video",
    price: "$59.99",
    stock: "31",
    sold: "45",
    status: "Published",
    imgIcon: "videocam",
    imgBg: "#f5f3ff",
    imgC: "#7c3aed",
  },
].map((p) => {
  const stockNum = parseInt(p.stock, 10);
  const stockC =
    stockNum <= 5 ? "#ef4444" : stockNum <= 20 ? "#f59e0b" : "#10b981";
  return { ...p, stockC };
});

export const PRODUCT_FORM_SECTIONS = [
  {
    title: "Basic Information",
    desc: "Product name, description, and brand",
    fields: [
      {
        id: "name",
        label: "Product Name",
        type: "text",
        placeholder: "e.g. Wireless Pro Earbuds",
        required: true,
      },
      {
        id: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Write a detailed product description…",
        required: true,
      },
      {
        id: "brand",
        label: "Brand",
        type: "text",
        placeholder: "e.g. TechGadgets",
      },
    ],
  },
  {
    title: "Category & Tags",
    desc: "Help customers find your product",
    fields: [
      {
        id: "category",
        label: "Category",
        type: "select",
        options: [
          "Select category",
          "Electronics",
          "Audio",
          "Chargers",
          "Accessories",
          "Stands",
          "Input",
          "Lighting",
          "Video",
        ],
        required: true,
      },
      {
        id: "tags",
        label: "Tags",
        type: "text",
        placeholder: "wireless, earbuds, bluetooth (comma separated)",
        hint: "Add tags to improve search visibility",
      },
    ],
  },
  {
    title: "Images",
    desc: "Upload up to 8 product images. First image is the main display.",
    fields: [{ id: "images", label: "Product Images", type: "upload", required: true }],
  },
  {
    title: "Pricing",
    desc: "Set product price and compare-at price",
    fields: [
      {
        id: "price",
        label: "Price",
        type: "number",
        placeholder: "29.99",
        required: true,
      },
      {
        id: "compareAt",
        label: "Compare at Price",
        type: "number",
        placeholder: "39.99",
        hint: "Original price for showing discounts",
      },
      {
        id: "cost",
        label: "Cost per Item",
        type: "number",
        placeholder: "12.50",
        hint: "For profit margin calculations (not shown to customers)",
      },
    ],
  },
  {
    title: "Inventory & SKU",
    desc: "Track stock levels",
    fields: [
      {
        id: "sku",
        label: "SKU",
        type: "text",
        placeholder: "WPE-001",
        required: true,
      },
      {
        id: "barcode",
        label: "Barcode (ISBN, UPC, GTIN)",
        type: "text",
        placeholder: "123456789012",
      },
      {
        id: "stock",
        label: "Stock Quantity",
        type: "number",
        placeholder: "100",
        required: true,
      },
      {
        id: "reorder",
        label: "Reorder Point",
        type: "number",
        placeholder: "20",
        hint: "Get alerts when stock drops below this number",
      },
    ],
  },
  {
    title: "Variants",
    desc: "Add options like size, color, or material",
    fields: [{ id: "variants", label: "Product Variants", type: "variants" }],
  },
  {
    title: "Shipping",
    desc: "Physical product shipping details",
    fields: [
      {
        id: "weight",
        label: "Weight (kg)",
        type: "number",
        placeholder: "0.25",
      },
      {
        id: "dimensions",
        label: "Dimensions (cm)",
        type: "text",
        placeholder: "L × W × H  e.g. 15 × 10 × 5",
      },
      {
        id: "shippingClass",
        label: "Shipping Class",
        type: "select",
        options: ["Standard", "Express", "Free Shipping", "Fragile"],
      },
    ],
  },
  {
    title: "SEO",
    desc: "Optimize for search engines",
    fields: [
      {
        id: "metaTitle",
        label: "Meta Title",
        type: "text",
        placeholder: "Wireless Pro Earbuds - Premium Bluetooth 5.3",
        hint: "60 characters recommended",
      },
      {
        id: "metaDescription",
        label: "Meta Description",
        type: "textarea",
        placeholder: "Experience crystal-clear audio…",
        hint: "160 characters recommended",
      },
      {
        id: "slug",
        label: "URL Slug",
        type: "text",
        placeholder: "wireless-pro-earbuds",
      },
    ],
  },
];

export const VARIANT_ROWS = [
  { option: "Black", price: "$29.99", stock: "120", sku: "WPE-001-BLK" },
  { option: "White", price: "$29.99", stock: "80", sku: "WPE-001-WHT" },
  { option: "Navy", price: "$34.99", stock: "42", sku: "WPE-001-NVY" },
];

export const ORDER_TABS = [
  { id: "all", label: "All", count: "243" },
  { id: "unfulfilled", label: "Unfulfilled", count: "18" },
  { id: "fulfilled", label: "Fulfilled", count: "42" },
  { id: "shipped", label: "Shipped", count: "89" },
  { id: "delivered", label: "Delivered", count: "94" },
];

export const ORDER_ROWS = [
  {
    id: "#1042",
    customer: "Sarah Chen",
    items: "Earbuds, Charger",
    total: "$234.50",
    status: "Unfulfilled",
    date: "Today",
    canFulfill: true,
  },
  {
    id: "#1041",
    customer: "Mike Johnson",
    items: "Laptop Stand",
    total: "$67.80",
    status: "Fulfilled",
    date: "Today",
    canShip: true,
  },
  {
    id: "#1040",
    customer: "Emma Davis",
    items: "Keyboard RGB",
    total: "$189.00",
    status: "Shipped",
    date: "Jul 8",
    canView: true,
  },
  {
    id: "#1039",
    customer: "Alex Kumar",
    items: "Desk Lamp, Hub",
    total: "$412.30",
    status: "Unfulfilled",
    date: "Jul 8",
    canFulfill: true,
  },
  {
    id: "#1038",
    customer: "Lisa Park",
    items: "Mouse Pad",
    total: "$52.99",
    status: "Delivered",
    date: "Jul 7",
    canView: true,
  },
  {
    id: "#1037",
    customer: "David Wilson",
    items: "Monitor Arm",
    total: "$899.00",
    status: "Shipped",
    date: "Jul 7",
    canView: true,
  },
  {
    id: "#1036",
    customer: "Rachel Kim",
    items: "USB-C Cable x3",
    total: "$34.50",
    status: "Delivered",
    date: "Jul 6",
    canView: true,
  },
  {
    id: "#1035",
    customer: "Tom Harris",
    items: "Webcam HD",
    total: "$129.00",
    status: "Unfulfilled",
    date: "Jul 6",
    canFulfill: true,
  },
];

export const INV_KPIS = [
  { label: "Total SKUs", value: "142", accent: "#10b981", vc: "#0f172a" },
  { label: "In Stock", value: "4,821", accent: "#10b981", vc: "#10b981" },
  { label: "Low Stock", value: "4", accent: "#f59e0b", vc: "#f59e0b" },
  { label: "Out of Stock", value: "3", accent: "#ef4444", vc: "#ef4444" },
];

export const INV_ROWS = [
  {
    name: "Wireless Pro Earbuds",
    sku: "WPE-001",
    onHand: "5",
    reserved: "2",
    avail: "3",
    stLabel: "Low Stock",
  },
  {
    name: "USB-C Fast Charger",
    sku: "UCF-023",
    onHand: "150",
    reserved: "8",
    avail: "142",
    stLabel: "In Stock",
  },
  {
    name: "Laptop Stand",
    sku: "LSA-007",
    onHand: "80",
    reserved: "4",
    avail: "76",
    stLabel: "In Stock",
  },
  {
    name: "Keyboard RGB",
    sku: "MKR-056",
    onHand: "58",
    reserved: "4",
    avail: "54",
    stLabel: "In Stock",
  },
  {
    name: "Desk Lamp",
    sku: "SLD-034",
    onHand: "48",
    reserved: "5",
    avail: "43",
    stLabel: "In Stock",
  },
  {
    name: "USB-C Hub",
    sku: "UCH-012",
    onHand: "10",
    reserved: "2",
    avail: "8",
    stLabel: "Low Stock",
  },
  {
    name: "Phone Stand",
    sku: "PSM-044",
    onHand: "7",
    reserved: "2",
    avail: "5",
    stLabel: "Low Stock",
  },
  {
    name: "Webcam HD",
    sku: "WHD-044",
    onHand: "35",
    reserved: "4",
    avail: "31",
    stLabel: "In Stock",
  },
].map((r) => {
  const a = parseInt(r.avail, 10);
  const availC = a <= 5 ? "#ef4444" : a <= 15 ? "#f59e0b" : "#10b981";
  return { ...r, availC };
});

export const GENERIC_PAGES = {
  customers: {
    title: "Customers",
    actions: [{ icon: "download", label: "Export", primary: false }],
    sections: [
      {
        title: "Customer Overview",
        icon: "group",
        iconC: "#10b981",
        items: [
          {
            icon: "group",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Total Customers",
            sub: "Unique buyers from your store",
            value: "3,482",
          },
          {
            icon: "person_add",
            bg: "rgba(59,130,246,0.1)",
            ic: "#3b82f6",
            title: "New This Month",
            sub: "First-time purchasers",
            value: "247",
          },
          {
            icon: "autorenew",
            bg: "rgba(99,102,241,0.1)",
            ic: "#6366f1",
            title: "Repeat Rate",
            sub: "Customers with 2+ orders",
            value: "34.2%",
          },
          {
            icon: "attach_money",
            bg: "rgba(245,158,11,0.1)",
            ic: "#f59e0b",
            title: "Avg. Order Value",
            sub: "Average across all orders",
            value: "$68.40",
          },
        ],
      },
    ],
  },
  analytics: {
    title: "Analytics",
    actions: [],
    sections: [
      {
        title: "Store Performance",
        icon: "monitoring",
        iconC: "#6366f1",
        items: [
          {
            icon: "trending_up",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Revenue Trend",
            sub: "Monthly revenue comparison",
            value: "$12.8K",
          },
          {
            icon: "shopping_cart",
            bg: "rgba(59,130,246,0.1)",
            ic: "#3b82f6",
            title: "Conversion Rate",
            sub: "Visitors → Purchases",
            value: "2.7%",
          },
          {
            icon: "visibility",
            bg: "rgba(99,102,241,0.1)",
            ic: "#6366f1",
            title: "Traffic",
            sub: "Unique visitors last 30 days",
            value: "12.4K",
          },
          {
            icon: "star",
            bg: "rgba(245,158,11,0.1)",
            ic: "#f59e0b",
            title: "Avg. Rating",
            sub: "Across all products",
            value: "4.7/5",
          },
        ],
      },
    ],
  },
  discounts: {
    title: "Discounts",
    actions: [{ icon: "add", label: "Create discount", primary: true }],
    sections: [
      {
        title: "Active Discounts",
        icon: "local_offer",
        iconC: "#10b981",
        items: [
          {
            icon: "percent",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "SUMMER20",
            sub: "20% off all products · Ends Jul 31",
            value: "342 uses",
          },
          {
            icon: "local_shipping",
            bg: "rgba(59,130,246,0.1)",
            ic: "#3b82f6",
            title: "FREESHIP",
            sub: "Free shipping over $50 · No expiry",
            value: "1,205 uses",
          },
          {
            icon: "loyalty",
            bg: "rgba(99,102,241,0.1)",
            ic: "#6366f1",
            title: "WELCOME10",
            sub: "10% off first order · New customers only",
            value: "89 uses",
          },
        ],
      },
    ],
  },
  marketing: {
    title: "Marketing",
    actions: [{ icon: "add", label: "New campaign", primary: true }],
    sections: [
      {
        title: "Campaigns",
        icon: "campaign",
        iconC: "#6366f1",
        action: "View all",
        items: [
          {
            icon: "email",
            bg: "rgba(59,130,246,0.1)",
            ic: "#3b82f6",
            title: "Summer Sale Newsletter",
            sub: "Sent Jul 1 · 68% open rate",
            value: "2,341 sent",
          },
          {
            icon: "ads_click",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Google Ads — Earbuds",
            sub: "Running · $12.40 CPA",
            value: "$450 spent",
          },
        ],
      },
    ],
  },
  staff: {
    title: "Staff",
    actions: [{ icon: "person_add", label: "Invite member", primary: true }],
    sections: [
      {
        title: "Team Members",
        icon: "group",
        iconC: "#6366f1",
        action: "Manage roles",
        items: [
          {
            icon: "admin_panel_settings",
            bg: "rgba(99,102,241,0.1)",
            ic: "#6366f1",
            title: "John Doe",
            sub: "Owner · Full access",
          },
          {
            icon: "badge",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Jane Smith",
            sub: "Manager · Orders, Products, Customers",
          },
          {
            icon: "badge",
            bg: "rgba(59,130,246,0.1)",
            ic: "#3b82f6",
            title: "Tom Lee",
            sub: "Staff · Orders, Products",
          },
          {
            icon: "badge",
            bg: "rgba(245,158,11,0.1)",
            ic: "#f59e0b",
            title: "Amy Kim",
            sub: "Staff · Orders, Returns",
          },
        ],
      },
    ],
  },
  shipping: {
    title: "Shipping",
    actions: [{ icon: "add", label: "Add rate", primary: false }],
    sections: [
      {
        title: "Shipping Zones",
        icon: "public",
        iconC: "#3b82f6",
        action: "Edit zones",
        items: [
          {
            icon: "location_on",
            bg: "rgba(59,130,246,0.1)",
            ic: "#3b82f6",
            title: "Domestic",
            sub: "Standard: $5.99 · Express: $12.99",
          },
          {
            icon: "flight",
            bg: "rgba(99,102,241,0.1)",
            ic: "#6366f1",
            title: "International",
            sub: "Standard: $14.99 · Express: $29.99",
          },
          {
            icon: "local_shipping",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Free Shipping",
            sub: "Orders over $75 · Domestic only",
          },
        ],
      },
    ],
  },
  payments: {
    title: "Payments",
    actions: [{ icon: "download", label: "Export", primary: false }],
    sections: [
      {
        title: "Payment Methods",
        icon: "credit_card",
        iconC: "#6366f1",
        action: "Settings",
        items: [
          {
            icon: "credit_card",
            bg: "rgba(99,102,241,0.1)",
            ic: "#6366f1",
            title: "Stripe",
            sub: "Connected · Visa, Mastercard, Amex",
          },
          {
            icon: "account_balance",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Bank Account",
            sub: "Chase ****4567 · Direct deposit",
          },
        ],
      },
      {
        title: "Recent Payouts",
        icon: "payments",
        iconC: "#10b981",
        action: "View all",
        items: [
          {
            icon: "check_circle",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Payout #482",
            sub: "Jul 8 · Bank transfer",
            value: "$2,340",
          },
          {
            icon: "check_circle",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Payout #481",
            sub: "Jul 1 · Bank transfer",
            value: "$3,120",
          },
        ],
      },
    ],
  },
  settings: {
    title: "Settings",
    actions: [],
    sections: [
      {
        title: "Store Settings",
        icon: "settings",
        iconC: "#64748b",
        items: [
          {
            icon: "storefront",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Store Details",
            sub: "Name, logo, contact information",
          },
          {
            icon: "palette",
            bg: "rgba(99,102,241,0.1)",
            ic: "#6366f1",
            title: "Theme",
            sub: "Colors, fonts, layout",
          },
          {
            icon: "language",
            bg: "rgba(59,130,246,0.1)",
            ic: "#3b82f6",
            title: "Domain",
            sub: "techgadgets.marketbase.com",
          },
          {
            icon: "notifications",
            bg: "rgba(245,158,11,0.1)",
            ic: "#f59e0b",
            title: "Notifications",
            sub: "Email and push preferences",
          },
          {
            icon: "security",
            bg: "rgba(239,68,68,0.1)",
            ic: "#ef4444",
            title: "Security",
            sub: "2FA, sessions, API keys",
          },
          {
            icon: "receipt_long",
            bg: "rgba(99,102,241,0.1)",
            ic: "#6366f1",
            title: "Tax Settings",
            sub: "Tax rates, exemptions",
          },
        ],
      },
    ],
  },
};

export const PAGE_TITLES = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  reports: "Reports",
  vendors: "Vendors",
  products: "Products",
  orders: "Orders",
  customers: "Customers",
  categories: "Categories",
  support: "Support",
  warehouse: "Warehouse",
  delivery: "Delivery",
  moderation: "Moderation",
  revenue: "Revenue",
  payouts: "Payouts",
  invoices: "Invoices",
  users: "Users & Roles",
  settings: "Settings",
  audit: "Audit Log",
  health: "System Health",
};

export const NAV_GROUPS = [
  {
    label: "OVERVIEW",
    items: [
      { id: "dashboard", icon: "space_dashboard", label: "Dashboard", path: "/superadmin" },
      { id: "analytics", icon: "monitoring", label: "Analytics", path: "/superadmin/analytics" },
      { id: "reports", icon: "summarize", label: "Reports", path: "/superadmin/reports" },
    ],
  },
  {
    label: "MARKETPLACE",
    items: [
      { id: "vendors", icon: "storefront", label: "Vendors", path: "/superadmin/vendors", badge: "12" },
      { id: "products", icon: "inventory_2", label: "Products", path: "/superadmin/products" },
      { id: "orders", icon: "shopping_bag", label: "Orders", path: "/superadmin/orders", badge: "24" },
      { id: "customers", icon: "group", label: "Customers", path: "/superadmin/customers" },
      { id: "categories", icon: "category", label: "Categories", path: "/superadmin/categories" },
    ],
  },
  {
    label: "OPERATIONS",
    items: [
      { id: "support", icon: "support_agent", label: "Support", path: "/superadmin/support", badge: "8" },
      { id: "warehouse", icon: "warehouse", label: "Warehouse", path: "/superadmin/warehouse" },
      { id: "delivery", icon: "local_shipping", label: "Delivery", path: "/superadmin/delivery" },
      { id: "moderation", icon: "shield", label: "Moderation", path: "/superadmin/moderation", badge: "5" },
    ],
  },
  {
    label: "FINANCE",
    items: [
      { id: "revenue", icon: "payments", label: "Revenue", path: "/superadmin/revenue" },
      { id: "payouts", icon: "account_balance", label: "Payouts", path: "/superadmin/payouts" },
      { id: "invoices", icon: "receipt_long", label: "Invoices", path: "/superadmin/invoices" },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { id: "users", icon: "manage_accounts", label: "Users & Roles", path: "/superadmin/users" },
      { id: "settings", icon: "settings", label: "Settings", path: "/superadmin/settings" },
      { id: "audit", icon: "policy", label: "Audit Log", path: "/superadmin/audit" },
      { id: "health", icon: "monitor_heart", label: "System Health", path: "/superadmin/health" },
    ],
  },
];

export const STATUS_STYLES = {
  Processing: { color: "#d97706", bg: "rgba(245,158,11,0.1)" },
  Shipped: { color: "#2563eb", bg: "rgba(59,130,246,0.1)" },
  Delivered: { color: "#059669", bg: "rgba(16,185,129,0.1)" },
  Cancelled: { color: "#dc2626", bg: "rgba(239,68,68,0.1)" },
  Pending: { color: "#6366f1", bg: "rgba(99,102,241,0.1)" },
  Active: { color: "#059669", bg: "rgba(16,185,129,0.1)" },
  Suspended: { color: "#dc2626", bg: "rgba(239,68,68,0.1)" },
  Draft: { color: "#64748b", bg: "#f1f5f9" },
  Flagged: { color: "#dc2626", bg: "rgba(239,68,68,0.1)" },
  Open: { color: "#d97706", bg: "rgba(245,158,11,0.1)" },
  "In Progress": { color: "#2563eb", bg: "rgba(59,130,246,0.1)" },
  Resolved: { color: "#059669", bg: "rgba(16,185,129,0.1)" },
};

export const DASH_KPIS = [
  { label: "Revenue", value: "$2.4M", change: "+12.5%", cc: "#10b981" },
  { label: "Orders", value: "8,432", change: "+8.2%", cc: "#10b981" },
  { label: "Vendors", value: "342", change: "+5.1%", cc: "#10b981" },
  { label: "Customers", value: "124.5K", change: "+15.3%", cc: "#10b981" },
  { label: "GMV", value: "$8.7M", change: "+18.2%", cc: "#10b981" },
  { label: "Platform Fee", value: "$412K", change: "-2.3%", cc: "#ef4444" },
];

export const REV_BARS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
  (l, i) => {
    const v = [65, 72, 68, 80, 75, 88, 92, 85, 95, 90, 98, 100][i];
    return { l, h: `${v}%`, bg: v >= 90 ? "#6366f1" : "#a5b4fc" };
  },
);

export const ORDER_STATUSES = [
  { label: "Delivered", value: "2,952", color: "#10b981" },
  { label: "Shipped", value: "1,687", color: "#3b82f6" },
  { label: "Processing", value: "1,690", color: "#f59e0b" },
  { label: "Pending", value: "1,264", color: "#6366f1" },
  { label: "Cancelled", value: "839", color: "#ef4444" },
];

export const DASH_ORDERS = [
  { id: "#7821", customer: "Sarah Chen", amount: "$234", status: "Processing" },
  { id: "#7820", customer: "Mike Johnson", amount: "$68", status: "Shipped" },
  { id: "#7819", customer: "Emma Davis", amount: "$189", status: "Delivered" },
  { id: "#7818", customer: "Alex Kumar", amount: "$412", status: "Processing" },
  { id: "#7817", customer: "Lisa Park", amount: "$53", status: "Cancelled" },
  { id: "#7816", customer: "David Wilson", amount: "$899", status: "Delivered" },
];

export const ACTIVITIES = [
  { icon: "person_add", text: 'New vendor "UrbanWear" applied', time: "3m ago", c: "#6366f1", bg: "rgba(99,102,241,0.1)" },
  { icon: "flag", text: "Product flagged for review", time: "15m ago", c: "#ef4444", bg: "rgba(239,68,68,0.08)" },
  { icon: "check_circle", text: 'Vendor "FreshMart" approved', time: "1h ago", c: "#10b981", bg: "rgba(16,185,129,0.1)" },
  { icon: "payments", text: "Payout batch #482 processed", time: "2h ago", c: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  { icon: "warning", text: "High refund rate alert", time: "3h ago", c: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
];

export const SYS_HEALTH = [
  { label: "API Response", value: "45ms", dot: "#10b981", vc: "#10b981" },
  { label: "Server Load", value: "34%", dot: "#10b981", vc: "#10b981" },
  { label: "Database", value: "99.9%", dot: "#10b981", vc: "#10b981" },
  { label: "Queue Depth", value: "127", dot: "#f59e0b", vc: "#d97706" },
];

export const VENDOR_KPIS = [
  { label: "Total Vendors", value: "342" },
  { label: "Active", value: "298" },
  { label: "Pending Approval", value: "12" },
  { label: "This Month GMV", value: "$1.2M" },
];

const VENDOR_COLORS = ["#6366f1", "#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6"];

export const VENDOR_ROWS = [
  { name: "TechGadgets Pro", domain: "techgadgets.com", owner: "John Doe", products: "142", revenue: "$45.2K", status: "Active" },
  { name: "FreshMart", domain: "freshmart.co", owner: "Jane Smith", products: "89", revenue: "$32.1K", status: "Active" },
  { name: "StyleHub", domain: "stylehub.io", owner: "Alice Wong", products: "234", revenue: "$67.8K", status: "Active" },
  { name: "HomeEssentials", domain: "homeess.com", owner: "Bob Lee", products: "56", revenue: "$12.4K", status: "Active" },
  { name: "BookWorld", domain: "bookworld.co", owner: "Chris Kim", products: "312", revenue: "$28.9K", status: "Active" },
  { name: "UrbanWear", domain: "urbanwear.co", owner: "Diana Cruz", products: "0", revenue: "$0", status: "Pending" },
  { name: "GadgetZone", domain: "gadgetzone.io", owner: "Eric Tan", products: "67", revenue: "$8.2K", status: "Suspended" },
  { name: "NaturalGoods", domain: "naturalgoods.co", owner: "Fiona Li", products: "45", revenue: "$5.6K", status: "Active" },
].map((v, i) => ({
  ...v,
  avatarBg: `${VENDOR_COLORS[i % 8]}1a`,
  avatarC: VENDOR_COLORS[i % 8],
}));

export const ORDER_ROWS = [
  { id: "#7821", customer: "Sarah Chen", vendor: "TechGadgets", items: "Earbuds, Charger", total: "$235", status: "Processing", date: "Today" },
  { id: "#7820", customer: "Mike Johnson", vendor: "FreshMart", items: "Organic Bundle", total: "$68", status: "Shipped", date: "Today" },
  { id: "#7819", customer: "Emma Davis", vendor: "StyleHub", items: "Summer Dress", total: "$189", status: "Delivered", date: "Jul 8" },
  { id: "#7818", customer: "Alex Kumar", vendor: "HomeEssentials", items: "Lamp, Rug", total: "$412", status: "Processing", date: "Jul 8" },
  { id: "#7817", customer: "Lisa Park", vendor: "BookWorld", items: "Novel Set x3", total: "$53", status: "Cancelled", date: "Jul 7" },
  { id: "#7816", customer: "David Wilson", vendor: "TechGadgets", items: 'Monitor 27"', total: "$899", status: "Delivered", date: "Jul 7" },
  { id: "#7815", customer: "Rachel Kim", vendor: "FreshMart", items: "Snack Box", total: "$35", status: "Shipped", date: "Jul 6" },
  { id: "#7814", customer: "Tom Harris", vendor: "StyleHub", items: "Jacket, Belt", total: "$275", status: "Shipped", date: "Jul 6" },
  { id: "#7813", customer: "Nina Patel", vendor: "NaturalGoods", items: "Serum Set", total: "$89", status: "Delivered", date: "Jul 5" },
  { id: "#7812", customer: "Chris Lee", vendor: "BookWorld", items: "Textbooks x4", total: "$168", status: "Processing", date: "Jul 5" },
];

export const PRODUCT_KPIS = [
  { label: "Total Products", value: "4,821" },
  { label: "Active", value: "4,102" },
  { label: "Draft", value: "312" },
  { label: "Flagged", value: "18" },
];

export const PRODUCT_ROWS = [
  { name: "Wireless Pro Earbuds", sku: "WPE-001", vendor: "TechGadgets", price: "$29.99", stock: "342", sales: "1,204", status: "Active", imgIcon: "headphones", imgBg: "#f0f0ff", imgC: "#6366f1" },
  { name: "Organic Avocado Oil", sku: "OAO-012", vendor: "FreshMart", price: "$14.99", stock: "1,240", sales: "892", status: "Active", imgIcon: "eco", imgBg: "#ecfdf5", imgC: "#10b981" },
  { name: "Summer Floral Dress", sku: "SFD-089", vendor: "StyleHub", price: "$59.99", stock: "87", sales: "456", status: "Active", imgIcon: "checkroom", imgBg: "#fdf2f8", imgC: "#ec4899" },
  { name: "LED Desk Lamp Pro", sku: "LDL-034", vendor: "HomeEssentials", price: "$39.99", stock: "5", sales: "234", status: "Active", imgIcon: "light", imgBg: "#fffbeb", imgC: "#f59e0b" },
  { name: "Mystery Novel Collection", sku: "MNC-067", vendor: "BookWorld", price: "$24.99", stock: "567", sales: "1,892", status: "Active", imgIcon: "menu_book", imgBg: "#eff6ff", imgC: "#3b82f6" },
  { name: "Fake Designer Bag", sku: "FDB-999", vendor: "GadgetZone", price: "$199", stock: "0", sales: "0", status: "Flagged", imgIcon: "report", imgBg: "#fef2f2", imgC: "#ef4444" },
  { name: "Natural Face Serum", sku: "NFS-023", vendor: "NaturalGoods", price: "$34.99", stock: "189", sales: "567", status: "Active", imgIcon: "spa", imgBg: "#f0fdf4", imgC: "#22c55e" },
  { name: "Smart Watch Band", sku: "SWB-045", vendor: "TechGadgets", price: "$19.99", stock: "0", sales: "23", status: "Draft", imgIcon: "watch", imgBg: "#f8fafc", imgC: "#64748b" },
].map((p) => {
  const stockNum = Number.parseInt(p.stock, 10);
  const stockC = stockNum <= 5 ? "#ef4444" : stockNum <= 50 ? "#f59e0b" : "#374151";
  return { ...p, stockC };
});

export const CUSTOMER_KPIS = [
  { label: "Total", value: "124.5K" },
  { label: "New This Month", value: "3,421" },
  { label: "Returning", value: "34.2%" },
  { label: "Avg. LTV", value: "$142" },
];

const CUSTOMER_COLORS = ["#6366f1", "#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6"];

export const CUSTOMER_ROWS = [
  { name: "Sarah Chen", email: "sarah@email.com", orders: "23", spent: "$3,421", joined: "Jan 2024" },
  { name: "Mike Johnson", email: "mike@email.com", orders: "15", spent: "$1,892", joined: "Mar 2024" },
  { name: "Emma Davis", email: "emma@email.com", orders: "42", spent: "$5,670", joined: "Nov 2023" },
  { name: "Alex Kumar", email: "alex@email.com", orders: "8", spent: "$678", joined: "May 2024" },
  { name: "Lisa Park", email: "lisa@email.com", orders: "31", spent: "$2,890", joined: "Feb 2024" },
  { name: "David Wilson", email: "david@email.com", orders: "12", spent: "$1,456", joined: "Apr 2024" },
  { name: "Rachel Kim", email: "rachel@email.com", orders: "19", spent: "$2,345", joined: "Dec 2023" },
  { name: "Tom Harris", email: "tom@email.com", orders: "6", spent: "$432", joined: "Jun 2024" },
].map((c, i) => ({
  ...c,
  init: c.name
    .split(" ")
    .map((n) => n[0])
    .join(""),
  bg: CUSTOMER_COLORS[i % 8],
}));

export const ANALYTICS_KPIS = [
  { label: "Total Revenue", value: "$2.4M", change: "+12.5%", cc: "#10b981" },
  { label: "Total Orders", value: "8,432", change: "+8.2%", cc: "#10b981" },
  { label: "Avg. Order Value", value: "$68.40", change: "+4.2%", cc: "#10b981" },
  { label: "Conversion Rate", value: "3.2%", change: "-0.3%", cc: "#ef4444" },
];

export const REV_TREND = [
  42, 55, 48, 68, 52, 72, 45, 78, 58, 65, 50, 70, 62, 75,
].map((v) => ({ h: `${v}%`, color: v > 60 ? "#6366f1" : "#c7d2fe" }));

export const TOP_CATS = [
  { name: "Electronics", pct: "32%", w: "32%", color: "#6366f1" },
  { name: "Fashion", pct: "24%", w: "24%", color: "#ec4899" },
  { name: "Home & Living", pct: "18%", w: "18%", color: "#10b981" },
  { name: "Books", pct: "14%", w: "14%", color: "#3b82f6" },
  { name: "Food & Grocery", pct: "12%", w: "12%", color: "#f59e0b" },
];

export const FUNNEL = [
  { label: "Visitors", value: "342K", barW: "100%", barC: "#6366f1", barBg: "#e0e7ff" },
  { label: "Add to Cart", value: "48K", barW: "40%", barC: "#3b82f6", barBg: "#dbeafe" },
  { label: "Checkout", value: "18K", barW: "20%", barC: "#10b981", barBg: "#d1fae5" },
  { label: "Purchase", value: "8.4K", barW: "10%", barC: "#f59e0b", barBg: "#fef3c7" },
];

export const SUPPORT_KPIS = [
  { label: "Open Tickets", value: "47", vc: "#f59e0b" },
  { label: "Avg. Response", value: "2.4h", vc: "#0f172a" },
  { label: "Resolution Rate", value: "94%", vc: "#10b981" },
  { label: "CSAT Score", value: "4.6/5", vc: "#6366f1" },
];

const PRI_MAP = {
  High: { priIcon: "priority_high", priBg: "rgba(239,68,68,0.1)", priC: "#ef4444" },
  Medium: { priIcon: "remove", priBg: "rgba(245,158,11,0.1)", priC: "#f59e0b" },
  Low: { priIcon: "arrow_downward", priBg: "rgba(59,130,246,0.1)", priC: "#3b82f6" },
};

export const SUPPORT_ROWS = [
  { subject: "Order not received after 7 days", customer: "Sarah Chen", time: "2h ago", priority: "High", status: "Open", agent: "Agent A" },
  { subject: "Wrong item delivered", customer: "Mike Johnson", time: "4h ago", priority: "High", status: "In Progress", agent: "Agent B" },
  { subject: "Refund not processed", customer: "Emma Davis", time: "6h ago", priority: "Medium", status: "Open", agent: "Unassigned" },
  { subject: "Cannot apply coupon code", customer: "Alex Kumar", time: "8h ago", priority: "Low", status: "In Progress", agent: "Agent A" },
  { subject: "Product quality complaint", customer: "Lisa Park", time: "1d ago", priority: "Medium", status: "Open", agent: "Agent C" },
  { subject: "Account login issue", customer: "David Wilson", time: "1d ago", priority: "Low", status: "Resolved", agent: "Agent B" },
  { subject: "Delivery address change", customer: "Rachel Kim", time: "2d ago", priority: "Low", status: "Resolved", agent: "Agent A" },
  { subject: "Vendor dispute - damaged goods", customer: "Tom Harris", time: "2d ago", priority: "High", status: "In Progress", agent: "Agent C" },
].map((s) => ({ ...s, ...(PRI_MAP[s.priority] || PRI_MAP.Low) }));

export const MODERATION_ROWS = [
  { title: "Fake Designer Bag", vendor: "GadgetZone", type: "Product", reason: "Counterfeit", imgIcon: "report", imgBg: "rgba(239,68,68,0.1)", imgC: "#ef4444", sc: "#dc2626", sb: "rgba(239,68,68,0.1)" },
  { title: "Weight Loss Miracle Pill", vendor: "HealthPlus", type: "Product", reason: "Misleading", imgIcon: "warning", imgBg: "rgba(245,158,11,0.1)", imgC: "#f59e0b", sc: "#d97706", sb: "rgba(245,158,11,0.1)" },
  { title: "Organic Supplement", vendor: "NaturalGoods", type: "Product", reason: "New listing", imgIcon: "new_releases", imgBg: "rgba(59,130,246,0.1)", imgC: "#3b82f6", sc: "#2563eb", sb: "rgba(59,130,246,0.1)" },
  { title: "Premium Headphones", vendor: "TechGadgets", type: "Product", reason: "New listing", imgIcon: "headphones", imgBg: "rgba(99,102,241,0.1)", imgC: "#6366f1", sc: "#6366f1", sb: "rgba(99,102,241,0.1)" },
  { title: "Handmade Candle Set", vendor: "HomeEssentials", type: "Product", reason: "Image review", imgIcon: "image", imgBg: "rgba(236,72,153,0.1)", imgC: "#ec4899", sc: "#be185d", sb: "rgba(236,72,153,0.1)" },
  { title: "UrbanWear", vendor: "New Vendor", type: "Vendor App", reason: "Pending", imgIcon: "storefront", imgBg: "rgba(16,185,129,0.1)", imgC: "#10b981", sc: "#059669", sb: "rgba(16,185,129,0.1)" },
];

export const FINANCE_KPIS = [
  { label: "Total Revenue", value: "$2.4M", vc: "#0f172a" },
  { label: "Platform Fee", value: "$412K", vc: "#6366f1" },
  { label: "Vendor Payouts", value: "$1.98M", vc: "#10b981" },
  { label: "Pending Settlements", value: "$89K", vc: "#f59e0b" },
  { label: "Refunds", value: "$34K", vc: "#ef4444" },
];

export const FIN_BARS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
  (l, i) => {
    const v = [55, 62, 58, 70, 65, 78, 82, 75, 85, 80, 88, 92][i];
    return { l: l.slice(0, 1), h: `${v}%`, c: v >= 80 ? "#6366f1" : "#a5b4fc" };
  },
);

export const FIN_TXNS = [
  { icon: "arrow_upward", desc: "Payout to TechGadgets Pro", time: "2h ago", amount: "-$4,230", amtC: "#ef4444", bg: "rgba(239,68,68,0.1)", ic: "#ef4444" },
  { icon: "arrow_downward", desc: "Order #7821 payment received", time: "2h ago", amount: "+$234", amtC: "#10b981", bg: "rgba(16,185,129,0.1)", ic: "#10b981" },
  { icon: "arrow_downward", desc: "Order #7820 payment received", time: "5h ago", amount: "+$68", amtC: "#10b981", bg: "rgba(16,185,129,0.1)", ic: "#10b981" },
  { icon: "replay", desc: "Refund to Lisa Park", time: "1d ago", amount: "-$53", amtC: "#ef4444", bg: "rgba(245,158,11,0.1)", ic: "#f59e0b" },
  { icon: "arrow_upward", desc: "Payout to FreshMart", time: "1d ago", amount: "-$2,890", amtC: "#ef4444", bg: "rgba(239,68,68,0.1)", ic: "#ef4444" },
  { icon: "arrow_downward", desc: "Subscription fee - StyleHub", time: "2d ago", amount: "+$99", amtC: "#10b981", bg: "rgba(59,130,246,0.1)", ic: "#3b82f6" },
];

export const USER_ROWS = [
  { name: "Admin User", email: "admin@marketbase.com", role: "Super Admin", init: "AU", bg: "#6366f1", roleC: "#6366f1", roleBg: "rgba(99,102,241,0.1)", statusDot: "#10b981", statusLabel: "Online" },
  { name: "Jane Smith", email: "jane@marketbase.com", role: "Platform Admin", init: "JS", bg: "#10b981", roleC: "#10b981", roleBg: "rgba(16,185,129,0.1)", statusDot: "#10b981", statusLabel: "Online" },
  { name: "Mike Ops", email: "mike@marketbase.com", role: "Platform Admin", init: "MO", bg: "#3b82f6", roleC: "#10b981", roleBg: "rgba(16,185,129,0.1)", statusDot: "#94a3b8", statusLabel: "Offline" },
  { name: "Support Lead", email: "support@marketbase.com", role: "Support Agent", init: "SL", bg: "#f59e0b", roleC: "#f59e0b", roleBg: "rgba(245,158,11,0.1)", statusDot: "#10b981", statusLabel: "Online" },
  { name: "Finance User", email: "fin@marketbase.com", role: "Finance", init: "FU", bg: "#8b5cf6", roleC: "#8b5cf6", roleBg: "rgba(139,92,246,0.1)", statusDot: "#94a3b8", statusLabel: "Offline" },
  { name: "Content Mod", email: "mod@marketbase.com", role: "Moderator", init: "CM", bg: "#ec4899", roleC: "#ec4899", roleBg: "rgba(236,72,153,0.1)", statusDot: "#10b981", statusLabel: "Online" },
  { name: "Warehouse Mgr", email: "wh@marketbase.com", role: "Warehouse", init: "WM", bg: "#14b8a6", roleC: "#14b8a6", roleBg: "rgba(20,184,166,0.1)", statusDot: "#94a3b8", statusLabel: "Offline" },
  { name: "Marketing Lead", email: "mktg@marketbase.com", role: "Marketing", init: "ML", bg: "#ef4444", roleC: "#ef4444", roleBg: "rgba(239,68,68,0.1)", statusDot: "#10b981", statusLabel: "Online" },
];

export const GENERIC_PAGES = {
  reports: {
    title: "Reports",
    sections: [
      {
        title: "Generated Reports",
        icon: "description",
        iconC: "#6366f1",
        action: "Create report",
        items: [
          { icon: "bar_chart", bg: "rgba(99,102,241,0.1)", ic: "#6366f1", title: "Monthly Revenue Report", sub: "Generated Jul 1 · PDF", value: "" },
          { icon: "pie_chart", bg: "rgba(16,185,129,0.1)", ic: "#10b981", title: "Vendor Performance Q2", sub: "Generated Jun 30 · PDF", value: "" },
          { icon: "table_chart", bg: "rgba(59,130,246,0.1)", ic: "#3b82f6", title: "Customer Acquisition", sub: "Generated Jun 28 · CSV", value: "" },
        ],
      },
      {
        title: "Scheduled Reports",
        icon: "schedule",
        iconC: "#f59e0b",
        action: "Schedule new",
        items: [
          { icon: "event_repeat", bg: "rgba(245,158,11,0.1)", ic: "#f59e0b", title: "Weekly Sales Summary", sub: "Every Monday 9 AM", value: "Active" },
          { icon: "event_repeat", bg: "rgba(99,102,241,0.1)", ic: "#6366f1", title: "Monthly Platform Health", sub: "1st of each month", value: "Active" },
        ],
      },
    ],
  },
  categories: {
    title: "Categories",
    sections: [
      {
        title: "Product Categories",
        icon: "category",
        iconC: "#6366f1",
        action: "Add category",
        items: [
          { icon: "devices", bg: "rgba(99,102,241,0.1)", ic: "#6366f1", title: "Electronics", sub: "1,234 products · 8 subcategories", value: "$1.2M" },
          { icon: "checkroom", bg: "rgba(236,72,153,0.1)", ic: "#ec4899", title: "Fashion", sub: "892 products · 12 subcategories", value: "$890K" },
          { icon: "home", bg: "rgba(16,185,129,0.1)", ic: "#10b981", title: "Home & Living", sub: "567 products · 6 subcategories", value: "$456K" },
          { icon: "menu_book", bg: "rgba(59,130,246,0.1)", ic: "#3b82f6", title: "Books", sub: "1,892 products · 15 subcategories", value: "$234K" },
          { icon: "restaurant", bg: "rgba(245,158,11,0.1)", ic: "#f59e0b", title: "Food & Grocery", sub: "345 products · 4 subcategories", value: "$178K" },
        ],
      },
    ],
  },
  warehouse: {
    title: "Warehouse",
    sections: [
      {
        title: "Warehouse Overview",
        icon: "warehouse",
        iconC: "#14b8a6",
        action: "Manage",
        items: [
          { icon: "inventory_2", bg: "rgba(20,184,166,0.1)", ic: "#14b8a6", title: "Warehouse A — Primary", sub: "New York · 4,821 SKUs · 89% capacity", value: "" },
          { icon: "inventory_2", bg: "rgba(59,130,246,0.1)", ic: "#3b82f6", title: "Warehouse B — Secondary", sub: "Los Angeles · 2,340 SKUs · 62% capacity", value: "" },
        ],
      },
      {
        title: "Recent Activity",
        icon: "history",
        iconC: "#6366f1",
        action: "View all",
        items: [
          { icon: "input", bg: "rgba(16,185,129,0.1)", ic: "#10b981", title: "Inbound: 500 units received", sub: "TechGadgets shipment · Today", value: "" },
          { icon: "output", bg: "rgba(59,130,246,0.1)", ic: "#3b82f6", title: "Outbound: 142 orders shipped", sub: "Today · Warehouse A", value: "" },
          { icon: "swap_horiz", bg: "rgba(99,102,241,0.1)", ic: "#6366f1", title: "Transfer: 200 units A→B", sub: "Yesterday", value: "" },
        ],
      },
    ],
  },
  delivery: {
    title: "Delivery",
    sections: [
      {
        title: "Delivery Partners",
        icon: "local_shipping",
        iconC: "#3b82f6",
        action: "Add partner",
        items: [
          { icon: "delivery_dining", bg: "rgba(59,130,246,0.1)", ic: "#3b82f6", title: "FastShip Express", sub: "342 active drivers · 98.2% on-time", value: "$12.4K/mo" },
          { icon: "delivery_dining", bg: "rgba(16,185,129,0.1)", ic: "#10b981", title: "QuickDeliver", sub: "189 active drivers · 96.7% on-time", value: "$8.9K/mo" },
          { icon: "delivery_dining", bg: "rgba(245,158,11,0.1)", ic: "#f59e0b", title: "CityRush", sub: "78 active drivers · 94.1% on-time", value: "$3.2K/mo" },
        ],
      },
      {
        title: "Today's Metrics",
        icon: "monitoring",
        iconC: "#10b981",
        action: "Full report",
        items: [
          { icon: "pending", bg: "rgba(245,158,11,0.1)", ic: "#f59e0b", title: "Pending Pickup", sub: "Awaiting driver assignment", value: "34" },
          { icon: "local_shipping", bg: "rgba(59,130,246,0.1)", ic: "#3b82f6", title: "In Transit", sub: "Currently being delivered", value: "187" },
          { icon: "check_circle", bg: "rgba(16,185,129,0.1)", ic: "#10b981", title: "Delivered Today", sub: "Successfully completed", value: "423" },
        ],
      },
    ],
  },
  payouts: {
    title: "Payouts",
    sections: [
      {
        title: "Upcoming Payouts",
        icon: "schedule_send",
        iconC: "#6366f1",
        action: "Process all",
        items: [
          { icon: "storefront", bg: "rgba(99,102,241,0.1)", ic: "#6366f1", title: "TechGadgets Pro", sub: "Next payout Jul 15", value: "$4,230" },
          { icon: "storefront", bg: "rgba(16,185,129,0.1)", ic: "#10b981", title: "FreshMart", sub: "Next payout Jul 15", value: "$2,890" },
          { icon: "storefront", bg: "rgba(236,72,153,0.1)", ic: "#ec4899", title: "StyleHub", sub: "Next payout Jul 15", value: "$5,670" },
        ],
      },
      {
        title: "Recent Payouts",
        icon: "history",
        iconC: "#10b981",
        action: "View all",
        items: [
          { icon: "check_circle", bg: "rgba(16,185,129,0.1)", ic: "#10b981", title: "Batch #482 — 24 vendors", sub: "Jul 8 · Bank transfer", value: "$89,420" },
          { icon: "check_circle", bg: "rgba(16,185,129,0.1)", ic: "#10b981", title: "Batch #481 — 22 vendors", sub: "Jul 1 · Bank transfer", value: "$76,230" },
        ],
      },
    ],
  },
  invoices: {
    title: "Invoices",
    sections: [
      {
        title: "Recent Invoices",
        icon: "receipt_long",
        iconC: "#6366f1",
        action: "Create invoice",
        items: [
          { icon: "receipt", bg: "rgba(16,185,129,0.1)", ic: "#10b981", title: "INV-2024-0712 · TechGadgets", sub: "Jul 8 · Paid", value: "$2,340" },
          { icon: "receipt", bg: "rgba(16,185,129,0.1)", ic: "#10b981", title: "INV-2024-0711 · FreshMart", sub: "Jul 8 · Paid", value: "$1,890" },
          { icon: "receipt", bg: "rgba(245,158,11,0.1)", ic: "#f59e0b", title: "INV-2024-0710 · StyleHub", sub: "Jul 7 · Pending", value: "$3,450" },
          { icon: "receipt", bg: "rgba(239,68,68,0.1)", ic: "#ef4444", title: "INV-2024-0709 · HomeEssentials", sub: "Jul 5 · Overdue", value: "$678" },
        ],
      },
    ],
  },
  settings: {
    title: "Settings",
    sections: [
      {
        title: "Platform",
        icon: "tune",
        iconC: "#64748b",
        action: "",
        items: [
          { icon: "language", bg: "rgba(59,130,246,0.1)", ic: "#3b82f6", title: "General", sub: "Platform name, URL, timezone", value: "" },
          { icon: "palette", bg: "rgba(99,102,241,0.1)", ic: "#6366f1", title: "Appearance", sub: "Logo, favicon, theme colors", value: "" },
          { icon: "mail", bg: "rgba(16,185,129,0.1)", ic: "#10b981", title: "Email & Notifications", sub: "SMTP, templates, triggers", value: "" },
          { icon: "payments", bg: "rgba(245,158,11,0.1)", ic: "#f59e0b", title: "Payment Gateways", sub: "Stripe, PayPal, bank transfers", value: "" },
          { icon: "security", bg: "rgba(239,68,68,0.1)", ic: "#ef4444", title: "Security", sub: "2FA, rate limits, API keys", value: "" },
          { icon: "integration_instructions", bg: "rgba(139,92,246,0.1)", ic: "#8b5cf6", title: "Integrations", sub: "Webhooks, third-party services", value: "" },
        ],
      },
    ],
  },
  audit: {
    title: "Audit Log",
    sections: [
      {
        title: "Recent Events",
        icon: "policy",
        iconC: "#6366f1",
        action: "Export",
        items: [
          { icon: "login", bg: "rgba(16,185,129,0.1)", ic: "#10b981", title: "Admin login", sub: "admin@marketbase.com · 2m ago · IP 192.168.1.1", value: "" },
          { icon: "edit", bg: "rgba(59,130,246,0.1)", ic: "#3b82f6", title: "Vendor status changed", sub: "GadgetZone suspended · by Admin · 1h ago", value: "" },
          { icon: "delete", bg: "rgba(239,68,68,0.1)", ic: "#ef4444", title: "Product removed", sub: "Fake Designer Bag · by Moderator · 2h ago", value: "" },
          { icon: "payments", bg: "rgba(99,102,241,0.1)", ic: "#6366f1", title: "Payout processed", sub: "Batch #482 · by Finance · 3h ago", value: "$89,420" },
          { icon: "person_add", bg: "rgba(245,158,11,0.1)", ic: "#f59e0b", title: "New user invited", sub: "marketing@marketbase.com · by Admin · 5h ago", value: "" },
        ],
      },
    ],
  },
  health: {
    title: "System Health",
    sections: [
      {
        title: "Services",
        icon: "monitor_heart",
        iconC: "#10b981",
        action: "Run diagnostics",
        items: [
          { icon: "dns", bg: "rgba(16,185,129,0.1)", ic: "#10b981", title: "API Server", sub: "Response time: 45ms · Uptime: 99.99%", value: "Healthy" },
          { icon: "storage", bg: "rgba(16,185,129,0.1)", ic: "#10b981", title: "Database", sub: "PostgreSQL · 34% load · 2.1TB used", value: "Healthy" },
          { icon: "cloud", bg: "rgba(16,185,129,0.1)", ic: "#10b981", title: "CDN", sub: "CloudFront · 99.9% hit rate", value: "Healthy" },
          { icon: "email", bg: "rgba(16,185,129,0.1)", ic: "#10b981", title: "Email Service", sub: "SendGrid · 98.7% delivery rate", value: "Healthy" },
          { icon: "queue", bg: "rgba(245,158,11,0.1)", ic: "#f59e0b", title: "Job Queue", sub: "Redis · 127 pending · avg 1.2s", value: "Warning" },
        ],
      },
      {
        title: "Infrastructure",
        icon: "developer_board",
        iconC: "#3b82f6",
        action: "",
        items: [
          { icon: "memory", bg: "rgba(59,130,246,0.1)", ic: "#3b82f6", title: "CPU Usage", sub: "4 cores · avg 34%", value: "34%" },
          { icon: "sd_storage", bg: "rgba(99,102,241,0.1)", ic: "#6366f1", title: "Memory", sub: "16 GB total · 8.2 GB used", value: "51%" },
          { icon: "hard_drive", bg: "rgba(245,158,11,0.1)", ic: "#f59e0b", title: "Disk", sub: "500 GB total · 312 GB used", value: "62%" },
        ],
      },
    ],
  },
};

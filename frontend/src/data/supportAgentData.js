export const PAGE_TITLES = {
  dashboard: "Dashboard",
  tickets: "Tickets",
  chat: "Live Chat",
  customers: "Customers",
  orders: "Order Lookup",
  kb: "Knowledge Base",
  macros: "Macros",
  escalations: "Escalations",
  reports: "Reports",
  settings: "Settings",
};

export const NAV_GROUPS = [
  {
    label: "WORKSPACE",
    items: [
      {
        id: "dashboard",
        icon: "space_dashboard",
        label: "Dashboard",
        path: "/support",
      },
      {
        id: "tickets",
        icon: "confirmation_number",
        label: "Tickets",
        path: "/support/tickets",
        badge: "47",
      },
      {
        id: "chat",
        icon: "chat",
        label: "Live Chat",
        path: "/support/chat",
        badge: "3",
      },
    ],
  },
  {
    label: "TOOLS",
    items: [
      {
        id: "customers",
        icon: "person_search",
        label: "Customers",
        path: "/support/customers",
      },
      {
        id: "orders",
        icon: "shopping_bag",
        label: "Order Lookup",
        path: "/support/orders",
      },
      {
        id: "kb",
        icon: "menu_book",
        label: "Knowledge Base",
        path: "/support/kb",
      },
      {
        id: "macros",
        icon: "bolt",
        label: "Macros",
        path: "/support/macros",
      },
    ],
  },
  {
    label: "MANAGE",
    items: [
      {
        id: "escalations",
        icon: "trending_up",
        label: "Escalations",
        path: "/support/escalations",
        badge: "2",
      },
      {
        id: "reports",
        icon: "bar_chart",
        label: "Reports",
        path: "/support/reports",
      },
      {
        id: "settings",
        icon: "settings",
        label: "Settings",
        path: "/support/settings",
      },
    ],
  },
];

export const AGENT_PROFILE = {
  name: "Agent Miller",
  initials: "AM",
  status: "Online · 12 assigned",
};

export const HOME_KPIS = [
  { label: "My Open", value: "12", icon: "inbox", ic: "#0ea5e9", vc: "#0ea5e9" },
  {
    label: "Unassigned",
    value: "8",
    icon: "person_off",
    ic: "#f59e0b",
    vc: "#f59e0b",
  },
  {
    label: "Avg. Response",
    value: "2.4h",
    icon: "schedule",
    ic: "#6366f1",
    vc: "#0f172a",
  },
  {
    label: "Resolved Today",
    value: "18",
    icon: "check_circle",
    ic: "#10b981",
    vc: "#10b981",
  },
  { label: "CSAT", value: "4.6", icon: "star", ic: "#f59e0b", vc: "#0f172a" },
];

export const MY_TICKETS = [
  {
    subject: "Order not received after 7 days",
    customer: "Sarah Chen",
    time: "2h",
    priDot: "#ef4444",
    sla: "SLA 1h",
    slaC: "#dc2626",
    slaBg: "rgba(239,68,68,0.1)",
  },
  {
    subject: "Wrong item delivered - need replacement",
    customer: "Mike Johnson",
    time: "4h",
    priDot: "#ef4444",
    sla: "SLA 3h",
    slaC: "#f59e0b",
    slaBg: "rgba(245,158,11,0.1)",
  },
  {
    subject: "Refund not processed yet",
    customer: "Emma Davis",
    time: "6h",
    priDot: "#f59e0b",
  },
  {
    subject: "Cannot apply coupon SUMMER20",
    customer: "Alex Kumar",
    time: "8h",
    priDot: "#3b82f6",
  },
  {
    subject: "Product quality complaint",
    customer: "Lisa Park",
    time: "1d",
    priDot: "#f59e0b",
  },
];

export const SLA_METRICS = [
  {
    label: "First Response < 1h",
    value: "92%",
    vc: "#10b981",
    barC: "#10b981",
    barW: "92%",
  },
  {
    label: "Resolution < 24h",
    value: "78%",
    vc: "#f59e0b",
    barC: "#f59e0b",
    barW: "78%",
  },
  {
    label: "Customer Satisfaction",
    value: "94%",
    vc: "#10b981",
    barC: "#0ea5e9",
    barW: "94%",
  },
];

export const QUICK_ACTIONS = [
  {
    icon: "confirmation_number",
    label: "New Ticket",
    ic: "#0ea5e9",
    path: "/support/tickets",
  },
  { icon: "chat", label: "Live Chat", ic: "#10b981", path: "/support/chat" },
  {
    icon: "person_search",
    label: "Find Customer",
    ic: "#6366f1",
    path: "/support/customers",
  },
  {
    icon: "menu_book",
    label: "Knowledge Base",
    ic: "#f59e0b",
    path: "/support/kb",
  },
];

export const RECENT_ACTIVITY = [
  {
    icon: "check_circle",
    text: "Resolved ticket #1042 — Sarah Chen",
    time: "15m ago",
    bg: "rgba(16,185,129,0.1)",
    ic: "#10b981",
  },
  {
    icon: "reply",
    text: "Replied to Mike Johnson on ticket #1041",
    time: "30m ago",
    bg: "rgba(14,165,233,0.1)",
    ic: "#0ea5e9",
  },
  {
    icon: "priority_high",
    text: "Escalated ticket #1038 to supervisor",
    time: "1h ago",
    bg: "rgba(239,68,68,0.1)",
    ic: "#ef4444",
  },
  {
    icon: "note_add",
    text: "Added internal note on ticket #1039",
    time: "2h ago",
    bg: "rgba(99,102,241,0.1)",
    ic: "#6366f1",
  },
  {
    icon: "person_add",
    text: "New ticket assigned: Lisa Park",
    time: "3h ago",
    bg: "rgba(245,158,11,0.1)",
    ic: "#f59e0b",
  },
];

export const TICKET_TABS = [
  { id: "all", label: "All", count: "47" },
  { id: "open", label: "Open", count: "18" },
  { id: "pending", label: "Pending", count: "12" },
  { id: "resolved", label: "Resolved", count: "9" },
  { id: "closed", label: "Closed", count: "8" },
];

const PRIORITY_COLORS = {
  Urgent: "#ef4444",
  High: "#f59e0b",
  Medium: "#3b82f6",
  Low: "#94a3b8",
};

const STATUS_MAP = {
  Open: { sc: "#d97706", sb: "rgba(245,158,11,0.1)" },
  "In Progress": { sc: "#2563eb", sb: "rgba(59,130,246,0.1)" },
  Pending: { sc: "#6366f1", sb: "rgba(99,102,241,0.1)" },
  Resolved: { sc: "#059669", sb: "rgba(16,185,129,0.1)" },
};

const AGENT_COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#6366f1", "#ef4444"];

const RAW_TICKETS = [
  {
    id: "#1042",
    subject: "Order not received after 7 days",
    customer: "Sarah Chen",
    category: "Shipping",
    time: "2h ago",
    priority: "Urgent",
    status: "Open",
    agent: "AM",
    sla: "SLA 1h",
    slaC: "#dc2626",
    slaBg: "rgba(239,68,68,0.1)",
    tab: "open",
  },
  {
    id: "#1041",
    subject: "Wrong item delivered",
    customer: "Mike Johnson",
    category: "Orders",
    time: "4h ago",
    priority: "Urgent",
    status: "In Progress",
    agent: "AM",
    sla: "SLA 3h",
    slaC: "#f59e0b",
    slaBg: "rgba(245,158,11,0.1)",
    tab: "open",
  },
  {
    id: "#1040",
    subject: "Refund not processed",
    customer: "Emma Davis",
    category: "Payments",
    time: "6h ago",
    priority: "High",
    status: "Open",
    agent: "BK",
    tab: "open",
  },
  {
    id: "#1039",
    subject: "Cannot apply coupon code",
    customer: "Alex Kumar",
    category: "Promotions",
    time: "8h ago",
    priority: "Medium",
    status: "In Progress",
    agent: "AM",
    tab: "open",
  },
  {
    id: "#1038",
    subject: "Product quality complaint",
    customer: "Lisa Park",
    category: "Products",
    time: "1d ago",
    priority: "High",
    status: "Pending",
    agent: "CL",
    tab: "pending",
  },
  {
    id: "#1037",
    subject: "Account login issue",
    customer: "David Wilson",
    category: "Account",
    time: "1d ago",
    priority: "Low",
    status: "Resolved",
    agent: "BK",
    tab: "resolved",
  },
  {
    id: "#1036",
    subject: "Delivery address change request",
    customer: "Rachel Kim",
    category: "Shipping",
    time: "2d ago",
    priority: "Low",
    status: "Resolved",
    agent: "AM",
    tab: "resolved",
  },
  {
    id: "#1035",
    subject: "Vendor dispute - damaged goods",
    customer: "Tom Harris",
    category: "Disputes",
    time: "2d ago",
    priority: "Urgent",
    status: "In Progress",
    agent: "CL",
    sla: "SLA 6h",
    slaC: "#f59e0b",
    slaBg: "rgba(245,158,11,0.1)",
    tab: "open",
  },
  {
    id: "#1034",
    subject: "Subscription cancellation",
    customer: "Nina Patel",
    category: "Billing",
    time: "3d ago",
    priority: "Medium",
    status: "Pending",
    agent: "AM",
    tab: "pending",
  },
  {
    id: "#1033",
    subject: "Missing items in order",
    customer: "Chris Lee",
    category: "Orders",
    time: "3d ago",
    priority: "High",
    status: "Open",
    agent: "BK",
    tab: "open",
  },
];

export const TICKET_ROWS = RAW_TICKETS.map((t, i) => ({
  ...t,
  priBar: PRIORITY_COLORS[t.priority],
  ...(STATUS_MAP[t.status] || {}),
  agentBg: AGENT_COLORS[i % 5],
  agentInit: t.agent,
}));

export const CHAT_LIST = [
  {
    id: 0,
    name: "Sarah Chen",
    init: "SC",
    lastMsg: "I still haven't received my order...",
    time: "2m",
    unread: "2",
    statusDot: "#10b981",
    avatarBg: "#6366f1",
    status: "Online",
  },
  {
    id: 1,
    name: "Mike Johnson",
    init: "MJ",
    lastMsg: "Can you check the replacement status?",
    time: "15m",
    unread: "1",
    statusDot: "#10b981",
    avatarBg: "#10b981",
    status: "Online",
  },
  {
    id: 2,
    name: "Emma Davis",
    init: "ED",
    lastMsg: "Thanks for looking into this",
    time: "1h",
    statusDot: "#94a3b8",
    avatarBg: "#f59e0b",
    status: "Away",
  },
  {
    id: 3,
    name: "Alex Kumar",
    init: "AK",
    lastMsg: "The coupon still doesn't work",
    time: "2h",
    statusDot: "#10b981",
    avatarBg: "#3b82f6",
    status: "Online",
  },
  {
    id: 4,
    name: "Lisa Park",
    init: "LP",
    lastMsg: "I've attached photos of the damage",
    time: "3h",
    statusDot: "#94a3b8",
    avatarBg: "#ec4899",
    status: "Away",
  },
  {
    id: 5,
    name: "David Wilson",
    init: "DW",
    lastMsg: "That fixed it, thank you!",
    time: "5h",
    statusDot: "#94a3b8",
    avatarBg: "#14b8a6",
    status: "Offline",
  },
];

export const CHAT_MESSAGES = {
  0: [
    {
      text: "Hi, I placed an order 7 days ago and it still hasn't arrived. Order #7821.",
      fromAgent: false,
      time: "10:23 AM",
    },
    {
      text: "I'm sorry to hear that, Sarah. Let me look into order #7821 right away.",
      fromAgent: true,
      time: "10:25 AM",
    },
    {
      text: "I can see your order was shipped on Jul 3 via FastShip Express. The tracking shows it's been stuck at the regional hub since Jul 5.",
      fromAgent: true,
      time: "10:26 AM",
    },
    {
      text: "That's frustrating. Can you escalate this with the carrier?",
      fromAgent: false,
      time: "10:28 AM",
    },
    {
      text: "Absolutely. I've filed an urgent inquiry with FastShip and you should receive an update within 24 hours. In the meantime, I've also applied a $10 credit to your account for the inconvenience.",
      fromAgent: true,
      time: "10:30 AM",
    },
  ],
  1: [
    {
      text: "Hi, the replacement for my wrong item still hasn't shipped.",
      fromAgent: false,
      time: "9:10 AM",
    },
    {
      text: "Let me check the replacement status for you, Mike.",
      fromAgent: true,
      time: "9:12 AM",
    },
  ],
};

export const KB_CATEGORIES = [
  {
    title: "Shipping & Delivery",
    desc: "Tracking, delays, lost packages",
    articles: "24",
    icon: "local_shipping",
    bg: "rgba(14,165,233,0.1)",
    ic: "#0ea5e9",
  },
  {
    title: "Returns & Refunds",
    desc: "Return policy, refund process",
    articles: "18",
    icon: "replay",
    bg: "rgba(16,185,129,0.1)",
    ic: "#10b981",
  },
  {
    title: "Payment Issues",
    desc: "Failed payments, billing disputes",
    articles: "15",
    icon: "payments",
    bg: "rgba(99,102,241,0.1)",
    ic: "#6366f1",
  },
  {
    title: "Account & Security",
    desc: "Login, 2FA, password reset",
    articles: "12",
    icon: "security",
    bg: "rgba(245,158,11,0.1)",
    ic: "#f59e0b",
  },
  {
    title: "Product Information",
    desc: "Specs, availability, warranties",
    articles: "31",
    icon: "info",
    bg: "rgba(236,72,153,0.1)",
    ic: "#ec4899",
  },
  {
    title: "Vendor Policies",
    desc: "Vendor terms, disputes, escalation",
    articles: "9",
    icon: "storefront",
    bg: "rgba(239,68,68,0.1)",
    ic: "#ef4444",
  },
];

const CUSTOMER_COLORS = [
  "#6366f1",
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
];

const RAW_CUSTOMERS = [
  { name: "Sarah Chen", email: "sarah.chen@email.com", orders: "23", tickets: "5" },
  { name: "Mike Johnson", email: "mike.j@email.com", orders: "8", tickets: "3" },
  { name: "Emma Davis", email: "emma.d@email.com", orders: "42", tickets: "7" },
  { name: "Alex Kumar", email: "alex.k@email.com", orders: "5", tickets: "2" },
  { name: "Lisa Park", email: "lisa.p@email.com", orders: "15", tickets: "4" },
  { name: "David Wilson", email: "david.w@email.com", orders: "3", tickets: "1" },
  { name: "Rachel Kim", email: "rachel.k@email.com", orders: "19", tickets: "6" },
  { name: "Tom Harris", email: "tom.h@email.com", orders: "7", tickets: "2" },
];

export const CUSTOMER_ROWS = RAW_CUSTOMERS.map((c, i) => ({
  ...c,
  init: c.name
    .split(" ")
    .map((n) => n[0])
    .join(""),
  bg: CUSTOMER_COLORS[i % 8],
}));

export const GENERIC_PAGES = {
  orders: {
    title: "Order Lookup",
    sections: [
      {
        title: "Search Orders",
        icon: "search",
        iconC: "#0ea5e9",
        action: "",
        items: [
          {
            icon: "shopping_bag",
            bg: "rgba(14,165,233,0.1)",
            ic: "#0ea5e9",
            title: "Order #7821 — Sarah Chen",
            sub: "Processing · $234.50 · Jul 8",
          },
          {
            icon: "shopping_bag",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Order #7820 — Mike Johnson",
            sub: "Shipped · $67.80 · Jul 8",
          },
          {
            icon: "shopping_bag",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Order #7819 — Emma Davis",
            sub: "Delivered · $189.00 · Jul 7",
          },
        ],
      },
    ],
  },
  macros: {
    title: "Macros & Templates",
    sections: [
      {
        title: "Response Templates",
        icon: "bolt",
        iconC: "#f59e0b",
        action: "Create new",
        items: [
          {
            icon: "schedule",
            bg: "rgba(14,165,233,0.1)",
            ic: "#0ea5e9",
            title: "Shipping Delay Response",
            sub: "Apologize + provide tracking update",
          },
          {
            icon: "replay",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Refund Confirmation",
            sub: "Confirm refund initiated + timeline",
          },
          {
            icon: "check_circle",
            bg: "rgba(99,102,241,0.1)",
            ic: "#6366f1",
            title: "Issue Resolved",
            sub: "Thank customer + satisfaction survey",
          },
        ],
      },
    ],
  },
  escalations: {
    title: "Escalations",
    sections: [
      {
        title: "Active Escalations",
        icon: "trending_up",
        iconC: "#ef4444",
        action: "View all",
        items: [
          {
            icon: "priority_high",
            bg: "rgba(239,68,68,0.1)",
            ic: "#ef4444",
            title: "Vendor dispute — damaged goods",
            sub: "Tom Harris · Escalated 2h ago · Awaiting supervisor",
          },
          {
            icon: "priority_high",
            bg: "rgba(245,158,11,0.1)",
            ic: "#f59e0b",
            title: "Repeated delivery failures",
            sub: "Sarah Chen · Escalated 1d ago · Under review",
          },
        ],
      },
    ],
  },
  reports: {
    title: "Reports",
    sections: [
      {
        title: "Available Reports",
        icon: "bar_chart",
        iconC: "#6366f1",
        action: "Schedule",
        items: [
          {
            icon: "monitoring",
            bg: "rgba(14,165,233,0.1)",
            ic: "#0ea5e9",
            title: "Ticket Volume Report",
            sub: "Daily/weekly/monthly trends",
          },
          {
            icon: "timer",
            bg: "rgba(245,158,11,0.1)",
            ic: "#f59e0b",
            title: "SLA Compliance",
            sub: "Response & resolution targets",
          },
          {
            icon: "sentiment_satisfied",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "CSAT Report",
            sub: "Customer satisfaction scores",
          },
          {
            icon: "person",
            bg: "rgba(99,102,241,0.1)",
            ic: "#6366f1",
            title: "Agent Performance",
            sub: "Individual agent metrics",
          },
        ],
      },
    ],
  },
  settings: {
    title: "Settings",
    sections: [
      {
        title: "Support Settings",
        icon: "settings",
        iconC: "#64748b",
        action: "",
        items: [
          {
            icon: "schedule",
            bg: "rgba(14,165,233,0.1)",
            ic: "#0ea5e9",
            title: "Business Hours",
            sub: "Mon-Fri 9AM-6PM EST",
          },
          {
            icon: "timer",
            bg: "rgba(245,158,11,0.1)",
            ic: "#f59e0b",
            title: "SLA Policies",
            sub: "Response time, resolution targets",
          },
          {
            icon: "route",
            bg: "rgba(99,102,241,0.1)",
            ic: "#6366f1",
            title: "Routing Rules",
            sub: "Auto-assign by category, priority",
          },
          {
            icon: "notifications",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Notifications",
            sub: "Email, Slack, push alerts",
          },
        ],
      },
    ],
  },
};

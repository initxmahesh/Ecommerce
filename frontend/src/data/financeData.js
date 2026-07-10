const TXN_STATUS = {
  Completed: { sc: "#059669", sb: "rgba(16,185,129,0.1)" },
  Pending: { sc: "#d97706", sb: "rgba(245,158,11,0.1)" },
  Failed: { sc: "#dc2626", sb: "rgba(239,68,68,0.1)" },
  Processing: { sc: "#635bff", sb: "rgba(99,91,255,0.1)" },
};

const PAYOUT_STATUS = {
  Ready: { sc: "#059669", sb: "rgba(16,185,129,0.1)" },
  Processing: { sc: "#635bff", sb: "rgba(99,91,255,0.1)" },
  Pending: { sc: "#d97706", sb: "rgba(245,158,11,0.1)" },
  Held: { sc: "#dc2626", sb: "rgba(239,68,68,0.1)" },
};

const INVOICE_STATUS = {
  Paid: { sc: "#059669", sb: "rgba(16,185,129,0.1)" },
  Pending: { sc: "#d97706", sb: "rgba(245,158,11,0.1)" },
  Overdue: { sc: "#dc2626", sb: "rgba(239,68,68,0.1)" },
};

const VENDOR_COLORS = [
  "#635bff",
  "#10b981",
  "#f59e0b",
  "#3b82f6",
  "#ef4444",
  "#ec4899",
  "#14b8a6",
  "#8b5cf6",
];

export const PAGE_TITLES = {
  dashboard: "Dashboard",
  transactions: "Transactions",
  analytics: "Analytics",
  payouts: "Payouts",
  refunds: "Refunds",
  settlements: "Settlements",
  invoices: "Invoices",
  taxes: "Taxes",
  reconciliation: "Reconciliation",
  reports: "Reports",
  settings: "Settings",
};

export const NAV_GROUPS = [
  {
    label: "OVERVIEW",
    items: [
      {
        id: "dashboard",
        icon: "space_dashboard",
        label: "Dashboard",
        path: "/finance",
      },
      {
        id: "transactions",
        icon: "receipt_long",
        label: "Transactions",
        path: "/finance/transactions",
      },
      {
        id: "analytics",
        icon: "monitoring",
        label: "Analytics",
        path: "/finance/analytics",
      },
    ],
  },
  {
    label: "MONEY",
    items: [
      {
        id: "payouts",
        icon: "send",
        label: "Payouts",
        path: "/finance/payouts",
        badge: "12",
      },
      {
        id: "refunds",
        icon: "replay",
        label: "Refunds",
        path: "/finance/refunds",
        badge: "8",
      },
      {
        id: "settlements",
        icon: "account_balance_wallet",
        label: "Settlements",
        path: "/finance/settlements",
      },
      {
        id: "invoices",
        icon: "receipt",
        label: "Invoices",
        path: "/finance/invoices",
      },
    ],
  },
  {
    label: "ACCOUNTING",
    items: [
      {
        id: "taxes",
        icon: "calculate",
        label: "Taxes",
        path: "/finance/taxes",
      },
      {
        id: "reconciliation",
        icon: "compare_arrows",
        label: "Reconciliation",
        path: "/finance/reconciliation",
      },
      {
        id: "reports",
        icon: "summarize",
        label: "Reports",
        path: "/finance/reports",
      },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      {
        id: "settings",
        icon: "settings",
        label: "Settings",
        path: "/finance/settings",
      },
    ],
  },
];

export const FINANCE_PROFILE = {
  name: "Finance Team",
  initials: "FT",
  status: "MarketBase Finance",
};

export const HOME_KPIS = [
  {
    label: "Gross Volume",
    value: "$2.4M",
    change: "+12.5%",
    cc: "#10b981",
    vc: "#0a0a0a",
  },
  {
    label: "Net Revenue",
    value: "$412K",
    change: "+8.1%",
    cc: "#10b981",
    vc: "#0a0a0a",
  },
  {
    label: "Pending Payouts",
    value: "$89.2K",
    change: "12 vendors",
    cc: "#71717a",
    vc: "#f59e0b",
  },
  {
    label: "Refunds",
    value: "$34.3K",
    change: "+2.1%",
    cc: "#ef4444",
    vc: "#ef4444",
  },
  {
    label: "Failed Payments",
    value: "$8.4K",
    change: "-0.8%",
    cc: "#10b981",
    vc: "#0a0a0a",
  },
];

/** Deterministic volume bars (avoids Math.random flicker on re-render) */
export const VOL_BARS = [
  42, 58, 48, 62, 55, 71, 45, 68, 52, 74, 49, 61, 57, 66,
].map((v) => ({
  h: `${v}%`,
  c: v > 55 ? "#635bff" : "#c4b5fd",
}));

export const REV_BREAKDOWN = [
  { label: "Platform Commission", value: "$312K", w: "65%", color: "#635bff" },
  { label: "Subscription Fees", value: "$67K", w: "14%", color: "#a78bfa" },
  { label: "Transaction Fees", value: "$23K", w: "5%", color: "#10b981" },
  { label: "Other Income", value: "$10K", w: "2%", color: "#f59e0b" },
];

export const HOME_TXNS = [
  {
    icon: "arrow_downward",
    iconBg: "rgba(16,185,129,0.08)",
    iconC: "#10b981",
    desc: "Payment from Sarah Chen",
    meta: "Order #7821 · Visa ****4242",
    amount: "+$234.50",
    amtC: "#10b981",
    time: "2m ago",
  },
  {
    icon: "arrow_upward",
    iconBg: "rgba(99,91,255,0.08)",
    iconC: "#635bff",
    desc: "Payout to TechGadgets Pro",
    meta: "Batch #483 · Bank transfer",
    amount: "-$4,230",
    amtC: "#ef4444",
    time: "1h ago",
  },
  {
    icon: "arrow_downward",
    iconBg: "rgba(16,185,129,0.08)",
    iconC: "#10b981",
    desc: "Payment from Mike Johnson",
    meta: "Order #7820 · Mastercard ****8821",
    amount: "+$67.80",
    amtC: "#10b981",
    time: "2h ago",
  },
  {
    icon: "replay",
    iconBg: "rgba(239,68,68,0.08)",
    iconC: "#ef4444",
    desc: "Refund to Lisa Park",
    meta: "Order #7817 · Original payment",
    amount: "-$52.99",
    amtC: "#ef4444",
    time: "3h ago",
  },
  {
    icon: "arrow_downward",
    iconBg: "rgba(16,185,129,0.08)",
    iconC: "#10b981",
    desc: "Subscription fee — StyleHub",
    meta: "Monthly · Jul 2024",
    amount: "+$99.00",
    amtC: "#10b981",
    time: "5h ago",
  },
  {
    icon: "warning",
    iconBg: "rgba(245,158,11,0.08)",
    iconC: "#f59e0b",
    desc: "Failed payment attempt",
    meta: "Order #7825 · Visa ****1234",
    amount: "$145.00",
    amtC: "#71717a",
    time: "6h ago",
  },
];

export const TXN_ROWS = [
  {
    id: "txn_8f2a",
    desc: "Payment received",
    vendor: "TechGadgets",
    date: "Jul 10",
    amount: "$234.50",
    fee: "$6.80",
    net: "$227.70",
    netC: "#10b981",
    status: "Completed",
  },
  {
    id: "txn_7e1b",
    desc: "Payment received",
    vendor: "FreshMart",
    date: "Jul 10",
    amount: "$67.80",
    fee: "$1.97",
    net: "$65.83",
    netC: "#10b981",
    status: "Completed",
  },
  {
    id: "txn_6d3c",
    desc: "Refund issued",
    vendor: "BookWorld",
    date: "Jul 9",
    amount: "-$52.99",
    fee: "$0.00",
    net: "-$52.99",
    netC: "#ef4444",
    status: "Completed",
  },
  {
    id: "txn_5c4d",
    desc: "Payment received",
    vendor: "StyleHub",
    date: "Jul 9",
    amount: "$189.00",
    fee: "$5.48",
    net: "$183.52",
    netC: "#10b981",
    status: "Completed",
  },
  {
    id: "txn_4b5e",
    desc: "Payment failed",
    vendor: "HomeEssentials",
    date: "Jul 9",
    amount: "$145.00",
    fee: "$0.00",
    net: "$0.00",
    netC: "#71717a",
    status: "Failed",
  },
  {
    id: "txn_3a6f",
    desc: "Payment received",
    vendor: "TechGadgets",
    date: "Jul 8",
    amount: "$899.00",
    fee: "$26.07",
    net: "$872.93",
    netC: "#10b981",
    status: "Completed",
  },
  {
    id: "txn_2g7h",
    desc: "Subscription fee",
    vendor: "FreshMart",
    date: "Jul 8",
    amount: "$49.00",
    fee: "$0.00",
    net: "$49.00",
    netC: "#10b981",
    status: "Completed",
  },
  {
    id: "txn_1h8i",
    desc: "Payout sent",
    vendor: "BookWorld",
    date: "Jul 8",
    amount: "-$2,340",
    fee: "$0.00",
    net: "-$2,340",
    netC: "#ef4444",
    status: "Completed",
  },
  {
    id: "txn_0i9j",
    desc: "Payment received",
    vendor: "NaturalGoods",
    date: "Jul 7",
    amount: "$89.00",
    fee: "$2.58",
    net: "$86.42",
    netC: "#10b981",
    status: "Completed",
  },
  {
    id: "txn_9j0k",
    desc: "Payment processing",
    vendor: "StyleHub",
    date: "Jul 7",
    amount: "$275.00",
    fee: "$7.98",
    net: "$267.02",
    netC: "#635bff",
    status: "Processing",
  },
].map((t) => ({ ...t, ...(TXN_STATUS[t.status] || {}) }));

export const PAYOUT_KPIS = [
  { label: "Pending", value: "$89.2K", vc: "#f59e0b" },
  { label: "Processing", value: "$42.1K", vc: "#635bff" },
  { label: "Paid This Month", value: "$1.2M", vc: "#10b981" },
  { label: "Next Batch", value: "Jul 15", vc: "#0a0a0a" },
];

export const PAYOUT_ROWS = [
  {
    vendor: "TechGadgets Pro",
    period: "Jul 1–8",
    method: "Bank transfer",
    amount: "$4,230",
    status: "Ready",
  },
  {
    vendor: "FreshMart",
    period: "Jul 1–8",
    method: "Bank transfer",
    amount: "$2,890",
    status: "Ready",
  },
  {
    vendor: "StyleHub",
    period: "Jul 1–8",
    method: "Bank transfer",
    amount: "$5,670",
    status: "Ready",
  },
  {
    vendor: "HomeEssentials",
    period: "Jul 1–8",
    method: "PayPal",
    amount: "$1,240",
    status: "Ready",
  },
  {
    vendor: "BookWorld",
    period: "Jul 1–8",
    method: "Bank transfer",
    amount: "$3,420",
    status: "Processing",
  },
  {
    vendor: "NaturalGoods",
    period: "Jul 1–8",
    method: "Bank transfer",
    amount: "$890",
    status: "Ready",
  },
  {
    vendor: "UrbanWear",
    period: "Jul 1–8",
    method: "Pending setup",
    amount: "$0",
    status: "Pending",
  },
  {
    vendor: "GadgetZone",
    period: "N/A",
    method: "Suspended",
    amount: "$2,100",
    status: "Held",
  },
].map((p, i) => {
  const color = VENDOR_COLORS[i % VENDOR_COLORS.length];
  return {
    ...p,
    ...(PAYOUT_STATUS[p.status] || {}),
    bg: `${color}15`,
    ic: color,
  };
});

export const REFUND_KPIS = [
  { label: "Total Refunds", value: "$34,280", vc: "#ef4444" },
  { label: "Refund Rate", value: "2.1%", vc: "#0a0a0a" },
  { label: "Pending", value: "8", vc: "#f59e0b" },
  { label: "Avg. Amount", value: "$42.30", vc: "#0a0a0a" },
];

export const REFUND_ROWS = [
  {
    order: "#7817",
    customer: "Lisa Park",
    reason: "Item not as described",
    amount: "$52.99",
    date: "Jul 9",
    status: "Completed",
  },
  {
    order: "#7810",
    customer: "Tom Harris",
    reason: "Damaged in shipping",
    amount: "$89.00",
    date: "Jul 8",
    status: "Completed",
  },
  {
    order: "#7802",
    customer: "Nina Patel",
    reason: "Wrong item",
    amount: "$34.50",
    date: "Jul 7",
    status: "Processing",
  },
  {
    order: "#7798",
    customer: "Chris Lee",
    reason: "Late delivery",
    amount: "$12.00",
    date: "Jul 6",
    status: "Completed",
  },
  {
    order: "#7791",
    customer: "David Wilson",
    reason: "Duplicate charge",
    amount: "$899.00",
    date: "Jul 5",
    status: "Pending",
  },
  {
    order: "#7785",
    customer: "Rachel Kim",
    reason: "Cancelled order",
    amount: "$35.00",
    date: "Jul 4",
    status: "Completed",
  },
].map((r) => ({ ...r, ...(TXN_STATUS[r.status] || {}) }));

export const INVOICE_ROWS = [
  {
    id: "INV-0712",
    vendor: "TechGadgets Pro",
    date: "Jul 10",
    period: "Jul 1–8",
    amount: "$2,340",
    status: "Paid",
    ic: "#10b981",
  },
  {
    id: "INV-0711",
    vendor: "FreshMart",
    date: "Jul 10",
    period: "Jul 1–8",
    amount: "$1,890",
    status: "Paid",
    ic: "#10b981",
  },
  {
    id: "INV-0710",
    vendor: "StyleHub",
    date: "Jul 9",
    period: "Jul 1–8",
    amount: "$3,450",
    status: "Pending",
    ic: "#f59e0b",
  },
  {
    id: "INV-0709",
    vendor: "HomeEssentials",
    date: "Jul 8",
    period: "Jun 24–30",
    amount: "$678",
    status: "Overdue",
    ic: "#ef4444",
  },
  {
    id: "INV-0708",
    vendor: "BookWorld",
    date: "Jul 7",
    period: "Jun 24–30",
    amount: "$2,120",
    status: "Paid",
    ic: "#10b981",
  },
  {
    id: "INV-0707",
    vendor: "NaturalGoods",
    date: "Jul 6",
    period: "Jun 24–30",
    amount: "$560",
    status: "Paid",
    ic: "#10b981",
  },
  {
    id: "INV-0706",
    vendor: "TechGadgets Pro",
    date: "Jul 5",
    period: "Jun 17–23",
    amount: "$3,890",
    status: "Paid",
    ic: "#10b981",
  },
  {
    id: "INV-0705",
    vendor: "StyleHub",
    date: "Jul 4",
    period: "Jun 17–23",
    amount: "$4,120",
    status: "Paid",
    ic: "#10b981",
  },
].map((i) => ({ ...i, ...(INVOICE_STATUS[i.status] || {}) }));

export const PERIOD_OPTIONS = ["7d", "30d", "90d", "1y"];

export const GENERIC_PAGES = {
  analytics: {
    title: "Analytics",
    sections: [
      {
        title: "Financial Analytics",
        icon: "monitoring",
        iconC: "#635bff",
        items: [
          {
            icon: "trending_up",
            bg: "rgba(99,91,255,0.1)",
            ic: "#635bff",
            title: "Revenue Trends",
            sub: "Monthly, quarterly, yearly comparisons",
          },
          {
            icon: "pie_chart",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Revenue by Vendor",
            sub: "Top earners and distribution",
          },
          {
            icon: "bar_chart",
            bg: "rgba(59,130,246,0.1)",
            ic: "#3b82f6",
            title: "Payment Methods",
            sub: "Card types, wallet, bank transfers",
          },
          {
            icon: "warning",
            bg: "rgba(239,68,68,0.1)",
            ic: "#ef4444",
            title: "Failed Payments",
            sub: "Failure rates, reasons, retry success",
          },
        ],
      },
    ],
  },
  settlements: {
    title: "Settlements",
    sections: [
      {
        title: "Settlement Batches",
        icon: "account_balance_wallet",
        iconC: "#635bff",
        items: [
          {
            icon: "check_circle",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Batch #483",
            sub: "Jul 10 · 24 vendors · Bank transfer",
            value: "$89,420",
          },
          {
            icon: "check_circle",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Batch #482",
            sub: "Jul 8 · 22 vendors · Bank transfer",
            value: "$76,230",
          },
          {
            icon: "check_circle",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Batch #481",
            sub: "Jul 1 · 20 vendors · Bank transfer",
            value: "$68,900",
          },
        ],
      },
    ],
  },
  taxes: {
    title: "Taxes",
    sections: [
      {
        title: "Tax Configuration",
        icon: "calculate",
        iconC: "#f59e0b",
        items: [
          {
            icon: "public",
            bg: "rgba(59,130,246,0.1)",
            ic: "#3b82f6",
            title: "Tax Regions",
            sub: "US states, EU VAT, international",
            value: "42 zones",
          },
          {
            icon: "receipt_long",
            bg: "rgba(99,91,255,0.1)",
            ic: "#635bff",
            title: "Tax Reports",
            sub: "Monthly summary, by vendor, by region",
          },
          {
            icon: "integration_instructions",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Tax Automation",
            sub: "Avalara integration · Active",
          },
        ],
      },
    ],
  },
  reconciliation: {
    title: "Reconciliation",
    sections: [
      {
        title: "Account Reconciliation",
        icon: "compare_arrows",
        iconC: "#635bff",
        items: [
          {
            icon: "check_circle",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Jul 2024",
            sub: "Matched: 4,821 of 4,832 · 11 exceptions",
            value: "99.8%",
          },
          {
            icon: "check_circle",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Jun 2024",
            sub: "Fully reconciled · 0 exceptions",
            value: "100%",
          },
          {
            icon: "check_circle",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "May 2024",
            sub: "Fully reconciled · 0 exceptions",
            value: "100%",
          },
        ],
      },
    ],
  },
  reports: {
    title: "Reports",
    sections: [
      {
        title: "Financial Reports",
        icon: "summarize",
        iconC: "#635bff",
        items: [
          {
            icon: "description",
            bg: "rgba(99,91,255,0.1)",
            ic: "#635bff",
            title: "P&L Statement",
            sub: "Monthly profit and loss",
          },
          {
            icon: "table_chart",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Vendor Earnings",
            sub: "Commission breakdown by vendor",
          },
          {
            icon: "bar_chart",
            bg: "rgba(59,130,246,0.1)",
            ic: "#3b82f6",
            title: "Payment Analytics",
            sub: "Success rates, methods, geography",
          },
          {
            icon: "trending_up",
            bg: "rgba(245,158,11,0.1)",
            ic: "#f59e0b",
            title: "Revenue Forecast",
            sub: "Projected revenue next 3 months",
          },
        ],
      },
    ],
  },
  settings: {
    title: "Settings",
    sections: [
      {
        title: "Finance Settings",
        icon: "settings",
        iconC: "#71717a",
        items: [
          {
            icon: "credit_card",
            bg: "rgba(99,91,255,0.1)",
            ic: "#635bff",
            title: "Payment Gateways",
            sub: "Stripe, PayPal, bank transfers",
          },
          {
            icon: "schedule",
            bg: "rgba(245,158,11,0.1)",
            ic: "#f59e0b",
            title: "Payout Schedule",
            sub: "Weekly on Mondays",
          },
          {
            icon: "percent",
            bg: "rgba(16,185,129,0.1)",
            ic: "#10b981",
            title: "Commission Rates",
            sub: "Default 10%, custom per vendor",
          },
          {
            icon: "notifications",
            bg: "rgba(59,130,246,0.1)",
            ic: "#3b82f6",
            title: "Alert Thresholds",
            sub: "Refund rate, failed payments",
          },
        ],
      },
    ],
  },
};

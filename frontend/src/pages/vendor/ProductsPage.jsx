import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { STATUS_STYLES } from "../../data/vendorOwnerData.js";
import { useVendorOwnerUi } from "../../context/vendorOwnerUiContext.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";
import StatusBadge from "../../components/superadmin/StatusBadge.jsx";
import {
  ImportButton,
  ExportButton,
  PRODUCT_IE_CONFIG,
} from "../../modules/import-export/index.js";
import { fetchVendorProducts } from "../../services/vendorCatalogApi.js";

const STATUS_LABEL = {
  published: "Published",
  draft: "Draft",
  pending_review: "Pending Review",
  archived: "Archived",
};

const CATEGORY_ICONS = [
  { icon: "inventory_2", bg: "#ecfdf5", color: "#10b981" },
  { icon: "headphones", bg: "#f0f0ff", color: "#6366f1" },
  { icon: "bolt", bg: "#eff6ff", color: "#3b82f6" },
  { icon: "laptop", bg: "#fffbeb", color: "#f59e0b" },
];

function ProductsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [counts, setCounts] = useState({
    all: 0,
    published: 0,
    draft: 0,
    pending: 0,
    out_of_stock: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { showToast } = useVendorOwnerUi();

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchVendorProducts({
        status: activeTab,
        search: search.trim() || undefined,
      });
      setProducts(data.products || []);
      if (data.counts) setCounts(data.counts);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [activeTab, search]);

  useEffect(() => {
    const t = setTimeout(loadProducts, search ? 250 : 0);
    return () => clearTimeout(t);
  }, [loadProducts, search]);

  const tabs = useMemo(
    () => [
      { id: "all", label: "All", count: counts.all },
      { id: "published", label: "Published", count: counts.published },
      { id: "draft", label: "Draft", count: counts.draft },
      { id: "pending", label: "Pending", count: counts.pending },
      { id: "out_of_stock", label: "Out of Stock", count: counts.out_of_stock },
    ],
    [counts],
  );

  const onImportComplete = () => {
    showToast("Products imported — list updated");
    loadProducts();
  };

  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xl font-bold">Products</div>
          <div className="text-[13px] text-slate-500">
            Import a CSV/Excel file or export your catalog anytime
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <ImportButton
            resourceKey="products"
            resourceConfig={PRODUCT_IE_CONFIG}
            onNotify={showToast}
            onComplete={onImportComplete}
          />
          <ExportButton
            resourceKey="products"
            resourceConfig={PRODUCT_IE_CONFIG}
            onNotify={showToast}
          />
          <Link
            to="/vendor/products/new"
            className="flex cursor-pointer items-center gap-1.5 rounded-md bg-emerald-500 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-emerald-600"
          >
            <MaterialIcon name="add" size={16} />
            Add product
          </Link>
        </div>
      </div>

      <div className="mb-4 flex gap-0 overflow-x-auto border-b border-slate-200">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer whitespace-nowrap border-b-2 px-4 py-2 text-[13px] font-medium transition-colors ${
                active
                  ? "border-emerald-500 text-emerald-500"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}{" "}
              <span className="rounded-[10px] bg-slate-100 px-1.5 py-px text-[11px] text-slate-500">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <div className="flex max-w-[280px] flex-1 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-slate-500">
          <MaterialIcon name="search" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="w-full bg-transparent text-[13px] text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {error ? (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
          {error}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        {loading ? (
          <div className="px-4 py-12 text-center text-[13px] text-slate-500">
            Loading products…
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center px-4 py-14 text-center">
            <MaterialIcon
              name="inventory_2"
              size={40}
              className="text-slate-300"
            />
            <div className="mt-3 text-sm font-semibold text-slate-800">
              No products yet
            </div>
            <p className="mt-1 max-w-sm text-[13px] text-slate-500">
              Download the template, fill in your catalog, then Import — or add
              a product manually.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <ImportButton
                resourceKey="products"
                resourceConfig={PRODUCT_IE_CONFIG}
                onNotify={showToast}
                onComplete={onImportComplete}
                label="Import products"
              />
              <Link
                to="/vendor/products/new"
                className="rounded-md bg-emerald-500 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-emerald-600"
              >
                Add product
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <div className="grid min-w-[560px] grid-cols-[40px_1fr_80px_80px_70px_90px_70px] border-b border-slate-100 bg-slate-50 px-4 py-2">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-[3px] border-[1.5px] border-slate-300" />
                </div>
                {["Product", "Price", "Stock", "Sold", "Status", "Actions"].map(
                  (h) => (
                    <div
                      key={h}
                      className="text-[10px] font-semibold uppercase tracking-wide text-slate-500"
                    >
                      {h}
                    </div>
                  ),
                )}
              </div>
              {products.map((p, idx) => {
                const label = STATUS_LABEL[p.status] || p.status;
                const st = STATUS_STYLES[label] || STATUS_STYLES.Draft;
                const stockC =
                  p.stock <= 5 ? "#ef4444" : p.stock <= 20 ? "#f59e0b" : "#10b981";
                const icon = CATEGORY_ICONS[idx % CATEGORY_ICONS.length];
                return (
                  <div
                    key={p.id}
                    className="grid min-w-[560px] cursor-pointer grid-cols-[40px_1fr_80px_80px_70px_90px_70px] items-center border-b border-slate-50 px-4 py-2.5 hover:bg-slate-50/80"
                  >
                    <div>
                      <div className="h-4 w-4 rounded-[3px] border-[1.5px] border-slate-300" />
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
                        style={{ background: icon.bg }}
                      >
                        <MaterialIcon
                          name={icon.icon}
                          size={18}
                          style={{ color: icon.color }}
                        />
                      </div>
                      <div>
                        <div className="text-[13px] font-medium">{p.name}</div>
                        <div className="text-[11px] text-slate-400">
                          {p.sku}
                          {p.category ? ` · ${p.category}` : ""}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono text-xs font-semibold">
                      ${Number(p.price).toFixed(2)}
                    </div>
                    <div className="font-mono text-xs" style={{ color: stockC }}>
                      {p.stock}
                    </div>
                    <div className="font-mono text-xs">—</div>
                    <div>
                      <StatusBadge status={label} color={st.sc} bg={st.sb} />
                    </div>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        aria-label={`Edit ${p.name}`}
                        onClick={() =>
                          navigate("/vendor/products/new", {
                            state: { productName: p.name },
                          })
                        }
                        className="cursor-pointer text-slate-400 hover:text-emerald-500"
                      >
                        <MaterialIcon name="edit" size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
              <div className="text-xs text-slate-500">
                Showing {products.length} product
                {products.length === 1 ? "" : "s"}
              </div>
              <button
                type="button"
                onClick={loadProducts}
                className="cursor-pointer text-xs font-medium text-emerald-600 hover:text-emerald-700"
              >
                Refresh
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;

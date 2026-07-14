import { useCallback, useEffect, useRef, useState } from "react";
import { STATUS_STYLES } from "../../data/vendorOwnerData.js";
import { useVendorOwnerUi } from "../../context/vendorOwnerUiContext.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";
import StatusBadge from "../../components/superadmin/StatusBadge.jsx";
import InlineSearchField from "../../components/dashboard/InlineSearchField.jsx";
import {
  ImportButton,
  ExportButton,
  INVENTORY_IE_CONFIG,
} from "../../modules/import-export/index.js";
import { fetchVendorInventory } from "../../services/vendorCatalogApi.js";

function InventoryPage() {
  const { showToast } = useVendorOwnerUi();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [items, setItems] = useState([]);
  const [kpis, setKpis] = useState({
    totalSkus: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const requestIdRef = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 250);
    return () => clearTimeout(t);
  }, [search]);

  const loadInventory = useCallback(
    async ({ soft = false } = {}) => {
      const requestId = ++requestIdRef.current;
      if (soft) setRefreshing(true);
      else setLoading(true);
      setError("");

      try {
        const data = await fetchVendorInventory({
          search: debouncedSearch || undefined,
        });
        if (requestId !== requestIdRef.current) return;
        setItems(data.items || []);
        if (data.kpis) setKpis(data.kpis);
      } catch (err) {
        if (requestId !== requestIdRef.current) return;
        setError(err.message || "Failed to load inventory");
        setItems([]);
      } finally {
        if (requestId !== requestIdRef.current) return;
        setLoading(false);
        setRefreshing(false);
      }
    },
    [debouncedSearch],
  );

  useEffect(() => {
    loadInventory();
  }, [loadInventory]);

  const onImportComplete = () => {
    showToast("Inventory imported — stock updated");
    loadInventory({ soft: true });
  };

  const onRefresh = () => {
    showToast("Refreshing inventory…");
    loadInventory({ soft: true });
  };

  const kpiCards = [
    {
      label: "Total SKUs",
      value: String(kpis.totalSkus),
      accent: "#10b981",
      vc: "#0f172a",
    },
    {
      label: "In Stock",
      value: String(kpis.inStock),
      accent: "#10b981",
      vc: "#10b981",
    },
    {
      label: "Low Stock",
      value: String(kpis.lowStock),
      accent: "#f59e0b",
      vc: "#f59e0b",
    },
    {
      label: "Out of Stock",
      value: String(kpis.outOfStock),
      accent: "#ef4444",
      vc: "#ef4444",
    },
  ];

  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xl font-bold">Inventory</div>
          <div className="text-[13px] text-slate-500">
            Import stock levels or export your current inventory
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <ImportButton
            resourceKey="inventory"
            resourceConfig={INVENTORY_IE_CONFIG}
            onNotify={showToast}
            onComplete={onImportComplete}
          />
          <ExportButton
            resourceKey="inventory"
            resourceConfig={INVENTORY_IE_CONFIG}
            onNotify={showToast}
          />
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading || refreshing}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-emerald-500 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-emerald-600 disabled:opacity-60"
          >
            <MaterialIcon
              name="refresh"
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            {refreshing ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-[repeat(auto-fill,minmax(155px,1fr))] gap-3">
        {kpiCards.map((ik) => (
          <div
            key={ik.label}
            className="rounded-lg border border-slate-200 border-l-[3px] bg-white px-3.5 py-3"
            style={{ borderLeftColor: ik.accent }}
          >
            <div className="mb-1 text-[11px] text-slate-500">{ik.label}</div>
            <div
              className="font-mono text-xl font-bold"
              style={{ color: ik.vc }}
            >
              {ik.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <InlineSearchField
          value={search}
          onChange={setSearch}
          placeholder="Search SKU or name…"
        />
      </div>

      {error ? (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => loadInventory()}
            className="cursor-pointer font-medium underline"
          >
            Retry
          </button>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        {loading ? (
          <div className="px-4 py-12 text-center text-[13px] text-slate-500">
            Loading inventory…
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center px-4 py-14 text-center">
            <MaterialIcon name="warehouse" size={40} className="text-slate-300" />
            <div className="mt-3 text-sm font-semibold text-slate-800">
              {debouncedSearch ? "No matching inventory" : "No inventory records"}
            </div>
            <p className="mt-1 max-w-sm text-[13px] text-slate-500">
              {debouncedSearch
                ? "Try a different SKU or product name."
                : "Import an inventory file with SKU and on_hand columns, or import products first (stock syncs automatically)."}
            </p>
            {!debouncedSearch ? (
              <div className="mt-4">
                <ImportButton
                  resourceKey="inventory"
                  resourceConfig={INVENTORY_IE_CONFIG}
                  onNotify={showToast}
                  onComplete={onImportComplete}
                  label="Import inventory"
                />
              </div>
            ) : null}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="grid min-w-[580px] grid-cols-[1fr_80px_80px_80px_80px_90px_70px] border-b border-slate-100 bg-slate-50 px-4 py-2">
              {[
                "Product",
                "SKU",
                "On Hand",
                "Reserved",
                "Available",
                "Status",
                "Action",
              ].map((h) => (
                <div
                  key={h}
                  className="text-[10px] font-semibold uppercase text-slate-500"
                >
                  {h}
                </div>
              ))}
            </div>
            {items.map((ir) => {
              const st = STATUS_STYLES[ir.status] || {};
              const availC =
                ir.available <= 5
                  ? "#ef4444"
                  : ir.available <= 15
                    ? "#f59e0b"
                    : "#10b981";
              return (
                <div
                  key={ir.id}
                  className="grid min-w-[580px] grid-cols-[1fr_80px_80px_80px_80px_90px_70px] items-center border-b border-slate-50 px-4 py-2.5"
                >
                  <div className="text-[13px] font-medium">{ir.name}</div>
                  <div className="font-mono text-xs text-slate-500">{ir.sku}</div>
                  <div className="font-mono text-xs">{ir.onHand}</div>
                  <div className="font-mono text-xs text-amber-500">
                    {ir.reserved}
                  </div>
                  <div
                    className="font-mono text-xs font-semibold"
                    style={{ color: availC }}
                  >
                    {ir.available}
                  </div>
                  <div>
                    <StatusBadge status={ir.status} color={st.sc} bg={st.sb} />
                  </div>
                  <div>
                    <button
                      type="button"
                      className="w-full cursor-pointer rounded bg-slate-100 px-2.5 py-0.5 text-center text-[11px] font-medium hover:bg-slate-200"
                      onClick={() =>
                        showToast("Use Import to bulk-adjust stock levels")
                      }
                    >
                      Adjust
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryPage;

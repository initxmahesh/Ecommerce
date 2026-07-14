import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { GENERIC_PAGES } from "../../data/vendorOwnerData.js";
import { useVendorOwnerUi } from "../../context/vendorOwnerUiContext.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";
import {
  CreateDiscountModal,
  CreateCampaignModal,
  ViewAllModal,
} from "../../components/vendor/SectionActionModals.jsx";
import { downloadCsv } from "../../utils/clientExport.js";

function GenericSectionPage() {
  const { section } = useParams();
  const { showToast } = useVendorOwnerUi();
  const basePage = GENERIC_PAGES[section] || GENERIC_PAGES.settings;

  const [pageData, setPageData] = useState(basePage);
  const [discountOpen, setDiscountOpen] = useState(false);
  const [campaignOpen, setCampaignOpen] = useState(false);
  const [viewAll, setViewAll] = useState({ open: false, title: "", items: [] });

  useEffect(() => {
    setPageData(GENERIC_PAGES[section] || GENERIC_PAGES.settings);
  }, [section]);

  const allItems = useMemo(
    () => pageData.sections.flatMap((s) => s.items || []),
    [pageData],
  );

  const exportCsv = () => {
    const headers = ["title", "sub", "value"];
    const rows = allItems.map((i) => ({
      title: i.title,
      sub: i.sub,
      value: i.value || "",
    }));
    const base = `${pageData.title || "export"}-${Date.now()}`
      .toLowerCase()
      .replace(/\s+/g, "-");
    downloadCsv(base, headers, rows);
    showToast(`Exported ${rows.length} rows as CSV`);
  };

  const handleAction = (ga) => {
    const label = (ga.label || "").toLowerCase();
    if (label.includes("export") || ga.icon === "download") {
      exportCsv();
      return;
    }
    if (label.includes("discount") || section === "discounts") {
      setDiscountOpen(true);
      return;
    }
    if (label.includes("campaign") || section === "marketing") {
      setCampaignOpen(true);
      return;
    }
    if (label.includes("invite") || label.includes("member")) {
      showToast("Invite flow coming soon — use Staff settings");
      return;
    }
    if (label.includes("rate") || label.includes("add")) {
      showToast(`${ga.label} saved as draft`);
      return;
    }
    showToast(`${ga.label} is ready`);
  };

  const addItemToFirstSection = (item) => {
    setPageData((prev) => {
      const sections = prev.sections.map((s, idx) =>
        idx === 0 ? { ...s, items: [item, ...(s.items || [])] } : s,
      );
      return { ...prev, sections };
    });
  };

  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xl font-bold">{pageData.title}</div>
        {pageData.actions?.length ? (
          <div className="flex gap-2">
            {pageData.actions.map((ga) => (
              <button
                key={ga.label}
                type="button"
                onClick={() => handleAction(ga)}
                className={`cursor-pointer rounded-md px-3.5 py-1.5 text-[13px] font-medium hover:opacity-90 ${
                  ga.primary
                    ? "bg-emerald-500 text-white"
                    : "border border-slate-200 bg-white text-gray-700"
                }`}
              >
                <MaterialIcon
                  name={ga.icon}
                  size={14}
                  className="align-[-2px]"
                />{" "}
                {ga.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {pageData.sections.map((gs) => (
        <div
          key={gs.title}
          className="mb-3.5 overflow-hidden rounded-lg border border-slate-200 bg-white"
        >
          <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-3.5">
            <MaterialIcon name={gs.icon} size={20} style={{ color: gs.iconC }} />
            <span className="text-sm font-semibold">{gs.title}</span>
            {gs.action ? (
              <button
                type="button"
                onClick={() =>
                  setViewAll({
                    open: true,
                    title: gs.title,
                    items: gs.items || [],
                  })
                }
                className="ml-auto cursor-pointer text-xs font-medium text-emerald-500 hover:text-emerald-600"
              >
                {gs.action}
              </button>
            ) : null}
          </div>
          {gs.items.map((gi) => (
            <button
              key={gi.id || gi.title}
              type="button"
              onClick={() => showToast(`Opened ${gi.title}`)}
              className="flex w-full cursor-pointer items-center gap-3 border-b border-slate-50 px-5 py-3 text-left hover:bg-slate-50/80 last:border-0"
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ background: gi.bg }}
              >
                <MaterialIcon
                  name={gi.icon}
                  size={18}
                  style={{ color: gi.ic }}
                />
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-medium">{gi.title}</div>
                <div className="text-xs text-slate-500">{gi.sub}</div>
              </div>
              {gi.value ? (
                <span className="font-mono text-[13px] font-semibold">
                  {gi.value}
                </span>
              ) : null}
              <MaterialIcon
                name="chevron_right"
                size={18}
                className="text-slate-300"
              />
            </button>
          ))}
        </div>
      ))}

      <CreateDiscountModal
        open={discountOpen}
        onClose={() => setDiscountOpen(false)}
        onCreated={(item) => {
          addItemToFirstSection(item);
          showToast(`Discount ${item.title} created`);
        }}
      />

      <CreateCampaignModal
        open={campaignOpen}
        onClose={() => setCampaignOpen(false)}
        onCreated={(item) => {
          addItemToFirstSection(item);
          showToast(`Campaign “${item.title}” created`);
        }}
      />

      <ViewAllModal
        open={viewAll.open}
        onClose={() => setViewAll({ open: false, title: "", items: [] })}
        title={viewAll.title}
        items={viewAll.items}
      />
    </div>
  );
}

export default GenericSectionPage;

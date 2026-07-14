import { useEffect, useState } from "react";
import ModalShell from "../../modules/import-export/components/shared/ModalShell.jsx";
import MaterialIcon from "../superadmin/MaterialIcon.jsx";

const inputClass =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-500/10";

function CreateDiscountModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({
    code: "",
    type: "percentage",
    value: "",
    minOrder: "",
    startsAt: "",
    endsAt: "",
    usageLimit: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm({
        code: "",
        type: "percentage",
        value: "",
        minOrder: "",
        startsAt: "",
        endsAt: "",
        usageLimit: "",
      });
      setError("");
    }
  }, [open]);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.code.trim()) {
      setError("Discount code is required");
      return;
    }
    if (!form.value || Number(form.value) <= 0) {
      setError("Enter a valid discount value");
      return;
    }
    if (form.type === "percentage" && Number(form.value) > 100) {
      setError("Percentage cannot exceed 100");
      return;
    }

    const created = {
      id: `disc_${Date.now()}`,
      icon: form.type === "shipping" ? "local_shipping" : "percent",
      bg: "rgba(16,185,129,0.1)",
      ic: "#10b981",
      title: form.code.trim().toUpperCase(),
      sub: [
        form.type === "percentage"
          ? `${form.value}% off`
          : form.type === "fixed"
            ? `$${form.value} off`
            : "Free shipping",
        form.endsAt ? `Ends ${form.endsAt}` : "No expiry",
      ].join(" · "),
      value: "0 uses",
      ...form,
      code: form.code.trim().toUpperCase(),
    };

    onCreated?.(created);
    onClose?.();
  };

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Create discount"
      subtitle="Standard promotion code for your storefront"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md border border-slate-200 px-3.5 py-1.5 text-[13px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-discount-form"
            className="cursor-pointer rounded-md bg-emerald-500 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-emerald-600"
          >
            Create discount
          </button>
        </>
      }
    >
      <form id="create-discount-form" onSubmit={submit} className="space-y-3.5">
        {error ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
            {error}
          </div>
        ) : null}

        <label className="block text-xs font-medium text-slate-700">
          Discount code <span className="text-red-500">*</span>
          <input
            className={`${inputClass} mt-1`}
            value={form.code}
            onChange={(e) => set("code", e.target.value)}
            placeholder="SUMMER20"
          />
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block text-xs font-medium text-slate-700">
            Type
            <select
              className={`${inputClass} mt-1`}
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed amount</option>
              <option value="shipping">Free shipping</option>
            </select>
          </label>
          <label className="block text-xs font-medium text-slate-700">
            Value <span className="text-red-500">*</span>
            <input
              type="number"
              min="0"
              step="0.01"
              className={`${inputClass} mt-1`}
              value={form.value}
              onChange={(e) => set("value", e.target.value)}
              placeholder={form.type === "percentage" ? "20" : "10.00"}
              disabled={form.type === "shipping"}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block text-xs font-medium text-slate-700">
            Min. order amount
            <input
              type="number"
              min="0"
              className={`${inputClass} mt-1`}
              value={form.minOrder}
              onChange={(e) => set("minOrder", e.target.value)}
              placeholder="0"
            />
          </label>
          <label className="block text-xs font-medium text-slate-700">
            Usage limit
            <input
              type="number"
              min="0"
              className={`${inputClass} mt-1`}
              value={form.usageLimit}
              onChange={(e) => set("usageLimit", e.target.value)}
              placeholder="Unlimited"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block text-xs font-medium text-slate-700">
            Starts
            <input
              type="date"
              className={`${inputClass} mt-1`}
              value={form.startsAt}
              onChange={(e) => set("startsAt", e.target.value)}
            />
          </label>
          <label className="block text-xs font-medium text-slate-700">
            Ends
            <input
              type="date"
              className={`${inputClass} mt-1`}
              value={form.endsAt}
              onChange={(e) => set("endsAt", e.target.value)}
            />
          </label>
        </div>
      </form>
    </ModalShell>
  );
}

function CreateCampaignModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({
    name: "",
    channel: "email",
    budget: "",
    startsAt: "",
    endsAt: "",
    audience: "all",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm({
        name: "",
        channel: "email",
        budget: "",
        startsAt: "",
        endsAt: "",
        audience: "all",
      });
      setError("");
    }
  }, [open]);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const channelMeta = {
    email: { icon: "email", bg: "rgba(59,130,246,0.1)", ic: "#3b82f6" },
    ads: { icon: "ads_click", bg: "rgba(16,185,129,0.1)", ic: "#10b981" },
    sms: { icon: "sms", bg: "rgba(99,102,241,0.1)", ic: "#6366f1" },
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Campaign name is required");
      return;
    }
    const meta = channelMeta[form.channel] || channelMeta.email;
    const created = {
      id: `camp_${Date.now()}`,
      ...meta,
      title: form.name.trim(),
      sub: [
        form.channel.toUpperCase(),
        form.startsAt ? `Starts ${form.startsAt}` : "Draft",
        form.audience === "all" ? "All customers" : "Segmented",
      ].join(" · "),
      value: form.budget ? `$${form.budget} budget` : "No budget",
      ...form,
      name: form.name.trim(),
    };
    onCreated?.(created);
    onClose?.();
  };

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="New campaign"
      subtitle="Launch an email, SMS, or paid ads campaign"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md border border-slate-200 px-3.5 py-1.5 text-[13px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-campaign-form"
            className="cursor-pointer rounded-md bg-emerald-500 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-emerald-600"
          >
            Create campaign
          </button>
        </>
      }
    >
      <form id="create-campaign-form" onSubmit={submit} className="space-y-3.5">
        {error ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
            {error}
          </div>
        ) : null}

        <label className="block text-xs font-medium text-slate-700">
          Campaign name <span className="text-red-500">*</span>
          <input
            className={`${inputClass} mt-1`}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Summer Sale Newsletter"
          />
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block text-xs font-medium text-slate-700">
            Channel
            <select
              className={`${inputClass} mt-1`}
              value={form.channel}
              onChange={(e) => set("channel", e.target.value)}
            >
              <option value="email">Email</option>
              <option value="ads">Paid ads</option>
              <option value="sms">SMS</option>
            </select>
          </label>
          <label className="block text-xs font-medium text-slate-700">
            Audience
            <select
              className={`${inputClass} mt-1`}
              value={form.audience}
              onChange={(e) => set("audience", e.target.value)}
            >
              <option value="all">All customers</option>
              <option value="new">New customers</option>
              <option value="repeat">Repeat buyers</option>
            </select>
          </label>
        </div>

        <label className="block text-xs font-medium text-slate-700">
          Budget (USD)
          <input
            type="number"
            min="0"
            className={`${inputClass} mt-1`}
            value={form.budget}
            onChange={(e) => set("budget", e.target.value)}
            placeholder="500"
          />
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block text-xs font-medium text-slate-700">
            Starts
            <input
              type="date"
              className={`${inputClass} mt-1`}
              value={form.startsAt}
              onChange={(e) => set("startsAt", e.target.value)}
            />
          </label>
          <label className="block text-xs font-medium text-slate-700">
            Ends
            <input
              type="date"
              className={`${inputClass} mt-1`}
              value={form.endsAt}
              onChange={(e) => set("endsAt", e.target.value)}
            />
          </label>
        </div>
      </form>
    </ModalShell>
  );
}

function ViewAllModal({ open, onClose, title, items = [] }) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      wide
      title={title || "All items"}
      subtitle={`${items.length} record${items.length === 1 ? "" : "s"}`}
      footer={
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-md bg-emerald-500 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-emerald-600"
        >
          Close
        </button>
      }
    >
      <div className="divide-y divide-slate-50 overflow-hidden rounded-lg border border-slate-200">
        {items.length === 0 ? (
          <div className="px-4 py-10 text-center text-[13px] text-slate-500">
            Nothing to show yet
          </div>
        ) : (
          items.map((gi) => (
            <div
              key={gi.id || gi.title}
              className="flex items-center gap-3 px-4 py-3"
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
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium">{gi.title}</div>
                <div className="text-xs text-slate-500">{gi.sub}</div>
              </div>
              {gi.value ? (
                <span className="font-mono text-[13px] font-semibold">
                  {gi.value}
                </span>
              ) : null}
            </div>
          ))
        )}
      </div>
    </ModalShell>
  );
}

export { CreateDiscountModal, CreateCampaignModal, ViewAllModal };

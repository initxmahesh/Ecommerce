import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PRODUCT_FORM_SECTIONS,
  VARIANT_ROWS,
} from "../../data/vendorOwnerData.js";
import { useVendorOwnerUi } from "../../context/vendorOwnerUiContext.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";

const inputClass =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-900 outline-none focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-500/10";

function FieldInput({ field, value, onChange }) {
  if (field.type === "textarea") {
    return (
      <textarea
        id={field.id}
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => onChange(field.id, e.target.value)}
        className={`${inputClass} min-h-20 resize-y`}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        id={field.id}
        value={value}
        onChange={(e) => onChange(field.id, e.target.value)}
        className={inputClass}
      >
        {field.options.map((opt) => (
          <option key={opt} value={opt === "Select category" ? "" : opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "upload") {
    return (
      <button
        type="button"
        className="w-full cursor-pointer rounded-lg border-2 border-dashed border-slate-200 p-6 text-center hover:border-emerald-500 hover:bg-emerald-500/[0.02]"
      >
        <MaterialIcon
          name="cloud_upload"
          size={32}
          className="text-slate-300"
        />
        <div className="mt-2 text-[13px] text-slate-500">
          Drag & drop images or click to upload
        </div>
        <div className="mt-1 text-[11px] text-slate-400">
          PNG, JPG up to 5MB · Max 8 images
        </div>
      </button>
    );
  }

  if (field.type === "variants") {
    return (
      <div className="overflow-hidden rounded-md border border-slate-200">
        <div className="grid grid-cols-[1fr_80px_80px_80px_40px] border-b border-slate-100 bg-slate-50 px-3 py-1.5">
          {["Option", "Price", "Stock", "SKU"].map((h) => (
            <div
              key={h}
              className="text-[10px] font-semibold uppercase text-slate-500"
            >
              {h}
            </div>
          ))}
          <div />
        </div>
        {VARIANT_ROWS.map((vr) => (
          <div
            key={vr.sku}
            className="grid grid-cols-[1fr_80px_80px_80px_40px] items-center border-b border-slate-50 px-3 py-2"
          >
            <div className="text-[13px]">{vr.option}</div>
            <div className="font-mono text-xs">{vr.price}</div>
            <div className="font-mono text-xs">{vr.stock}</div>
            <div className="font-mono text-xs text-slate-500">{vr.sku}</div>
            <button
              type="button"
              aria-label={`Remove ${vr.option}`}
              className="cursor-pointer text-slate-400 hover:text-red-500"
            >
              <MaterialIcon name="delete" size={16} />
            </button>
          </div>
        ))}
        <div className="px-3 py-2">
          <button
            type="button"
            className="cursor-pointer text-xs font-medium text-emerald-500 hover:text-emerald-600"
          >
            + Add variant
          </button>
        </div>
      </div>
    );
  }

  return (
    <input
      id={field.id}
      type={field.type}
      placeholder={field.placeholder}
      value={value}
      onChange={(e) => onChange(field.id, e.target.value)}
      className={inputClass}
    />
  );
}

function AddProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useVendorOwnerUi();
  const editingProduct = location.state?.productName || "";

  const [form, setForm] = useState({ name: editingProduct });

  const handleChange = (id, value) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const goProducts = () => navigate("/vendor/products");

  const saveDraft = () => {
    showToast("Product saved as draft");
    goProducts();
  };

  const publishProduct = () => {
    showToast("Product published successfully");
    goProducts();
  };

  return (
    <div className="mx-auto w-full max-w-[900px] flex-1 p-4 md:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xl font-bold">
          {editingProduct ? `Edit: ${editingProduct}` : "Add New Product"}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={goProducts}
            className="cursor-pointer rounded-md border border-slate-200 bg-white px-3.5 py-1.5 text-[13px] hover:border-slate-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={saveDraft}
            className="cursor-pointer rounded-md border border-slate-200 bg-white px-3.5 py-1.5 text-[13px] hover:border-slate-300"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={publishProduct}
            className="cursor-pointer rounded-md bg-emerald-500 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-emerald-600"
          >
            Publish
          </button>
        </div>
      </div>

      {PRODUCT_FORM_SECTIONS.map((section) => (
        <section
          key={section.title}
          className="mb-4 rounded-lg border border-slate-200 bg-white p-5"
        >
          <h2 className="mb-1 text-[15px] font-semibold">{section.title}</h2>
          <p className="mb-4 text-xs text-slate-400">{section.desc}</p>
          {section.fields.map((field) => (
            <div key={field.id} className="mb-3.5 last:mb-0">
              <label
                htmlFor={field.type === "upload" || field.type === "variants" ? undefined : field.id}
                className="mb-1 block text-xs font-medium text-gray-700"
              >
                {field.label}
                {field.required ? (
                  <span className="text-red-500"> *</span>
                ) : null}
              </label>
              <FieldInput
                field={field}
                value={form[field.id] ?? ""}
                onChange={handleChange}
              />
              {field.hint ? (
                <div className="mt-1 text-[11px] text-slate-400">
                  {field.hint}
                </div>
              ) : null}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

export default AddProductPage;

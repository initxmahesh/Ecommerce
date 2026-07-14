function isEmpty(value) {
  return value == null || String(value).trim() === "";
}

function toNumber(value) {
  if (isEmpty(value)) return null;
  const n = Number(String(value).replace(/[$,]/g, ""));
  return Number.isFinite(n) ? n : NaN;
}

const TYPE_VALIDATORS = {
  string(value) {
    return { ok: true, value: String(value ?? "").trim() };
  },
  number(value, field) {
    if (isEmpty(value)) {
      return field.required
        ? { ok: false, reason: "Required number is missing", expected: "number" }
        : { ok: true, value: null };
    }
    const n = toNumber(value);
    if (Number.isNaN(n)) {
      return { ok: false, reason: "Invalid number", expected: "number", suggestedFix: "Provide a numeric value" };
    }
    if (field.min != null && n < field.min) {
      return { ok: false, reason: `Must be >= ${field.min}`, expected: `>= ${field.min}` };
    }
    if (field.max != null && n > field.max) {
      return { ok: false, reason: `Must be <= ${field.max}`, expected: `<= ${field.max}` };
    }
    return { ok: true, value: n };
  },
  integer(value, field) {
    const base = TYPE_VALIDATORS.number(value, field);
    if (!base.ok) return base;
    if (base.value == null) return base;
    if (!Number.isInteger(base.value)) {
      return { ok: false, reason: "Must be an integer", expected: "integer" };
    }
    return base;
  },
  enum(value, field) {
    if (isEmpty(value)) {
      return field.required
        ? { ok: false, reason: "Required value is missing", expected: (field.values || []).join("|") }
        : { ok: true, value: field.default ?? null };
    }
    const normalized = String(value).trim().toLowerCase();
    const match = (field.values || []).find(
      (v) => String(v).toLowerCase() === normalized,
    );
    if (!match) {
      return {
        ok: false,
        reason: "Value not in allowed list",
        expected: (field.values || []).join(", "),
        suggestedFix: `Use one of: ${(field.values || []).join(", ")}`,
      };
    }
    return { ok: true, value: match };
  },
  boolean(value, field) {
    if (isEmpty(value)) {
      return field.required
        ? { ok: false, reason: "Required boolean is missing", expected: "true|false" }
        : { ok: true, value: field.default ?? false };
    }
    const v = String(value).trim().toLowerCase();
    if (["true", "1", "yes", "y"].includes(v)) return { ok: true, value: true };
    if (["false", "0", "no", "n"].includes(v)) return { ok: true, value: false };
    return { ok: false, reason: "Invalid boolean", expected: "true|false" };
  },
};

export function applyColumnMapping(row, mapping) {
  const out = {};
  Object.entries(mapping || {}).forEach(([target, source]) => {
    if (!source) return;
    out[target] = row[source] ?? row[String(source).toLowerCase()] ?? "";
  });
  return out;
}

export function autoMapColumns(fileHeaders, columns) {
  const mapping = {};
  const normalizedHeaders = fileHeaders.map((h) => String(h).toLowerCase());

  columns.forEach((col) => {
    const candidates = [
      col.key,
      col.label,
      ...(col.aliases || []),
    ]
      .filter(Boolean)
      .map((v) => String(v).toLowerCase().replace(/\s+/g, "_"));

    const hit = candidates.find((c) => normalizedHeaders.includes(c));
    if (hit) {
      const idx = normalizedHeaders.indexOf(hit);
      mapping[col.key] = fileHeaders[idx];
    }
  });

  return mapping;
}

export function validateHeaders(fileHeaders, columns, mapping) {
  const errors = [];
  const mappedSources = Object.values(mapping || {}).filter(Boolean);
  const required = columns.filter((c) => c.required);

  required.forEach((col) => {
    if (!mapping[col.key]) {
      errors.push({
        row: 0,
        column: col.key,
        invalidValue: null,
        expectedValue: col.label || col.key,
        reason: "Required column is not mapped",
        suggestedFix: `Map a file column to "${col.label || col.key}"`,
        severity: "error",
      });
    }
  });

  const seen = new Set();
  mappedSources.forEach((source) => {
    if (seen.has(source)) {
      errors.push({
        row: 0,
        column: source,
        invalidValue: source,
        expectedValue: "Unique column mapping",
        reason: "Duplicate column mapping",
        suggestedFix: "Map each file column to at most one field",
        severity: "error",
      });
    }
    seen.add(source);
  });

  const known = new Set(columns.map((c) => c.key));
  Object.keys(mapping || {}).forEach((target) => {
    if (!known.has(target) && mapping[target]) {
      errors.push({
        row: 0,
        column: target,
        invalidValue: target,
        expectedValue: [...known].join(", "),
        reason: "Unknown target column",
        suggestedFix: "Remove mapping for unknown field",
        severity: "warning",
      });
    }
  });

  return errors;
}

export function validateRows(rows, columns, { uniqueKeys = [] } = {}) {
  const errors = [];
  const transformed = [];
  const uniqueTrackers = Object.fromEntries(uniqueKeys.map((k) => [k, new Map()]));

  rows.forEach((raw, index) => {
    const rowNumber = index + 2;
    const out = {};
    let rowHasError = false;

    columns.forEach((field) => {
      const rawValue = raw[field.key];
      if (field.required && isEmpty(rawValue)) {
        errors.push({
          row: rowNumber,
          column: field.key,
          invalidValue: rawValue ?? "",
          expectedValue: field.example || field.type || "value",
          reason: "Required value is missing",
          suggestedFix: `Provide a value for ${field.label || field.key}`,
          severity: "error",
        });
        rowHasError = true;
        return;
      }

      const validator = TYPE_VALIDATORS[field.type] || TYPE_VALIDATORS.string;
      const result = validator(rawValue, field);
      if (!result.ok) {
        errors.push({
          row: rowNumber,
          column: field.key,
          invalidValue: rawValue ?? "",
          expectedValue: result.expected || field.type,
          reason: result.reason,
          suggestedFix: result.suggestedFix || field.description || "",
          severity: "error",
        });
        rowHasError = true;
        return;
      }
      out[field.key] = result.value;
    });

    uniqueKeys.forEach((key) => {
      const value = out[key];
      if (isEmpty(value)) return;
      const tracker = uniqueTrackers[key];
      const normalized = String(value).toLowerCase();
      if (tracker.has(normalized)) {
        errors.push({
          row: rowNumber,
          column: key,
          invalidValue: value,
          expectedValue: "Unique value",
          reason: `Duplicate ${key} (also on row ${tracker.get(normalized)})`,
          suggestedFix: `Ensure each ${key} appears only once`,
          severity: "error",
        });
        rowHasError = true;
      } else {
        tracker.set(normalized, rowNumber);
      }
    });

    if (!rowHasError) {
      transformed.push({ ...out, __row: rowNumber });
    }
  });

  return { rows: transformed, errors };
}

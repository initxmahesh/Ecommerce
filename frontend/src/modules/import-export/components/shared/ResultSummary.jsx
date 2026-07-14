function ResultSummary({ job }) {
  if (!job) return null;

  const items = [
    { label: "Total rows", value: job.totalRows },
    { label: "Success", value: job.successRows },
    { label: "Errors", value: job.errorRows },
    { label: "Warnings", value: job.warningRows },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3"
        >
          <div className="text-[11px] text-slate-500">{item.label}</div>
          <div className="font-mono text-lg font-bold">{item.value ?? 0}</div>
        </div>
      ))}
    </div>
  );
}

export default ResultSummary;

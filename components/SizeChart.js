const rows = [
  ["S", "34–36", "28–30", "34–36", "38 cm"],
  ["M", "36–38", "30–32", "36–38", "39 cm"],
  ["L", "38–40", "32–34", "38–40", "40 cm"],
  ["XL", "40–42", "34–36", "40–42", "41 cm"],
  ["XXL", "42–44", "36–38", "42–44", "42 cm"],
];

export default function SizeChart() {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-line text-left">
              <th className="py-3 pr-4 font-medium">Size</th>
              <th className="py-3 pr-4 font-medium">Chest (in)</th>
              <th className="py-3 pr-4 font-medium">Waist (in)</th>
              <th className="py-3 pr-4 font-medium">Hip (in)</th>
              <th className="py-3 font-medium">Shorts Length</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-b border-line text-muted">
                {r.map((cell, i) => (
                  <td key={i} className={`py-3 ${i === 0 ? "text-ink" : ""} ${i < 4 ? "pr-4" : ""}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-muted mt-4">
        If between sizes, we recommend sizing up for shorts.
      </p>
    </div>
  );
}

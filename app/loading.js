export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5">
      <div className="loader-ring" />
      <p className="eyebrow">Loading</p>
    </div>
  );
}

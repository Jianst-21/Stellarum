export default function StarfieldBg() {
  return (
    <>
      {/* Background Animations */}
      <div className="fixed inset-0 z-[-3] pointer-events-none stars starfield-bg" />
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="shooting-star" />
        <div className="shooting-star" />
        <div className="shooting-star" />
      </div>
      {/* Overlay for text readability */}
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-black/40" />
    </>
  );
}

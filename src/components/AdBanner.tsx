import React from "react";

export function AdBanner({ position }: { position: "top"|"bottom" }) {
  const isTop = position === "top";
  return (
    <div className={isTop ? "bg-slate-50 border-b" : "bg-slate-50 border-t"}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="w-full grid place-items-center">
          <div className="w-full max-w-[970px] h-[90px] rounded-xl border-2 border-dashed border-slate-300 grid place-items-center text-slate-500 text-sm">
            Espaço Publicitário 728×90
          </div>
        </div>
      </div>
    </div>
  );
}

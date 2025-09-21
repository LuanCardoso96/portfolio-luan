import React from "react";

export function AdSlot({ size = "728x90", label="Espaço Publicitário" }:{size?: "728x90"|"300x250"|"320x100", label?: string}) {
  const map = { "728x90":[970,90], "300x250":[336,280], "320x100":[320,100] } as const;
  const [w,h] = map[size];
  return (
    <div className="my-10 grid place-items-center">
      <div className="rounded-xl border-2 border-dashed border-slate-300 text-center p-4" style={{ width: w, height: h }}>
        <div className="text-slate-600">{label}</div>
        <div className="text-xs text-slate-400">Banner {size}</div>
      </div>
    </div>
  );
}

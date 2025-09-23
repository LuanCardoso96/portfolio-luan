import React from "react";

export default function AdSlot({ type = "top", size = "responsive", className = "" }) {
  const isTop = type === "top";
  const isBottom = type === "bottom";

  const containerClasses = `
    ad-slot 
    w-full 
    max-w-4xl 
    mx-auto 
    my-8 
    p-4 
    border-2 
    border-dashed 
    border-gray-300 
    rounded-lg 
    bg-gray-100 
    flex 
    items-center 
    justify-center
    ${isTop ? "ad-slot-top" : ""}
    ${isBottom ? "ad-slot-bottom" : ""}
    ${className}
  `;

  return (
    <div className={containerClasses} aria-label="Espaço de anúncio">
      <div className="text-center text-gray-500">
        <div className="font-medium mb-1">Seu anúncio aqui</div>
        <div className="text-sm">(Placeholder de Anúncio)</div>
      </div>
    </div>
  );
}
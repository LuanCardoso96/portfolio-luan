import React from "react"; import { cn } from "@/lib/cn";
export const Badge=({className,...p}:any)=><span className={cn("inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-700",className)} {...p}/>;

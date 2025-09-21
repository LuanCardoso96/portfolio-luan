import React from "react"; import { cn } from "@/lib/cn";
export const Card = ({className,...p}:any)=><div className={cn("bg-white rounded-2xl shadow border border-slate-100",className)} {...p}/>;
export const CardHeader=({className,...p}:any)=><div className={cn("p-6 pb-0",className)} {...p}/>;
export const CardTitle =({className,...p}:any)=><h3 className={cn("text-lg font-semibold",className)} {...p}/>;
export const CardContent=({className,...p}:any)=><div className={cn("p-6",className)} {...p}/>;

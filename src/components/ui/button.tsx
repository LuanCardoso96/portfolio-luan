import React from "react"; import { cn } from "@/lib/cn";
export function Button({ className, asChild, ...props }: any){ const Cmp:any=asChild?"span":"button";
  return <Cmp className={cn("inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium",className)} {...props} />;
}

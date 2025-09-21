export async function getJSON<T=any>(path: string): Promise<T> {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Falha ao carregar ${path}`);
  return res.json();
}
export function sortBy<T>(arr: T[], field: string) {
  const desc = field.startsWith("-");
  const key = desc ? field.slice(1) : field;
  const sorted = [...arr].sort((a:any,b:any)=>{
    const va = a[key]; const vb = b[key];
    const da = new Date(va as any).getTime(); const db = new Date(vb as any).getTime();
    if (!isNaN(da) && !isNaN(db)) return da - db; // datas
    return (va>vb?1:va<vb?-1:0);
  });
  return desc ? sorted.reverse() : sorted;
}
export function pick<T>(arr:T[], limit?: number){ return typeof limit==="number" ? arr.slice(0,limit) : arr; }
export function where<T>(arr:T[], filter: Record<string, any>) {
  return arr.filter((item:any)=>Object.entries(filter).every(([k,v])=>item[k]===v));
}

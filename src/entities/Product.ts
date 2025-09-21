import { getJSON, where, pick, sortBy } from "./_base";
export type ProductItem = { id:string; title:string; price:string; image:string; url:string; is_featured?:boolean; created_date?:string; };
export const Product = {
  async filter(filterObj:Record<string,any>={}, sort?:string, limit?:number): Promise<ProductItem[]> {
    // Load from JSON
    const jsonData = await getJSON<ProductItem[]>("/assets/config/products.json");
    
    // Load from localStorage
    const localData = JSON.parse(localStorage.getItem("admin_products") || "[]");
    
    // Merge data (localStorage has priority)
    const mergedData = [...jsonData];
    localData.forEach((localItem: ProductItem) => {
      const existingIndex = mergedData.findIndex(item => item.id === localItem.id);
      if (existingIndex >= 0) {
        mergedData[existingIndex] = localItem;
      } else {
        mergedData.push(localItem);
      }
    });
    
    let r = where(mergedData, filterObj);
    r = sort ? sortBy(r, sort) : r;
    return pick(r, limit);
  }
}

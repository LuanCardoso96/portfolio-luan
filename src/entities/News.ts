import { getJSON, sortBy, where, pick } from "./_base";
export type NewsItem = {
  id:string; title:string; summary?:string; image_url?:string;
  category:"marvel_dc"|"fofocas"; source?:string; created_date?:string; is_featured?:boolean;
};
export const News = {
  async filter(filterObj:Record<string,any>={}, sort="-created_date", limit?:number): Promise<NewsItem[]> {
    // Load from JSON
    const jsonData = await getJSON<NewsItem[]>("/assets/config/news.json");
    
    // Load from localStorage
    const localData = JSON.parse(localStorage.getItem("admin_news") || "[]");
    
    // Merge data (localStorage has priority)
    const mergedData = [...jsonData];
    localData.forEach((localItem: NewsItem) => {
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

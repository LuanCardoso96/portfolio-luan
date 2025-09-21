import { getJSON, where, pick, sortBy } from "./_base";
export type ProjectItem = { id:string; title:string; description?:string; image_url?:string; technologies?:string[]; demo_url?:string; github_url?:string; is_featured?:boolean; order?:number; created_date?:string; };
export const Project = {
  async filter(filterObj:Record<string,any>={}, sort="order", limit?:number): Promise<ProjectItem[]> {
    // Load from JSON
    const jsonData = await getJSON<ProjectItem[]>("/assets/config/projects.json");
    
    // Load from localStorage
    const localData = JSON.parse(localStorage.getItem("admin_projects") || "[]");
    
    // Merge data (localStorage has priority)
    const mergedData = [...jsonData];
    localData.forEach((localItem: ProjectItem) => {
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

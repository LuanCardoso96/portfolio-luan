// Stub para createPageUrl
export const createPageUrl = (pageName, params = {}) => {
  const baseUrl = `/${pageName.toLowerCase()}`
  if (Object.keys(params).length === 0) {
    return baseUrl
  }
  
  const searchParams = new URLSearchParams(params)
  return `${baseUrl}?${searchParams.toString()}`
}

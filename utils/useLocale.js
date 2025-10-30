export const getLocaleField = (data, field, lang) => {
  const isDefault = lang === "en";
  const localizedKey = isDefault ? "en" : lang;

  if (data[field] && typeof data[field] === "object") {
    return data[field][localizedKey] || data[field]["en"] || "";
  }
  return data[`${field}_${localizedKey}`] || data[`${field}_en`] || data[field] || "";
};


export const getStremleField = (data, lang) => {
  if (!data) return "";
  if (typeof data === "string") return data;
  if (Array.isArray(data) && data.length > 0) {
    const firstBlock = data[0];
    if (firstBlock?.value) {
      if (typeof firstBlock.value === "object") {
        const content = firstBlock.value[lang] || firstBlock.value["en"] || "";
        return content.replace(/<[^>]*>/g, '');
      }
      return firstBlock.value;
    }
    return "";
  }
  if (typeof data === "object") {
    return data[lang] ?? data["en"] ?? "";
  }

  return "";
};
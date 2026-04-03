export const getLocaleField = (data, fieldKey, locale) => {
  const isDefault = locale === "en";
  const localizedKey = isDefault ? "en" : locale;

  if (data[fieldKey] && typeof data[fieldKey] === "object") {
    return data[fieldKey][localizedKey] || data[fieldKey]["en"] || "";
  }
  return data[`${fieldKey}_${localizedKey}`] || data[`${fieldKey}_en`] || data[fieldKey] || "";
};


export const getStremleField = (data, locale) => {
  if (!data) return "";
  if (typeof data === "string") return data;
  if (Array.isArray(data) && data.length > 0) {
    const firstBlock = data[0];
    if (firstBlock?.value) {
      if (typeof firstBlock.value === "object") {
        const content = firstBlock.value[locale] || firstBlock.value["en"] || "";
        return content.replace(/<[^>]*>/g, '');
      }
      return firstBlock.value;
    }
    return "";
  }
  if (typeof data === "object") {
    return data[locale] ?? data["en"] ?? "";
  }

  return "";
};
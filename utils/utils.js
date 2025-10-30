
export const buildParams = (params) => {
  const keys = Object.keys(params);
  if (keys.length == 0) return "";
  return (
    "?" +
    keys
      .map((key) => {
        return `${key}=${params[key]}`;
      })
      .join("&")
  );
};


export function truncateName(iteamName, maxLength = 20) {
  if (!iteamName) return '';

  return iteamName.length > maxLength
    ? iteamName.slice(0, maxLength) + '...'
    : iteamName;
}


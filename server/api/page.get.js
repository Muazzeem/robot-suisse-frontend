export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const config = useRuntimeConfig(event);

  const params = new URLSearchParams(query).toString();
  const url = `${config.public.baseURL}/api/v2/pages/find/${params ? "?" + params : ""}`;

  return await $fetch(url);
});

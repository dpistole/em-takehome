export interface FetchApiParams {
    host: string;
    path: string;
    method?: "GET" | "POST"
    body: string;
}
/**
 * a small wrapper around fetch that can be reused against different api paths,
 * encapsulating error handing, body parsing, etc.
 */
export const fetchApi = async (params: FetchApiParams) => {
  const response = await fetch(`${params.host}${params.path}`, {
    method: params.method || "GET",
    body: params.body,
  });

  if (response.ok === false) {
    throw new Error(`error fetching ${response.status} error`);
  }

  return await response.json();
};

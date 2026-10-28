import { auth } from "@/lib/firebase";

const DEFAULT_API_BASE_URL = "https://agritruk.onrender.com";

const resolveApiBaseUrl = () => {
  const configured = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
  try {
    const url = new URL(configured);
    // Never send credentials over plain HTTP, except to a local dev backend
    const isLocal = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (url.protocol === "https:" || (isLocal && import.meta.env.DEV)) {
      return url.origin;
    }
  } catch {
    // Fall through to the default
  }
  console.error("Ignoring insecure or invalid VITE_API_BASE_URL; using the default API.");
  return DEFAULT_API_BASE_URL;
};

export const API_BASE_URL = resolveApiBaseUrl();

/**
 * Builds an API URL from path segments, encoding each one so IDs from users or
 * URLs can't change the path (e.g. "../admin/plans").
 */
export const apiUrl = (...segments: string[]) =>
  `${API_BASE_URL}/${segments.map((segment) => encodeURIComponent(segment)).join("/")}`;

/** Authorization header for the signed-in user, or an explicit token, if there is one. */
export const authHeaders = async (token?: string): Promise<Record<string, string>> => {
  const bearer = token || (await auth.currentUser?.getIdToken());
  return bearer ? { Authorization: `Bearer ${bearer}` } : {};
};

export const jsonHeaders = async (token?: string): Promise<Record<string, string>> => ({
  "Content-Type": "application/json",
  ...(await authHeaders(token)),
});

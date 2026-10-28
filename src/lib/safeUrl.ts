const PAYSTACK_HOSTS = ["checkout.paystack.com", "paystack.com", "paystack.co"];

/**
 * Returns the checkout URL only if it is an HTTPS Paystack address, so a bad or
 * tampered API response can't send users to another site.
 */
export const getPaystackCheckoutUrl = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    const isPaystack = PAYSTACK_HOSTS.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`));
    return url.protocol === "https:" && isPaystack ? url.href : null;
  } catch {
    return null;
  }
};

/** Builds a tel: link from a phone number, keeping only digits and a leading +. */
export const toTelHref = (phone: unknown): string | null => {
  if (typeof phone !== "string") return null;
  const cleaned = phone.trim().replace(/(?!^\+)[^\d]/g, "");
  return /^\+?\d{6,15}$/.test(cleaned) ? `tel:${cleaned}` : null;
};

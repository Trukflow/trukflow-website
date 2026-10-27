export const SMARTDROP_URL = "https://smartdrop.africa";
export const SUPPORT_EMAIL = "support@trukflow.com";
export const SUPPORT_PHONE = "+254758594951";
export const SUPPORT_PHONE_DISPLAY = "+254 758 594 951";
export const SMARTDROP_USSD = "*657*090#";

export const waitlistHref = (product: string) =>
  `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`${product} waitlist`)}&body=${encodeURIComponent(
    `Hi TRUKFLOW team,\n\nI'd like to join the ${product} waitlist.\n\nName:\nBusiness:\nLocation:\nPhone:\n`
  )}`;

export type ProductStatus = "pilot" | "coming-soon";

export type Product = {
  id: "smartdrop" | "smartcold" | "chukua";
  name: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  statusLabel: string;
  href: string;
  external?: boolean;
};

export const products: Product[] = [
  {
    id: "smartdrop",
    name: "Smartdrop",
    tagline: "Smart parcel lockers for faster merchant deliveries.",
    description:
      "Merchants drop parcels into secure smart lockers. Customers collect with a one-time code, any time, with no waiting at the door.",
    status: "pilot",
    statusLabel: "Nairobi pilot · Nov 2026",
    href: SMARTDROP_URL,
    external: true,
  },
  {
    id: "smartcold",
    name: "Smartcold",
    tagline: "Cold-storage lockers for fresh food.",
    description:
      "The Smartdrop model, refrigerated. Fish, meat, dairy and fresh produce held at the right temperature until the buyer collects.",
    status: "coming-soon",
    statusLabel: "Coming soon",
    href: "/smartcold",
  },
  {
    id: "chukua",
    name: "Chukua App",
    tagline: "On-demand collection for cargo and farm produce.",
    description:
      "Book a verified transporter to collect goods from the farm gate, warehouse or shop and move them to market, a depot or a locker.",
    status: "coming-soon",
    statusLabel: "Coming soon",
    href: "/chukua",
  },
];

export const smartdropLocations = [
  "Anniversary Towers / KCB Plaza",
  "GPO / Moi Avenue",
  "Sarit Centre / Westlands Mall",
  "Yaya Centre / Adlife Plaza",
  "Eastleigh Business Bay / Uhuru Market",
  "Umoja / Donholm / Buruburu",
  "TRM / Garden City Mall",
  "Gateway Mall, Karen",
  "Syokimau SGR Station",
];

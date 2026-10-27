import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/site/Logo";
import {
  products,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_DISPLAY,
} from "@/components/site/content";

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61577130358564", Icon: Facebook },
  { label: "X", href: "https://x.com/Trukflow", Icon: XIcon },
  { label: "Instagram", href: "https://www.instagram.com/trukflow_?igsh=MWhnMjkyZHhmajI4bg%3D%3D&utm_source=qr", Icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/trukflow/", Icon: Linkedin },
  { label: "TikTok", href: "https://www.tiktok.com/@trukflow?_r=1&_t=ZS-956KJF8k08e", Icon: TikTokIcon },
];

const linkClass = "text-sm text-ink-300 transition-colors hover:text-white";

const SiteFooter = () => (
  <footer id="contact" className="relative overflow-hidden border-t border-ink-700 bg-ink-950 text-ink-200">
    <div className="site-container py-16 md:py-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo className="-ml-2 h-20" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-300">
            TRUKFLOW builds the logistics infrastructure that moves Africa's goods: smart lockers, cold storage
            and collection networks.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 text-ink-300 transition-colors hover:border-white/30 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400">Products</h3>
            <ul className="mt-4 space-y-3">
              {products.map((product) => (
                <li key={product.id}>
                  {product.external ? (
                    <a href={product.href} className={linkClass}>
                      {product.name}
                    </a>
                  ) : (
                    <Link to={product.href} className={linkClass}>
                      {product.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400">Drivers</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/hire-drivers" className={linkClass}>Hire Drivers</Link></li>
              <li><Link to="/drivers-job-board" className={linkClass}>Job Board</Link></li>
              <li><Link to="/company-auth" className={linkClass}>Recruiter Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400">Company</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/about" className={linkClass}>About Us</Link></li>
              <li><Link to="/#faqs" className={linkClass}>FAQs</Link></li>
              <li><Link to="/terms-conditions" className={linkClass}>Terms</Link></li>
              <li><Link to="/privacy-policy" className={linkClass}>Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400">Get in touch</h3>
          <ul className="mt-4 space-y-4 text-sm text-ink-300">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-flame-400" />
              <address className="not-italic leading-relaxed">
                Office Suite 615, Suraj Plaza
                <br />
                Limuru Road, Nairobi
                <br />
                P.O. Box 7248, 40100
              </address>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-flame-400" />
              <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-white">{SUPPORT_EMAIL}</a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-flame-400" />
              <a href={`tel:${SUPPORT_PHONE}`} className="hover:text-white">{SUPPORT_PHONE_DISPLAY}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-3 border-t border-ink-700 pt-8 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} TRUKFLOW. All rights reserved.</p>
        <p>
          Developed by{" "}
          <a
            href="https://mglobalbusinessconsultancy.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-200 hover:text-white"
          >
            M'Global Business Consultancy
          </a>
        </p>
      </div>
    </div>

    {/* Oversized wordmark */}
    <div
      aria-hidden
      className="pointer-events-none select-none px-4 pb-4 text-center whitespace-nowrap text-[17vw] font-semibold leading-[0.8] tracking-[-0.06em] text-white/[0.03]"
    >
      TRUKFLOW
    </div>
  </footer>
);

export default SiteFooter;

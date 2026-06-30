import { ChevronUp } from "lucide-react";
// Import your social icons here, e.g. from react-icons:
// import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";
import {
  Facebook,
  Instagram,
  TikTok,
  X as XBrand,
  Youtube,
  GoDaddy,
} from "./SocialIcons.jsx"; // <-- replace this import with whatever icon source you use

const columns = [
  {
    title: "About GoDaddy",
    links: [
      "About Us",
      "Careers",
      "Contact Us",
      "GoDaddy Blog",
      "Investor Relations",
      "Legal",
      "Trust Center",
    ],
  },
  {
    title: "Support",
    links: [
      "Product Support",
      "Report Abuse",
      "Resources",
      "Domain Registration Data Disclosure Policy",
    ],
  },
  {
    title: "Resources",
    links: [
      "Webmail",
      "WHOIS",
      "ICANN Confirmation",
      "Designers & Developers",
      "Corporate Domains",
      "Redeem Code",
      "Product Catalog",
      "Business Name Generator",
    ],
  },
  {
    title: "Partner Programs",
    links: ["Affiliates", "Reseller Programs", "GoDaddy Pro"],
  },
  {
    title: "Account",
    links: ["Sign In to GoDaddy", "Renewals & Billing", "Create Account"],
  },
  {
    title: "Shopping",
    links: [
      "Buy a Domain",
      "gTLD Domain Extensions",
      "Websites",
      "Business Email",
      "WordPress",
      "Hosting",
      "Web Security",
      "Logo Maker",
      "Phone Numbers",
    ],
  },
];

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-gray-400 hover:text-white hover:underline text-sm transition-colors"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {columns.map((col) => (
            <FooterColumn key={col.title} {...col} />
          ))}
        </div>

        {/* Logo / locale / social row */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between mt-16 gap-6">
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-2 text-white">
              <GoDaddy className="w-10 h-10" />
              <span className="font-bold text-2xl +">GoDaddy</span>
              <span className="text-xs align-top">™</span>
            </a>

            <button className="flex items-center gap-1 text-sm text-gray-300 hover:text-white">
              Philippines - English
              <ChevronUp className="w-4 h-4" />
            </button>

            <button className="flex items-center gap-1 text-sm text-gray-300 hover:text-white">
              USD $
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="#"
              aria-label="Facebook"
              className="text-white hover:text-gray-300"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-white hover:text-gray-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="text-white hover:text-gray-300"
            >
              <TikTok className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="X"
              className="text-white hover:text-gray-300"
            >
              <XBrand className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="text-white hover:text-gray-300"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row lg:items-start justify-between gap-4 text-xs text-white">
          <p className="max-w-6xl leading-relaxed">
            Copyright &copy; 1999 - 2026 GoDaddy Operating Company, LLC. All
            Rights Reserved. The GoDaddy word mark is a registered trademark of
            GoDaddy Operating Company, LLC in <br />
            the US and other countries. The “GO” logo is a registered trademark
            of GoDaddy.com, LLC in the US.{" "}
          </p>

          <div className="flex flex-wrap items-center gap-10 shrink-0">
            <a href="#" className="hover:text-gray-300">
              Legal
            </a>
            <a href="#" className="hover:text-gray-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-300">
              Cookies
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-2 pb-8 flex flex-col lg:flex-row lg:items-start justify-between gap-4 text-xs text-white">
          <p className="max-w-3xl leading-relaxed">
            Use of this Site is subject to express terms of use. By using this
            site, you signify that you agree to be bound by these{" "}
            <a
              href="#"
              className="text-gray-600 hover:underline hover:text-blue-300"
            >
              Universal Terms of Service.
            </a>
          </p>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <span>Do not sell my personal information</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

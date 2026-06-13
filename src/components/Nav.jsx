import { useState } from "react";

const NAV_LINKS = [
  {
    id: 1,
    label: "Domains",
    hasDropdown: true,
    dropdownItems: [
      "Search Domains",
      "Domain Transfer",
      "Domain Auctions",
      "Bulk Domains",
    ],
  },
  {
    id: 2,
    label: "Websites",
    hasDropdown: true,
    dropdownItems: [
      "Website Builder",
      "WordPress",
      "Online Store",
      "Landing Pages",
    ],
  },
  { id: 3, label: "Email", hasDropdown: false },
  {
    id: 4,
    label: "Hosting",
    hasDropdown: true,
    dropdownItems: [
      "Web Hosting",
      "WordPress Hosting",
      "VPS Hosting",
      "Dedicated Servers",
    ],
  },
  {
    id: 5,
    label: "Marketing",
    hasDropdown: true,
    dropdownItems: [
      "SEO Tools",
      "Social Media",
      "Online Ads",
      "Local Business",
    ],
  },
  {
    id: 6,
    label: "Security",
    hasDropdown: true,
    dropdownItems: [
      "SSL Certificates",
      "Website Backup",
      "SiteLock",
      "Email Security",
    ],
  },
  { id: 7, label: "Airo AI Builder", hasDropdown: false },
  { id: 8, label: "Pricing", hasDropdown: false },
];

const RIGHT_LINKS = [
  { id: "r1", label: "Deals", hasDropdown: false },
  { id: "r2", label: "Contact Us", hasDropdown: false },
  { id: "r3", label: "Help", hasDropdown: false },
  {
    id: "r4",
    label: "Sign In",
    hasDropdown: true,
    panel: {
      sections: [
        {
          title: "Account",
          items: [
            { label: "My Account", desc: "Manage your profile and settings" },
            { label: "My Domains", desc: "View and manage your domains" },
            { label: "My Products", desc: "Access all your purchases" },
            { label: "My Renewals", desc: "Manage upcoming renewals" },
          ],
        },
        {
          title: "Quick Access",
          items: [
            { label: "My Workspace Email", desc: "Open your inbox" },
            { label: "My Website", desc: "Edit or preview your site" },
            { label: "My SSL", desc: "Manage certificates" },
            { label: "Create Account", desc: "New to GoDaddy?" },
          ],
        },
      ],
    },
  },
];

const ChevronIcon = ({ flipped }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 12 12"
    fill="none"
    style={{
      transition: "transform 0.22s ease",
      transform: flipped ? "rotate(180deg)" : "rotate(0deg)",
      flexShrink: 0,
      marginLeft: "1px",
    }}
  >
    <path
      d="M2 4L6 8L10 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CartIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

function NavButton({ label, isActive, hasDropdown, onClick, small = false }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1 rounded-md border-none cursor-pointer
        tracking-wide whitespace-nowrap transition-colors duration-150
        ${small ? "py-1.5 px-2.5 text-xs" : "py-1.5 px-3 text-[13.5px]"}
        ${
          isActive
            ? "bg-white text-neutral-900 font-semibold"
            : "bg-transparent text-white font-normal hover:bg-white/10"
        }
      `}
    >
      {label}
      {hasDropdown && <ChevronIcon flipped={isActive} />}
    </button>
  );
}

function CartButton({ count = 0 }) {
  return (
    <button className="relative flex items-center justify-center py-1.5 px-2 ml-0.5 rounded-md border-none cursor-pointer text-white bg-transparent hover:bg-white/10 transition-colors duration-150">
      <CartIcon />
      {count > 0 && (
        <span
          className="absolute top-0.5 right-0.5 flex items-center justify-center w-3.5 h-3.5 rounded-full text-white font-bold"
          style={{ fontSize: "9px", background: "#00b373", lineHeight: 1 }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function PanelPill({ label }) {
  return (
    <button className="py-1.5 px-3.5 rounded-md text-[13px] font-medium text-neutral-900 bg-white cursor-pointer border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-100 transition-colors duration-150">
      {label}
    </button>
  );
}

function RightPanelItem({ label, desc }) {
  return (
    <button className="flex flex-col items-start w-full px-3 py-2.5 rounded-lg border-none bg-transparent text-left cursor-pointer hover:bg-neutral-100 transition-colors duration-150">
      <span className="text-[13.5px] font-semibold text-neutral-900">
        {label}
      </span>
      <span className="text-[11.5px] text-neutral-400 mt-0.5">{desc}</span>
    </button>
  );
}

export default function Navbar() {
  const [activeLeft, setActiveLeft] = useState(null);
  const [activeRight, setActiveRight] = useState(null);

  const handleLeft = (link) => {
    setActiveRight(null);
    if (!link.hasDropdown) {
      setActiveLeft(null);
      return;
    }
    setActiveLeft(activeLeft === link.id ? null : link.id);
  };

  const handleRight = (link) => {
    setActiveLeft(null);
    if (!link.hasDropdown) {
      setActiveRight(null);
      return;
    }
    setActiveRight(activeRight === link.id ? null : link.id);
  };

  const activeLeftLink = NAV_LINKS.find((l) => l.id === activeLeft);
  const activeRightLink = RIGHT_LINKS.find((l) => l.id === activeRight);
  const anyOpen = activeLeft || activeRight;

  return (
    <div className="relative font-sans">
      {/* ── NAVBAR ── */}
      <nav className="flex items-center justify-evenly h-[60px] px-12 bg-neutral-900 relative z-20">
        {/* Logo image goes here */}
        <div className="flex items-center gap-2 shrink-0 mr-3">
          <span className="text-white font-bold text-xl tracking-tight whitespace-nowrap">
            GoDaddy
          </span>
        </div>

        {/* 8 left nav links */}
        <div className="flex items-center gap-3">
          {NAV_LINKS.map((link) => (
            <NavButton
              key={link.id}
              label={link.label}
              isActive={activeLeft === link.id}
              hasDropdown={link.hasDropdown}
              onClick={() => handleLeft(link)}
            />
          ))}
        </div>

        {/* Right group — 4 links + cart */}
        <div className="flex items-center gap-px shrink-0">
          {RIGHT_LINKS.map((link) => (
            <NavButton
              key={link.id}
              label={link.label}
              isActive={activeRight === link.id}
              hasDropdown={link.hasDropdown}
              onClick={() => handleRight(link)}
              small
            />
          ))}
          <CartButton count={0} />
        </div>
      </nav>

      {/* ── LEFT DROPDOWN PANEL ── */}
      <div
        className="bg-white relative z-[15] border-neutral-200 transition-all duration-[280ms]"
        style={{
          overflow: "hidden",
          maxHeight: activeLeft ? "180px" : "0px",
          borderBottom: activeLeft ? "1px solid #e8e8e8" : "none",
          boxShadow: activeLeft ? "0 6px 20px rgba(0,0,0,0.07)" : "none",
          transition: "max-height 0.28s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {activeLeftLink && (
          <div className="px-8 pt-5 pb-6">
            <p className="text-[10.5px] font-bold uppercase tracking-widest text-neutral-400 mb-2.5">
              {activeLeftLink.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {activeLeftLink.dropdownItems.map((item) => (
                <PanelPill key={item} label={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT DROPDOWN PANEL (Sign In) ── */}
      <div
        className="absolute top-[52px] bg-white z-[15] rounded-b-xl border-neutral-200"
        style={{
          right: "56px",
          left: "52%",
          overflow: "hidden",
          maxHeight: activeRight ? "260px" : "0px",
          transition: "max-height 0.28s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: activeRight ? "0 8px 28px rgba(0,0,0,0.11)" : "none",
          border: activeRight ? "1px solid #e8e8e8" : "none",
          borderTop: "none",
        }}
      >
        {activeRightLink?.panel && (
          <div className="flex gap-2 px-5 pt-[18px] pb-[22px]">
            {activeRightLink.panel.sections.map((section) => (
              <div key={section.title} className="flex-1">
                <p className="text-[10.5px] font-bold uppercase tracking-widest text-neutral-400 mb-2 ml-2">
                  {section.title}
                </p>
                <div className="flex flex-col gap-0.5">
                  {section.items.map((item) => (
                    <RightPanelItem
                      key={item.label}
                      label={item.label}
                      desc={item.desc}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Click-outside overlay */}
      {anyOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setActiveLeft(null);
            setActiveRight(null);
          }}
        />
      )}
    </div>
  );
}

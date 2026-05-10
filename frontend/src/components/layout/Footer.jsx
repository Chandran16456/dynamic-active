import { Link } from "react-router-dom";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M14.2 8.8V6.9c0-.55.42-.9.98-.9h2.42V2.5h-3.22c-3.2 0-4.88 1.9-4.88 4.75V8.8H6.7v3.65h2.8V21.5h4.05v-9.05h3.03l.57-3.65H14.2Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="2.3"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="2.3"
      />
      <circle cx="17.4" cy="6.6" r="1.35" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M6.7 8.9H3.2V21h3.5V8.9ZM4.95 3C3.85 3 3 3.82 3 4.85S3.85 6.7 4.95 6.7 6.9 5.88 6.9 4.85 6.05 3 4.95 3ZM21 14.1c0-3.35-1.8-5.5-4.6-5.5-1.65 0-2.72.9-3.25 1.75V8.9H9.8V21h3.55v-6.15c0-1.65.8-2.55 2.15-2.55 1.3 0 2.05.9 2.05 2.65V21H21v-6.9Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M14.7 10.35 21.6 3h-2.2l-5.65 6.02L9.25 3H3l7.25 9.68L3 21h2.2l6.05-6.55L16.1 21h6.25l-7.65-10.65Zm-2.15 2.35-.9-1.18L5.85 4.75h2.3l4.55 5.98.9 1.18 6.05 7.34h-2.3l-4.8-6.55Z" />
    </svg>
  );
}

function DynamicActiveFooterLogo() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-3 rounded-2xl transition hover:opacity-80"
      aria-label="Go to Dynamic Active home page"
    >
      <svg
        width="52"
        height="35"
        viewBox="0 0 52 34.904"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-9 w-auto shrink-0"
      >
        <path
          d="M 33.385 17.096 C 33.385 25.947 26.209 33.123 17.358 33.123 C 8.506 33.123 1.331 25.947 1.331 17.096 C 1.331 8.244 8.505 1.068 17.358 1.068 C 26.209 1.068 33.385 8.244 33.385 17.096 Z"
          fill="rgb(252, 54, 45)"
        />
        <path
          d="M 50.669 17.096 C 50.669 25.947 43.564 33.123 34.799 33.123 C 26.034 33.123 18.929 25.947 18.929 17.096 C 18.929 8.244 26.033 1.068 34.799 1.068 C 43.563 1.068 50.669 8.244 50.669 17.096 Z"
          fill="rgba(252, 54, 45, 0.74)"
        />
        <path
          d="M 26.121 30.518 C 30.495 27.655 33.385 22.713 33.385 17.096 C 33.385 11.478 30.496 6.536 26.121 3.675 C 21.62 6.655 18.917 11.697 18.929 17.096 C 18.917 22.495 21.619 27.538 26.121 30.518 Z"
          fill="rgba(54, 74, 255, 0.2)"
        />
      </svg>

      <span className="text-3xl font-black tracking-tight text-slate-950">
        Dynamic Active
      </span>
    </Link>
  );
}

export default function Footer() {
  const socialLinks = [
    {
      label: "Facebook",
      href: "https://facebook.com",
      icon: FacebookIcon,
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: InstagramIcon,
    },
    {
      label: "Twitter/X",
      href: "https://x.com",
      icon: XIcon,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: LinkedInIcon,
    },
  ];

  return (
    <footer className="bg-transparent px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-white/70 p-8 shadow-xl ring-1 ring-white/60 backdrop-blur-md md:p-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <DynamicActiveFooterLogo />

            <p className="mt-6 max-w-md text-2xl font-black leading-snug text-slate-950">
              Learning isn’t one-size-fits-all. Neither should the platform
              behind it.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between border-b border-slate-200 py-5 transition hover:border-[#fc362d]"
                >
                  <div className="flex items-center gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-red-50 text-[#fc362d] transition group-hover:bg-[#fc362d] group-hover:text-white">
                      <Icon />
                    </div>

                    <span className="text-2xl font-black text-slate-950 transition group-hover:text-[#fc362d]">
                      {item.label}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-5 border-t border-slate-200 pt-6 text-sm font-medium text-slate-700 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <p>© 2025 Dynamic Active INC.</p>

            <span className="hidden h-5 w-px bg-slate-300 sm:block" />

            <Link to="/privacy-policy" className="hover:text-[#fc362d]">
              Privacy Policy
            </Link>

            <span className="hidden h-5 w-px bg-slate-300 sm:block" />

            <Link to="/terms" className="hover:text-[#fc362d]">
              Terms & Conditions
            </Link>
          </div>

          <p>
            Made with <span className="text-[#fc362d]">♥</span> in the USA
          </p>
        </div>
      </div>
    </footer>
  );
}

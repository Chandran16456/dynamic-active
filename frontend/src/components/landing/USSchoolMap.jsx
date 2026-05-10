import { useState } from "react";
import { School, MapPin, Building2 } from "lucide-react";

const schoolData = [
  {
    code: "CA",
    name: "California",
    count: "10.3K+",
    x: 105,
    y: 305,
    schools: ["Los Angeles Unified", "San Diego Unified", "Fresno Unified"],
  },
  {
    code: "TX",
    name: "Texas",
    count: "9.1K+",
    x: 390,
    y: 415,
    schools: ["Houston ISD", "Dallas ISD", "Austin ISD"],
  },
  {
    code: "NY",
    name: "New York",
    count: "4.8K+",
    x: 745,
    y: 185,
    schools: ["NYC Public Schools", "Buffalo Public Schools", "Rochester City SD"],
  },
  {
    code: "FL",
    name: "Florida",
    count: "4.3K+",
    x: 680,
    y: 455,
    schools: [
      "Miami-Dade County Public Schools",
      "Orange County Public Schools",
      "Broward County Public Schools",
    ],
  },
  {
    code: "IL",
    name: "Illinois",
    count: "4.0K+",
    x: 545,
    y: 260,
    schools: ["Chicago Public Schools", "Naperville CUSD", "Rockford Public Schools"],
  },
  {
    code: "PA",
    name: "Pennsylvania",
    count: "3.1K+",
    x: 695,
    y: 230,
    schools: [
      "School District of Philadelphia",
      "Pittsburgh Public Schools",
      "Allentown SD",
    ],
  },
  {
    code: "OH",
    name: "Ohio",
    count: "3.5K+",
    x: 630,
    y: 270,
    schools: ["Columbus City Schools", "Cleveland MSD", "Cincinnati Public Schools"],
  },
  {
    code: "GA",
    name: "Georgia",
    count: "2.4K+",
    x: 625,
    y: 385,
    schools: ["Atlanta Public Schools", "Gwinnett County Schools", "Cobb County Schools"],
  },
  {
    code: "NC",
    name: "North Carolina",
    count: "2.6K+",
    x: 705,
    y: 335,
    schools: [
      "Wake County Schools",
      "Charlotte-Mecklenburg Schools",
      "Guilford County Schools",
    ],
  },
  {
    code: "MI",
    name: "Michigan",
    count: "3.0K+",
    x: 585,
    y: 190,
    schools: ["Detroit Public Schools", "Grand Rapids Public Schools", "Ann Arbor Public Schools"],
  },
];

export default function USSchoolMap() {
  const [activeState, setActiveState] = useState(schoolData[0]);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-red-100 bg-white/95 p-5 shadow-xl">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
            K–12 Coverage Map
          </p>

          <h3 className="text-2xl font-black text-slate-950">
            U.S. schools by state
          </h3>
        </div>

        <div className="rounded-full bg-red-50 px-4 py-2 text-sm font-black text-[#fc362d]">
          Hover markers
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative min-h-[315px] overflow-hidden rounded-[1.5rem] bg-slate-950 p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(252,54,45,0.20),transparent_65%)]" />

          <svg
            viewBox="0 0 900 560"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="United States map with K-12 school markers"
          >
            <defs>
              <filter id="mapGlow">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Main U.S. silhouette */}
            <path
              d="M92 234
              L124 188 L176 176 L220 153 L277 166 L321 143 L374 154
              L415 135 L468 152 L518 144 L565 164 L604 154 L657 183
              L720 194 L775 226 L802 266 L774 306 L730 316 L706 353
              L684 395 L708 452 L668 477 L614 425 L562 407 L504 421
              L446 395 L392 426 L331 407 L286 426 L232 392 L171 384
              L126 342 L88 325 L68 278 Z"
              fill="#1f2937"
              stroke="#fc362d"
              strokeWidth="5"
              filter="url(#mapGlow)"
            />

            {/* Western region lines */}
            <path
              d="M122 206 L164 254 L155 328 M188 178 L210 255 L207 382
              M255 165 L270 244 L262 411"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeDasharray="7 9"
              opacity="0.22"
            />

            {/* Central/eastern region lines */}
            <path
              d="M334 151 L345 260 L330 410
              M420 139 L424 260 L405 400
              M512 149 L505 280 L510 418
              M606 160 L592 285 L616 428
              M700 195 L665 310 L682 400"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeDasharray="7 9"
              opacity="0.22"
            />

            {/* Horizontal hint lines */}
            <path
              d="M98 250 C210 228 318 252 416 238 C548 220 640 240 775 258"
              fill="none"
              stroke="#fc362d"
              strokeWidth="2"
              strokeDasharray="10 12"
              opacity="0.55"
            />

            <path
              d="M120 325 C238 302 348 330 455 314 C570 298 642 318 725 330"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeDasharray="8 10"
              opacity="0.2"
            />

            {/* Alaska */}
            <path
              d="M80 455 L126 432 L168 446 L150 486 L92 500 Z"
              fill="#1f2937"
              stroke="#fc362d"
              strokeWidth="3"
              opacity="0.85"
            />

            {/* Hawaii */}
            <circle cx="230" cy="484" r="7" fill="#1f2937" stroke="#fc362d" strokeWidth="3" />
            <circle cx="255" cy="494" r="6" fill="#1f2937" stroke="#fc362d" strokeWidth="3" />
            <circle cx="282" cy="502" r="5" fill="#1f2937" stroke="#fc362d" strokeWidth="3" />

            {schoolData.map((item) => {
              const isActive = activeState.code === item.code;

              return (
                <g
                  key={item.code}
                  onMouseEnter={() => setActiveState(item)}
                  onClick={() => setActiveState(item)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={item.x}
                    cy={item.y}
                    r={isActive ? 28 : 24}
                    fill="#ffffff"
                    opacity="0.96"
                  />

                  <circle
                    cx={item.x}
                    cy={item.y}
                    r={isActive ? 22 : 18}
                    fill={isActive ? "#fc362d" : "#dc2626"}
                    stroke="#ffffff"
                    strokeWidth="3"
                  />

                  <foreignObject
                    x={item.x - 11}
                    y={item.y - 11}
                    width="22"
                    height="22"
                  >
                    <School className="h-[22px] w-[22px] text-white" />
                  </foreignObject>

                  <rect
                    x={item.x - 38}
                    y={item.y + 29}
                    width="76"
                    height="23"
                    rx="11"
                    fill="#ffffff"
                  />

                  <text
                    x={item.x}
                    y={item.y + 45}
                    textAnchor="middle"
                    style={{
                      fill: "#fc362d",
                      fontSize: "12px",
                      fontWeight: 900,
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    {item.code} · {item.count}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-4 left-4 rounded-2xl bg-black/60 px-4 py-3 text-white backdrop-blur">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#fc362d]" />
              <p className="text-xs font-black uppercase tracking-wide">
                Interactive U.S. school map
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] bg-red-50 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white">
              <Building2 className="h-6 w-6 text-[#fc362d]" />
            </div>

            <div>
              <p className="text-sm font-black text-[#fc362d]">
                {activeState.name}
              </p>

              <h4 className="text-3xl font-black text-slate-950">
                {activeState.count}
              </h4>
            </div>
          </div>

          <p className="text-sm font-bold text-slate-600">
            Example K–12 districts / schools:
          </p>

          <div className="mt-4 space-y-3">
            {activeState.schools.map((school) => (
              <div
                key={school}
                className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm"
              >
                <School className="h-5 w-5 text-[#fc362d]" />

                <p className="text-sm font-bold text-slate-800">{school}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl bg-white p-4">
            <p className="text-sm font-black text-slate-950">
              Prototype behavior
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Hover or click each school marker to preview school counts and
              sample districts for that state.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs font-semibold text-slate-400">
        Demo data shown for prototype presentation. Replace with verified school
        directory data before production use.
      </p>
    </div>
  );
}

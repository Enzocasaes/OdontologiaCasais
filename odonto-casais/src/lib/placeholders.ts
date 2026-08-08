type IllustrationMode = "clinic" | "portrait" | "comparison";

type IllustrationOptions = {
  title: string;
  subtitle: string;
  accent?: string;
  tone?: string;
  mode?: IllustrationMode;
  initials?: string;
  leftLabel?: string;
  rightLabel?: string;
};

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function createIllustration({
  title,
  subtitle,
  accent = "#b7afaa",
  tone = "#202225",
  mode = "clinic",
  initials = "OC",
  leftLabel = "Antes",
  rightLabel = "Depois",
}: IllustrationOptions) {
  const safeTitle = escapeXml(title);
  const safeSubtitle = escapeXml(subtitle);
  const safeInitials = escapeXml(initials);
  const safeLeftLabel = escapeXml(leftLabel);
  const safeRightLabel = escapeXml(rightLabel);

  const clinicScene = `
    <rect width="1200" height="900" rx="48" fill="url(#bg)" />
    <circle cx="930" cy="130" r="180" fill="rgba(255,255,255,0.08)" />
    <circle cx="980" cy="160" r="90" fill="rgba(255,255,255,0.06)" />
    <rect x="110" y="520" width="980" height="200" rx="38" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
    <rect x="150" y="345" width="250" height="145" rx="36" fill="rgba(255,255,255,0.08)" />
    <rect x="160" y="485" width="210" height="30" rx="15" fill="${accent}" opacity="0.95" />
    <rect x="190" y="225" width="175" height="115" rx="50" fill="rgba(255,255,255,0.08)" />
    <rect x="475" y="260" width="260" height="330" rx="56" fill="rgba(255,255,255,0.07)" />
    <rect x="530" y="325" width="148" height="138" rx="42" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.12)" />
    <rect x="570" y="610" width="180" height="58" rx="29" fill="${accent}" opacity="0.72" />
    <path d="M740 286h220" stroke="rgba(255,255,255,0.18)" stroke-width="14" stroke-linecap="round" />
    <path d="M732 338c78 38 165 36 252-7" stroke="rgba(255,255,255,0.12)" stroke-width="12" stroke-linecap="round" fill="none" />
  `;

  const portraitScene = `
    <rect width="1200" height="900" rx="48" fill="url(#bg)" />
    <circle cx="600" cy="365" r="190" fill="rgba(255,255,255,0.12)" />
    <circle cx="600" cy="325" r="122" fill="rgba(255,255,255,0.08)" />
    <path d="M502 606c32-96 65-144 98-144s67 48 98 144" fill="rgba(255,255,255,0.12)" />
    <path d="M544 380c28 24 84 24 112 0" stroke="${accent}" stroke-width="14" stroke-linecap="round" fill="none" />
    <rect x="308" y="638" width="584" height="112" rx="56" fill="rgba(255,255,255,0.08)" />
    <rect x="346" y="656" width="508" height="76" rx="38" fill="rgba(255,255,255,0.06)" />
  `;

  const comparisonScene = `
    <rect width="1200" height="900" rx="48" fill="url(#bg)" />
    <rect x="90" y="120" width="500" height="620" rx="40" fill="rgba(255,255,255,0.07)" />
    <rect x="610" y="120" width="500" height="620" rx="40" fill="rgba(255,255,255,0.13)" />
    <rect x="90" y="120" width="500" height="620" rx="40" fill="url(#before)" opacity="0.35" />
    <rect x="610" y="120" width="500" height="620" rx="40" fill="url(#after)" opacity="0.45" />
    <path d="M600 120v620" stroke="rgba(255,255,255,0.18)" stroke-width="8" stroke-dasharray="20 18" />
    <rect x="140" y="168" width="128" height="42" rx="21" fill="rgba(255,255,255,0.16)" />
    <rect x="660" y="168" width="138" height="42" rx="21" fill="${accent}" opacity="0.88" />
    <path d="M165 456c86-88 180-120 284-98" stroke="rgba(255,255,255,0.17)" stroke-width="16" stroke-linecap="round" fill="none" />
    <path d="M698 460c76-72 162-102 256-84" stroke="rgba(255,255,255,0.2)" stroke-width="16" stroke-linecap="round" fill="none" />
    <circle cx="360" cy="390" r="84" fill="rgba(255,255,255,0.1)" />
    <circle cx="880" cy="390" r="84" fill="rgba(255,255,255,0.13)" />
  `;

  const body =
    mode === "portrait"
      ? portraitScene
      : mode === "comparison"
        ? comparisonScene
        : clinicScene;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" role="img" aria-label="${safeTitle}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${tone}" />
          <stop offset="100%" stop-color="#0e0f11" />
        </linearGradient>
        <linearGradient id="before" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#5b606c" />
          <stop offset="100%" stop-color="#32343a" />
        </linearGradient>
        <linearGradient id="after" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#bab2ad" />
          <stop offset="100%" stop-color="#7c7067" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="22" stdDeviation="22" flood-color="#000" flood-opacity="0.3" />
        </filter>
      </defs>
      ${body}
      <text x="88" y="790" fill="#fff" font-family="Arial, sans-serif" font-size="48" font-weight="700">${safeTitle}</text>
      <text x="88" y="842" fill="rgba(255,255,255,0.76)" font-family="Arial, sans-serif" font-size="24">${safeSubtitle}</text>
      ${mode === "comparison" ? `
        <text x="165" y="199" fill="#fff" font-family="Arial, sans-serif" font-size="26" font-weight="700">${safeLeftLabel}</text>
        <text x="706" y="199" fill="#1a1b1f" font-family="Arial, sans-serif" font-size="26" font-weight="700">${safeRightLabel}</text>
      ` : ""}
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

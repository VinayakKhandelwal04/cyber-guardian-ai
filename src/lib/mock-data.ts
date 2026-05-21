export type Report = {
  id: string;
  type: "Phishing" | "Online Scam" | "Fake Website" | "Identity Theft" | "Social Media Fraud";
  title: string;
  region: string;
  date: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "Open" | "Investigating" | "Resolved";
};

export const reports: Report[] = [
  { id: "RPT-2041", type: "Phishing", title: "Fake bank OTP verification SMS", region: "Mumbai, IN", date: "2h ago", severity: "high", status: "Investigating" },
  { id: "RPT-2040", type: "Online Scam", title: "Crypto investment Telegram group", region: "Lagos, NG", date: "5h ago", severity: "critical", status: "Open" },
  { id: "RPT-2039", type: "Fake Website", title: "Counterfeit electronics storefront", region: "Berlin, DE", date: "8h ago", severity: "medium", status: "Open" },
  { id: "RPT-2038", type: "Identity Theft", title: "Stolen passport used for KYC", region: "São Paulo, BR", date: "1d ago", severity: "critical", status: "Investigating" },
  { id: "RPT-2037", type: "Social Media Fraud", title: "Celebrity impersonation giveaway", region: "Los Angeles, US", date: "1d ago", severity: "low", status: "Resolved" },
  { id: "RPT-2036", type: "Phishing", title: "Microsoft 365 credential harvest", region: "London, UK", date: "2d ago", severity: "high", status: "Investigating" },
  { id: "RPT-2035", type: "Online Scam", title: "Romance scam — wire transfer", region: "Sydney, AU", date: "2d ago", severity: "medium", status: "Open" },
  { id: "RPT-2034", type: "Fake Website", title: "Phony airline refund portal", region: "Tokyo, JP", date: "3d ago", severity: "high", status: "Resolved" },
];

export const threatTrend = [
  { day: "Mon", phishing: 42, scam: 28, fake: 12, identity: 6 },
  { day: "Tue", phishing: 55, scam: 31, fake: 18, identity: 9 },
  { day: "Wed", phishing: 48, scam: 40, fake: 22, identity: 7 },
  { day: "Thu", phishing: 67, scam: 36, fake: 16, identity: 11 },
  { day: "Fri", phishing: 73, scam: 44, fake: 25, identity: 14 },
  { day: "Sat", phishing: 61, scam: 52, fake: 28, identity: 10 },
  { day: "Sun", phishing: 58, scam: 47, fake: 21, identity: 12 },
];

export const scamMix = [
  { name: "Phishing", value: 38 },
  { name: "Online Scam", value: 27 },
  { name: "Fake Website", value: 15 },
  { name: "Identity Theft", value: 12 },
  { name: "Social Media", value: 8 },
];

export type Hotspot = { city: string; x: number; y: number; count: number; severity: "critical" | "high" | "medium" | "low" };
export const hotspots: Hotspot[] = [
  { city: "Los Angeles", x: 15, y: 42, count: 312, severity: "high" },
  { city: "New York", x: 27, y: 38, count: 487, severity: "critical" },
  { city: "São Paulo", x: 33, y: 68, count: 204, severity: "high" },
  { city: "London", x: 48, y: 32, count: 391, severity: "critical" },
  { city: "Berlin", x: 52, y: 34, count: 178, severity: "medium" },
  { city: "Lagos", x: 50, y: 58, count: 256, severity: "high" },
  { city: "Mumbai", x: 65, y: 52, count: 542, severity: "critical" },
  { city: "Singapore", x: 75, y: 60, count: 188, severity: "medium" },
  { city: "Tokyo", x: 85, y: 42, count: 221, severity: "medium" },
  { city: "Sydney", x: 88, y: 76, count: 134, severity: "low" },
];

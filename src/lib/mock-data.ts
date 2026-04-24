export type PropertyStatus = "For Sale" | "Sold" | "Pending";
export type LeadStatus = "New" | "Contacted" | "Qualified";
export type DealStage = "New Lead" | "Property Visit" | "Negotiation" | "Contract" | "Closed";

export interface Property {
  id: string;
  title: string;
  image: string;
  price: number;
  address: string;
  city: string;
  type: "House" | "Apartment" | "Condo" | "Villa" | "Townhouse";
  beds: number;
  baths: number;
  sqft: number;
  status: PropertyStatus;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  budget: number;
  interestedIn: string;
  status: LeadStatus;
  hot?: boolean;
}

export interface Client {
  id: string;
  name: string;
  avatar: string;
  type: "Buying" | "Selling";
  budgetMin: number;
  budgetMax: number;
  city: string;
  notes: string;
  timeline: { date: string; text: string }[];
  savedProperties: string[];
}

export interface Deal {
  id: string;
  client: string;
  property: string;
  value: number;
  stage: DealStage;
}

export interface CalendarEvent {
  id: string;
  date: string; // ISO yyyy-mm-dd
  title: string;
  type: "Visit" | "Meeting" | "Deadline";
  time: string;
}

export interface Campaign {
  id: string;
  name: string;
  sent: number;
  openRate: number;
  clickRate: number;
  status: "Active" | "Draft" | "Completed";
}

const img = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const propertyImages = [
  img("photo-1568605114967-8130f3a36994"),
  img("photo-1564013799919-ab600027ffc6"),
  img("photo-1570129477492-45c003edd2be"),
  img("photo-1600596542815-ffad4c1539a9"),
  img("photo-1512917774080-9991f1c4c750"),
  img("photo-1613490493576-7fde63acd811"),
  img("photo-1580587771525-78b9dba3b914"),
  img("photo-1600585154340-be6161a56a0c"),
  img("photo-1502672260266-1c1ef2d93688"),
  img("photo-1600566753190-17f0baa2a6c3"),
  img("photo-1600607687939-ce8a6c25118c"),
  img("photo-1600047509807-ba8f99d2cdde"),
];

export const heroLoginImage = img("photo-1600585154340-be6161a56a0c", 1400, 1800);

export const initialProperties: Property[] = [
  { id: "p1", title: "Hillview Villa, Gandhi Nagar", image: propertyImages[0], price: 18500000, address: "12 Gandhi Nagar Main Rd", city: "Gandhi Nagar", type: "Villa", beds: 5, baths: 4, sqft: 4200, status: "For Sale" },
  { id: "p2", title: "Cowl Bazaar Apartment", image: propertyImages[1], price: 6800000, address: "508 Cowl Bazaar Rd #14B", city: "Cowl Bazaar", type: "Apartment", beds: 2, baths: 2, sqft: 1450, status: "For Sale" },
  { id: "p3", title: "Family Home, Brucepet", image: propertyImages[2], price: 5400000, address: "27 Brucepet Cross", city: "Brucepet", type: "House", beds: 4, baths: 3, sqft: 2600, status: "Pending" },
  { id: "p4", title: "Modern Retreat, Moka Road", image: propertyImages[3], price: 22500000, address: "9 Moka Road", city: "Moka Road", type: "Villa", beds: 6, baths: 5, sqft: 5100, status: "For Sale" },
  { id: "p5", title: "Skyline Condo, Parvathi Nagar", image: propertyImages[4], price: 32000000, address: "1 Parvathi Tower #54", city: "Parvathi Nagar", type: "Condo", beds: 3, baths: 3, sqft: 2900, status: "For Sale" },
  { id: "p6", title: "Townhouse, Allipuram", image: propertyImages[5], price: 7200000, address: "84 Allipuram Layout", city: "Allipuram", type: "Townhouse", beds: 3, baths: 2, sqft: 1900, status: "Sold" },
  { id: "p7", title: "Garden Flat, Hospet Road", image: propertyImages[6], price: 4100000, address: "330 Hospet Rd", city: "Hospet Road", type: "Apartment", beds: 2, baths: 1, sqft: 1100, status: "For Sale" },
  { id: "p8", title: "Designer Bungalow, Sandur Road", image: propertyImages[7], price: 24500000, address: "12 Sandur Rd", city: "Sandur Road", type: "House", beds: 4, baths: 4, sqft: 3700, status: "For Sale" },
  { id: "p9", title: "Loft, Cantonment", image: propertyImages[8], price: 8950000, address: "44 Cantonment Rd", city: "Cantonment", type: "Apartment", beds: 2, baths: 2, sqft: 1800, status: "Pending" },
];

export const initialLeads: Lead[] = [
  { id: "l1", name: "Sahana Reddy", email: "sahana.reddy@mail.com", phone: "+91 98450 14201", budget: 18000000, interestedIn: "Villa, Gandhi Nagar", status: "Qualified", hot: true },
  { id: "l2", name: "Manoj Kulkarni", email: "manoj.k@mail.com", phone: "+91 98860 18802", budget: 7500000, interestedIn: "Apartment, Cowl Bazaar", status: "Contacted" },
  { id: "l3", name: "Priya Patel", email: "priya.p@mail.com", phone: "+91 90080 51999", budget: 5400000, interestedIn: "House, Brucepet", status: "New" },
  { id: "l4", name: "Vinay Hegde", email: "vinay.h@mail.com", phone: "+91 99022 01230", budget: 21000000, interestedIn: "Bungalow, Sandur Road", status: "Qualified", hot: true },
  { id: "l5", name: "Aishwarya Rao", email: "aishwarya.r@mail.com", phone: "+91 97770 01773", budget: 8800000, interestedIn: "Loft, Cantonment", status: "Contacted" },
  { id: "l6", name: "Noah Kim", email: "noah.kim@mail.com", phone: "+91 96860 11666", budget: 29500000, interestedIn: "Condo, Parvathi Nagar", status: "New", hot: true },
  { id: "l7", name: "Olivia Brooks", email: "o.brooks@mail.com", phone: "+91 93050 14401", budget: 4600000, interestedIn: "Apartment, Hospet Road", status: "New" },
];

const avatar = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=200&h=200&q=80`;

export const initialClients: Client[] = [
  {
    id: "c1", name: "Ananya Reddy", avatar: avatar("photo-1494790108377-be9c29b29330"),
    type: "Buying", budgetMin: 12000000, budgetMax: 22000000, city: "Gandhi Nagar",
    notes: "Looking for villa near Gandhi Nagar with at least 4 beds. Open to renovations.",
    timeline: [
      { date: "Apr 18", text: "Toured Hillview Villa, Gandhi Nagar" },
      { date: "Apr 12", text: "Sent shortlist of 5 properties" },
      { date: "Apr 04", text: "Initial consultation call" },
    ],
    savedProperties: ["p1", "p4"],
  },
  {
    id: "c2", name: "Bharath Naik", avatar: avatar("photo-1500648767791-00dcc994a43e"),
    type: "Selling", budgetMin: 6000000, budgetMax: 7200000, city: "Allipuram",
    notes: "Selling family townhouse in Allipuram, prefers quick close.",
    timeline: [
      { date: "Apr 20", text: "Listing photoshoot completed" },
      { date: "Apr 14", text: "Signed listing agreement" },
    ],
    savedProperties: ["p6"],
  },
  {
    id: "c3", name: "Sushmita Iyer", avatar: avatar("photo-1438761681033-6461ffad8d80"),
    type: "Buying", budgetMin: 4000000, budgetMax: 5600000, city: "Brucepet",
    notes: "First-time buyer in Brucepet. Needs home-loan friendly listings.",
    timeline: [{ date: "Apr 22", text: "Pre-approval received" }],
    savedProperties: ["p3", "p7"],
  },
  {
    id: "c4", name: "Jayanth Murthy", avatar: avatar("photo-1472099645785-5658abf4ff4e"),
    type: "Buying", budgetMin: 20000000, budgetMax: 32000000, city: "Parvathi Nagar",
    notes: "Investor, focus on high-floor condos in Parvathi Nagar.",
    timeline: [{ date: "Apr 21", text: "Reviewed Skyline Condo" }],
    savedProperties: ["p5"],
  },
  {
    id: "c5", name: "Harini Shetty", avatar: avatar("photo-1544005313-94ddf0286df2"),
    type: "Selling", budgetMin: 7000000, budgetMax: 9000000, city: "Cantonment",
    notes: "Selling loft in Cantonment, flexible on timeline.",
    timeline: [{ date: "Apr 19", text: "Open house scheduled" }],
    savedProperties: ["p9"],
  },
  {
    id: "c6", name: "Ravi Singh", avatar: avatar("photo-1506794778202-cad84cf45f1d"),
    type: "Buying", budgetMin: 6000000, budgetMax: 8000000, city: "Brucepet",
    notes: "Prefers modern build near Brucepet, walking distance to market.",
    timeline: [{ date: "Apr 16", text: "Discovery call completed" }],
    savedProperties: ["p3"],
  },
];

export const initialDeals: Deal[] = [
  { id: "d1", client: "Sahana Reddy", property: "Hillview Villa, Gandhi Nagar", value: 18500000, stage: "Negotiation" },
  { id: "d2", client: "Manoj Kulkarni", property: "Cowl Bazaar Apartment", value: 6800000, stage: "Property Visit" },
  { id: "d3", client: "Priya Patel", property: "Family Home, Brucepet", value: 5400000, stage: "Contract" },
  { id: "d4", client: "Vinay Hegde", property: "Designer Bungalow, Sandur Road", value: 24500000, stage: "New Lead" },
  { id: "d5", client: "Noah Kim", property: "Skyline Condo, Parvathi Nagar", value: 32000000, stage: "Property Visit" },
  { id: "d6", client: "Aishwarya Rao", property: "Loft, Cantonment", value: 8950000, stage: "Negotiation" },
  { id: "d7", client: "Ananya Reddy", property: "Modern Retreat, Moka Road", value: 22500000, stage: "Closed" },
  { id: "d8", client: "Bharath Naik", property: "Townhouse, Allipuram", value: 7200000, stage: "Closed" },
  { id: "d9", client: "Olivia Brooks", property: "Garden Flat, Hospet Road", value: 4100000, stage: "New Lead" },
];

const today = new Date();
const iso = (offset: number) => {
  const d = new Date(today);
  d.setDate(today.getDate() + offset);
  return d.toISOString().slice(0, 10);
};

export const initialEvents: CalendarEvent[] = [
  { id: "e1", date: iso(0), title: "Visit — Hillview Villa, Gandhi Nagar", type: "Visit", time: "10:00 AM" },
  { id: "e2", date: iso(0), title: "Call with Sahana Reddy", type: "Meeting", time: "2:30 PM" },
  { id: "e3", date: iso(1), title: "Open House — Cantonment Loft", type: "Visit", time: "11:00 AM" },
  { id: "e4", date: iso(2), title: "Contract review — Patel", type: "Deadline", time: "4:00 PM" },
  { id: "e5", date: iso(3), title: "Photoshoot — Parvathi Nagar Condo", type: "Meeting", time: "9:00 AM" },
  { id: "e6", date: iso(5), title: "Closing — Moka Road Retreat", type: "Deadline", time: "1:00 PM" },
  { id: "e7", date: iso(7), title: "Visit — Sandur Road Bungalow", type: "Visit", time: "3:00 PM" },
  { id: "e8", date: iso(10), title: "Quarterly review", type: "Meeting", time: "10:00 AM" },
  { id: "e9", date: iso(-2), title: "Visit — Allipuram Townhouse", type: "Visit", time: "11:30 AM" },
];

export const campaigns: Campaign[] = [
  { id: "cm1", name: "Ballari Luxury Collection", sent: 12480, openRate: 42.6, clickRate: 8.4, status: "Active" },
  { id: "cm2", name: "First-Time Buyer Guide", sent: 8650, openRate: 38.1, clickRate: 6.9, status: "Active" },
  { id: "cm3", name: "Gandhi Nagar Premium Exclusive", sent: 4320, openRate: 51.2, clickRate: 12.7, status: "Completed" },
  { id: "cm4", name: "Investor Newsletter — May", sent: 0, openRate: 0, clickRate: 0, status: "Draft" },
];

export const landingPages = [
  { id: "lp1", title: "Hillview Villa Tour", visits: 4820, image: propertyImages[0] },
  { id: "lp2", title: "Parvathi Nagar Condo Reveal", visits: 7610, image: propertyImages[4] },
  { id: "lp3", title: "Moka Road Modern Retreat", visits: 3290, image: propertyImages[3] },
  { id: "lp4", title: "Sandur Road Bungalow", visits: 5140, image: propertyImages[7] },
];

export const socialPosts = [
  { id: "sp1", image: propertyImages[0], likes: 1284, platform: "Instagram" },
  { id: "sp2", image: propertyImages[4], likes: 2165, platform: "Instagram" },
  { id: "sp3", image: propertyImages[3], likes: 879, platform: "Facebook" },
  { id: "sp4", image: propertyImages[7], likes: 1542, platform: "Instagram" },
  { id: "sp5", image: propertyImages[1], likes: 632, platform: "Facebook" },
  { id: "sp6", image: propertyImages[2], likes: 1098, platform: "Instagram" },
  { id: "sp7", image: propertyImages[5], likes: 745, platform: "Facebook" },
  { id: "sp8", image: propertyImages[8], likes: 1320, platform: "Instagram" },
];

// Charts data
export const leadsOverTime = [
  { month: "Nov", leads: 28 },
  { month: "Dec", leads: 34 },
  { month: "Jan", leads: 41 },
  { month: "Feb", leads: 38 },
  { month: "Mar", leads: 52 },
  { month: "Apr", leads: 67 },
];

export const salesByType = [
  { type: "Villa", sales: 14 },
  { type: "House", sales: 22 },
  { type: "Condo", sales: 18 },
  { type: "Apartment", sales: 31 },
  { type: "Townhouse", sales: 9 },
];

export const listingsByCity = [
  { city: "Gandhi Nagar", value: 28 },
  { city: "Cowl Bazaar", value: 22 },
  { city: "Brucepet", value: 19 },
  { city: "Cantonment", value: 15 },
  { city: "Hospet Road", value: 11 },
];

export const revenueGrowth = [
  { month: "Nov", revenue: 1.2 },
  { month: "Dec", revenue: 1.8 },
  { month: "Jan", revenue: 2.1 },
  { month: "Feb", revenue: 1.9 },
  { month: "Mar", revenue: 2.7 },
  { month: "Apr", revenue: 3.4 },
];

export const leadSources = [
  { name: "Website", value: 38 },
  { name: "Referral", value: 24 },
  { name: "Social", value: 21 },
  { name: "Partners", value: 17 },
];

export const propertyViews = [
  { property: "Hillview", views: 1820 },
  { property: "Parvathi", views: 2410 },
  { property: "Sandur Rd", views: 1290 },
  { property: "Cantonment", views: 980 },
  { property: "Moka Rd", views: 1640 },
];

// Indian Rupee formatter — uses Cr (crore = 1,00,00,000) and L (lakh = 1,00,000)
export const formatCurrency = (n: number) => {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(2)} Cr`;
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(1)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
};

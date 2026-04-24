import { useMemo, useState } from "react";
import { Bath, BedDouble, MapPin, Plus, Ruler, Search, Upload } from "lucide-react";
import { Badge, Button, Card, Field, Input, Modal, PageHeader, Select } from "./ui";
import {
  initialProperties, propertyImages, formatCurrency, type Property, type PropertyStatus,
} from "@/lib/mock-data";

export function Properties() {
  const [items, setItems] = useState<Property[]>(initialProperties);
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [open, setOpen] = useState(false);

  const cities = useMemo(() => Array.from(new Set(items.map((p) => p.city))), [items]);
  const types = useMemo(() => Array.from(new Set(items.map((p) => p.type))), [items]);

  const filtered = items.filter((p) => {
    if (q && !`${p.title} ${p.address} ${p.city}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (city && p.city !== city) return false;
    if (type && p.type !== type) return false;
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      if (p.price < min || (max && p.price > max)) return false;
    }
    return true;
  });

  // form state
  const [form, setForm] = useState({
    title: "", address: "", city: "Miami", type: "House" as Property["type"],
    price: "", beds: "", baths: "", sqft: "",
  });

  const submit = () => {
    if (!form.title || !form.address || !form.price) return;
    const newProp: Property = {
      id: `p${Date.now()}`,
      title: form.title,
      address: form.address,
      city: form.city,
      type: form.type,
      price: Number(form.price),
      beds: Number(form.beds) || 1,
      baths: Number(form.baths) || 1,
      sqft: Number(form.sqft) || 1000,
      status: "For Sale",
      image: propertyImages[Math.floor(Math.random() * propertyImages.length)],
    };
    setItems([newProp, ...items]);
    setOpen(false);
    setForm({ title: "", address: "", city: "Miami", type: "House", price: "", beds: "", baths: "", sqft: "" });
  };

  return (
    <div>
      <PageHeader
        title="Properties"
        subtitle={`${filtered.length} of ${items.length} listings`}
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Add Property
          </Button>
        }
      />

      <Card className="p-4 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-5 relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search properties…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="md:col-span-3">
            <Select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">All cities</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
          </div>
          <div className="md:col-span-2">
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All types</option>
              {types.map((t) => <option key={t} value={t}>{t}</option>)}
            </Select>
          </div>
          <div className="md:col-span-2">
            <Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              <option value="">Any price</option>
              <option value="0-500000">Under $500K</option>
              <option value="500000-1000000">$500K – $1M</option>
              <option value="1000000-2000000">$1M – $2M</option>
              <option value="2000000-99999999">$2M+</option>
            </Select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <Card key={p.id} className="overflow-hidden group hover:-translate-y-1 hover:shadow-glow transition-all duration-300">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3">
                <Badge tone={p.status === "For Sale" ? "success" : p.status === "Pending" ? "warning" : "muted"}>
                  {p.status}
                </Badge>
              </div>
              <div className="absolute bottom-3 right-3 rounded-xl bg-background/95 backdrop-blur px-3 py-1.5 font-display font-bold text-sm shadow-soft">
                {formatCurrency(p.price)}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-display font-bold tracking-tight truncate">{p.title}</h3>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">{p.address} · {p.city}</span>
              </div>
              <div className="mt-3 flex items-center gap-3 text-xs text-foreground/80 border-t border-border pt-3">
                <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5 text-muted-foreground" />{p.beds}</span>
                <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5 text-muted-foreground" />{p.baths}</span>
                <span className="flex items-center gap-1"><Ruler className="h-3.5 w-3.5 text-muted-foreground" />{p.sqft.toLocaleString()} sqft</span>
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card className="col-span-full p-10 text-center text-muted-foreground">
            No properties match your filters.
          </Card>
        )}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add new property"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="emerald" onClick={submit}>Save Property</Button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Field label="Title">
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Modern Lakeview Villa" />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Address">
              <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="123 Main St" />
            </Field>
          </div>
          <Field label="City">
            <Select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
              {["Miami", "New York", "Los Angeles", "Austin", "Chicago"].map((c) => <option key={c}>{c}</option>)}
            </Select>
          </Field>
          <Field label="Type">
            <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Property["type"] })}>
              {["House", "Apartment", "Condo", "Villa", "Townhouse"].map((t) => <option key={t}>{t}</option>)}
            </Select>
          </Field>
          <Field label="Price (USD)">
            <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="850000" />
          </Field>
          <Field label="Area (sqft)">
            <Input type="number" value={form.sqft} onChange={(e) => setForm({ ...form, sqft: e.target.value })} placeholder="2200" />
          </Field>
          <Field label="Bedrooms">
            <Input type="number" value={form.beds} onChange={(e) => setForm({ ...form, beds: e.target.value })} placeholder="3" />
          </Field>
          <Field label="Bathrooms">
            <Input type="number" value={form.baths} onChange={(e) => setForm({ ...form, baths: e.target.value })} placeholder="2" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Images">
              <div className="rounded-xl border-2 border-dashed border-input bg-secondary/40 px-4 py-6 text-center">
                <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                <div className="mt-2 text-xs text-muted-foreground">Click to upload or drag & drop (mock)</div>
              </div>
            </Field>
          </div>
        </div>

        <p className="mt-3 text-[11px] text-muted-foreground">
          Status defaults to "For Sale". A demo image will be auto-assigned.
        </p>
      </Modal>
    </div>
  );
}

export type _kept = PropertyStatus;

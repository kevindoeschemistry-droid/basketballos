import { BookUser, Plus, Mail, Phone } from "lucide-react";

export const metadata = { title: "Directory" };

const mockContacts = [
  { id: 1, name: "Coach Williams", role: "Head Coach", email: "williams@lincoln.edu", phone: "(555) 100-0001" },
  { id: 2, name: "Coach Davis", role: "Assistant Coach", email: "davis@lincoln.edu", phone: "(555) 100-0002" },
  { id: 3, name: "Sarah Johnson", role: "Parent — Marcus Johnson", email: "s.johnson@email.com", phone: "(555) 200-0001" },
  { id: 4, name: "Mike Williams", role: "Parent — Darius Williams", email: "m.williams@email.com", phone: "(555) 200-0002" },
  { id: 5, name: "Dr. Karen Lee", role: "Resident Life", email: "k.lee@lincoln.edu", phone: "(555) 300-0001" },
  { id: 6, name: "Tom Martinez", role: "Athletic Director", email: "t.martinez@lincoln.edu", phone: "(555) 300-0002" },
];

export default function DirectoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Directory</h1>
          <p className="mt-1 text-muted-foreground">Contact information for coaches, parents, and staff.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Add Contact
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {mockContacts.map((c) => (
          <div key={c.id} className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30">
            <h3 className="font-semibold">{c.name}</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">{c.role}</p>
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" /> {c.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" /> {c.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

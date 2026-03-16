import { FolderOpen, Plus, ExternalLink, FileText } from "lucide-react";

export const metadata = { title: "Files & Links" };

const mockFiles = [
  { id: 1, name: "Team Handbook 2025-26", type: "PDF", category: "Handbook" },
  { id: 2, name: "Athletic Waiver Form", type: "PDF", category: "Waivers" },
  { id: 3, name: "CIF Eligibility Rules", type: "Link", category: "CIF" },
  { id: 4, name: "Travel Permission Slip", type: "PDF", category: "Travel" },
  { id: 5, name: "Hudl Team Page", type: "Link", category: "Hudl" },
  { id: 6, name: "MaxPreps Team Page", type: "Link", category: "MaxPreps" },
];

export default function FilesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Files & Links</h1>
          <p className="mt-1 text-muted-foreground">All team documents and important links in one place.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Upload
        </button>
      </div>

      <div className="space-y-3">
        {mockFiles.map((file) => (
          <div key={file.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {file.type === "Link" ? <ExternalLink className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{file.name}</h3>
              <p className="text-sm text-muted-foreground">{file.category} · {file.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

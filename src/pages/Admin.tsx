import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  useAdminProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  useDuplicateProject,
  useReorderProjects,
  uploadProjectImage,
  type Project,
} from "@/hooks/useProjects";
import { featuredImageFor, featuredImageSource } from "@/lib/featuredImage";
import { objectImageFor, objectImageSource } from "@/lib/catalogueImages";
import {
  useAdminSiteSettings,
  useSaveSiteSettings,
} from "@/hooks/useSiteSettings";
import { CONTENT_GROUPS, CONTENT_DEFAULTS } from "@/lib/siteContent";
import { useAdminGuestBook, useDeleteGuestBookEntry, type GuestBookEntry } from "@/hooks/useGuestBook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  ArrowLeft,
  Copy,
  GripVertical,
  AlertCircle,
  MessageSquare,
  FolderKanban,
  Boxes,
  Upload,
  ImageIcon,
  X,
  Sparkles,
  FileText,
  RotateCcw,
  Save,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format } from "date-fns";

const DEFAULT_GRADIENT = "bg-gradient-to-br from-pink-400 to-rose-500";

interface ProjectFormData {
  title: string;
  description: string;
  href: string;
  tag: string;
  is_visible: boolean;
  show_text_overlay: boolean;
}

const emptyForm: ProjectFormData = {
  title: "",
  description: "",
  href: "#",
  tag: "",
  is_visible: true,
  show_text_overlay: true,
};

const ACCEPTED_IMAGE_TYPES = "image/jpeg,image/png,image/gif,image/webp";

interface FeaturedImageFieldProps {
  /** Image currently shown (resolved: uploaded image, default artwork, or null). */
  previewSrc: string | null;
  /** Where the shown image comes from, drives the status label. */
  source: "custom" | "default" | "none";
  busy?: boolean;
  compact?: boolean;
  onFile: (file: File) => void;
  /** Shown only when there is a custom uploaded image to remove. */
  onRemove?: () => void;
  label?: string;
}

/**
 * Drag-and-drop featured-image control. Presentational only — the parent
 * decides whether a picked file is staged (create/edit form) or applied
 * immediately (inline card editing).
 */
function FeaturedImageField({
  previewSrc,
  source,
  busy = false,
  compact = false,
  onFile,
  onRemove,
  label,
}: FeaturedImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) onFile(file);
  };

  const statusText =
    source === "custom" ? "Custom image" : source === "default" ? "Default artwork" : "No image yet";

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload or replace featured image"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`group relative flex ${compact ? "h-16 w-24" : "aspect-[16/9] w-full"} cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed bg-muted/40 transition-colors ${
          dragOver ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
        }`}
      >
        {previewSrc ? (
          <img src={previewSrc} alt="Featured preview" className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <ImageIcon className={compact ? "h-5 w-5" : "h-8 w-8"} />
            {!compact && <span className="text-xs">Drop image or click</span>}
          </div>
        )}

        {/* Hover / drag overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-2 bg-background/70 text-xs font-medium text-foreground transition-opacity ${
            dragOver ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          {busy ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Upload className="h-4 w-4" />
              {!compact && <span>{previewSrc ? "Drop or click to replace" : "Drop or click to upload"}</span>}
            </>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <Badge variant="outline" className="text-[10px]">
          {source === "default" && <Sparkles className="mr-1 h-3 w-3" />}
          {statusText}
        </Badge>
        {onRemove && source === "custom" && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-destructive hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            disabled={busy}
          >
            <X className="mr-1 h-3 w-3" />
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}

interface SortableProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (project: Project) => void;
  onDuplicate: (project: Project) => void;
  onImageChange: (project: Project, imageUrl: string | null) => Promise<void>;
}

function SortableProjectCard({
  project,
  onEdit,
  onDelete,
  onToggleVisibility,
  onDuplicate,
  onImageChange,
}: SortableProjectCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });
  const { toast } = useToast();
  const [imageBusy, setImageBusy] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleInlineUpload = async (file: File) => {
    setImageBusy(true);
    try {
      const url = await uploadProjectImage(file);
      await onImageChange(project, url);
      toast({ title: "Featured image updated" });
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setImageBusy(false);
    }
  };

  const handleInlineRemove = async () => {
    setImageBusy(true);
    try {
      await onImageChange(project, null);
      toast({ title: "Custom image removed" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setImageBusy(false);
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`${!project.is_visible ? "opacity-60" : ""} ${isDragging ? "shadow-lg" : ""}`}
    >
      <CardContent className="flex items-center gap-4 p-4">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5" />
        </button>

        {/* Featured image — drag & drop to replace, hover to remove */}
        <div className="w-28 flex-shrink-0">
          <FeaturedImageField
            compact
            previewSrc={featuredImageFor(project)}
            source={featuredImageSource(project)}
            busy={imageBusy}
            onFile={handleInlineUpload}
            onRemove={handleInlineRemove}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">
            {project.title}
          </h3>
          {project.description && (
            <p className="text-sm text-muted-foreground truncate">
              {project.description}
            </p>
          )}
          <p className="text-xs text-muted-foreground truncate">
            {project.href !== "#" ? project.href : "No URL set"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Switch
            checked={project.is_visible}
            onCheckedChange={() => onToggleVisibility(project)}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDuplicate(project)}
            title="Duplicate"
          >
            <Copy className="h-4 w-4" />
          </Button>
          {project.href !== "#" && (
            <Button variant="ghost" size="icon" asChild>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(project)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(project.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  feedback: "bg-muted text-muted-foreground",
  idea: "bg-accent/20 text-accent",
  sponsorship: "bg-primary/20 text-primary",
  private: "bg-secondary/20 text-secondary",
};

// Guest Book Entry Card for mobile
function GuestBookEntryCard({ 
  entry, 
  onDelete 
}: { 
  entry: GuestBookEntry; 
  onDelete: (id: string) => void;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-medium text-foreground truncate">{entry.name}</span>
              <Badge variant="outline" className={`text-[10px] ${CATEGORY_COLORS[entry.category] || ""}`}>
                {entry.category}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {format(new Date(entry.created_at), "MMM d, yyyy")}
              </span>
            </div>
            {entry.email && (
              <p className="text-xs text-muted-foreground/70 mb-1">{entry.email}</p>
            )}
            <p className="text-sm text-muted-foreground">{entry.message}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(entry.id)}
            className="flex-shrink-0"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

import { useSEO } from "@/hooks/useSEO";

/**
 * Content tab — edit every editable piece of front-end copy. Values are stored
 * as overrides in `site_settings`; anything left at its default is not written,
 * so the public site keeps using the code default until it's changed.
 */
function SiteContentEditor({
  enabled,
  groups = CONTENT_GROUPS,
}: {
  enabled: boolean;
  groups?: typeof CONTENT_GROUPS;
}) {
  const { data: saved, isLoading } = useAdminSiteSettings(enabled);
  const saveSettings = useSaveSiteSettings();
  const { toast } = useToast();

  const [values, setValues] = useState<Record<string, string>>({});
  const [baseline, setBaseline] = useState<Record<string, string>>({});
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const handleImageUpload = async (key: string, file: File) => {
    setUploadingKey(key);
    try {
      const url = await uploadProjectImage(file);
      setValues((prev) => ({ ...prev, [key]: url }));
      toast({ title: "Image uploaded", description: "Remember to save your changes." });
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setUploadingKey(null);
    }
  };

  useEffect(() => {
    if (!saved) return;
    const initial: Record<string, string> = {};
    for (const key of Object.keys(CONTENT_DEFAULTS)) {
      initial[key] = saved[key] ?? CONTENT_DEFAULTS[key];
    }
    setValues(initial);
    setBaseline(initial);
  }, [saved]);

  const dirtyKeys = Object.keys(values).filter((k) => values[k] !== baseline[k]);
  const isDirty = dirtyKeys.length > 0;

  const handleSave = async () => {
    if (!isDirty) return;
    const entries: Record<string, string> = {};
    for (const key of dirtyKeys) entries[key] = values[key];
    try {
      await saveSettings.mutateAsync(entries);
      setBaseline({ ...values });
      toast({ title: "Content saved", description: `${dirtyKeys.length} field(s) updated.` });
    } catch (error: any) {
      toast({ title: "Error saving content", description: error.message, variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Edit any text on the homepage. Blank fields fall back to the built-in default.
        </p>
        <Button onClick={handleSave} disabled={!isDirty || saveSettings.isPending}>
          {saveSettings.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {isDirty ? `Save ${dirtyKeys.length} change${dirtyKeys.length !== 1 ? "s" : ""}` : "Saved"}
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={[groups[0]?.id]} className="space-y-3">
        {groups.map((group) => {
          const groupDirty = group.fields.some((f) => values[f.key] !== baseline[f.key]);
          return (
            <AccordionItem
              key={group.id}
              value={group.id}
              className="rounded-lg border border-border px-4"
            >
              <AccordionTrigger className="hover:no-underline">
                <span className="flex items-center gap-2 text-left">
                  <span className="font-display font-semibold text-foreground">{group.title}</span>
                  {groupDirty && (
                    <Badge variant="secondary" className="text-[10px]">
                      Unsaved
                    </Badge>
                  )}
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-5 pb-4">
                {group.description && (
                  <p className="text-xs text-muted-foreground">{group.description}</p>
                )}
                {group.fields.map((field) => {
                  const value = values[field.key] ?? "";
                  const isFieldDirty = value !== baseline[field.key];
                  const isDefault = value === CONTENT_DEFAULTS[field.key];
                  return (
                    <div key={field.key} className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <Label htmlFor={`content-${field.key}`} className="text-sm">
                          {field.label}
                          {isFieldDirty && <span className="ml-2 text-[10px] text-accent">• edited</span>}
                        </Label>
                        {!isDefault && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-[11px] text-muted-foreground"
                            onClick={() =>
                              setValues((prev) => ({ ...prev, [field.key]: CONTENT_DEFAULTS[field.key] }))
                            }
                            title="Reset to default"
                          >
                            <RotateCcw className="mr-1 h-3 w-3" />
                            Reset
                          </Button>
                        )}
                      </div>
                      {field.type === "image" ? (
                        (() => {
                          const objId = field.key.split(".")[1];
                          const override = values[field.key];
                          return (
                            <FeaturedImageField
                              previewSrc={objectImageFor(objId, override)}
                              source={objectImageSource(objId, override)}
                              busy={uploadingKey === field.key}
                              onFile={(file) => handleImageUpload(field.key, file)}
                              onRemove={() => setValues((prev) => ({ ...prev, [field.key]: "" }))}
                            />
                          );
                        })()
                      ) : field.type === "toggle" ? (
                        <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                          <Switch
                            id={`content-${field.key}`}
                            checked={value === "live"}
                            onCheckedChange={(checked) =>
                              setValues((prev) => ({ ...prev, [field.key]: checked ? "live" : "brewing" }))
                            }
                          />
                          <span className="text-sm text-muted-foreground">
                            {value === "live" ? "Live — featuring the newest drop" : "Brewing — mysterious teaser"}
                          </span>
                        </div>
                      ) : field.type === "multiline" ? (
                        <Textarea
                          id={`content-${field.key}`}
                          value={value}
                          rows={field.key === "about.whispers" ? 5 : 3}
                          onChange={(e) =>
                            setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                          }
                        />
                      ) : (
                        <Input
                          id={`content-${field.key}`}
                          type={field.type === "url" ? "url" : "text"}
                          value={value}
                          onChange={(e) =>
                            setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                          }
                        />
                      )}
                      {field.help && <p className="text-[11px] text-muted-foreground">{field.help}</p>}
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

/** Object ids for the catalogue, in display order (must match ArtifactsRow). */
const OBJECT_IDS = ["coin", "key", "stone", "paper", "ring", "mirror", "seed"] as const;

/**
 * Objects tab — a dedicated, card-per-object editor for "Objects from the
 * playground". Each card manages that piece's preview image (upload / replace /
 * remove) and its copy. Everything saves to site_settings, in sync with the
 * public catalogue.
 */
function ObjectsEditor({ enabled }: { enabled: boolean }) {
  const { data: saved, isLoading } = useAdminSiteSettings(enabled);
  const saveSettings = useSaveSiteSettings();
  const { toast } = useToast();

  const group = CONTENT_GROUPS.find((g) => g.id === "artifacts")!;
  const sectionFields = group.fields.filter((f) => f.key.split(".").length === 2);

  const [values, setValues] = useState<Record<string, string>>({});
  const [baseline, setBaseline] = useState<Record<string, string>>({});
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  useEffect(() => {
    if (!saved) return;
    const initial: Record<string, string> = {};
    for (const f of group.fields) initial[f.key] = saved[f.key] ?? CONTENT_DEFAULTS[f.key];
    setValues(initial);
    setBaseline(initial);
  }, [saved, group.fields]);

  const dirtyKeys = group.fields.map((f) => f.key).filter((k) => values[k] !== baseline[k]);
  const isDirty = dirtyKeys.length > 0;

  const setVal = (key: string, v: string) => setValues((prev) => ({ ...prev, [key]: v }));

  const handleImageUpload = async (key: string, file: File) => {
    setUploadingKey(key);
    try {
      const url = await uploadProjectImage(file);
      setVal(key, url);
      toast({ title: "Image uploaded", description: "Remember to save your changes." });
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setUploadingKey(null);
    }
  };

  const handleSave = async () => {
    if (!isDirty) return;
    const entries: Record<string, string> = {};
    for (const key of dirtyKeys) entries[key] = values[key];
    try {
      await saveSettings.mutateAsync(entries);
      setBaseline({ ...values });
      toast({ title: "Objects saved", description: `${dirtyKeys.length} field(s) updated.` });
    } catch (error: any) {
      toast({ title: "Error saving", description: error.message, variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-72 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Manage each building block's image and copy. Drag &amp; drop an image onto a card to upload or replace it.
        </p>
        <Button onClick={handleSave} disabled={!isDirty || saveSettings.isPending}>
          {saveSettings.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {isDirty ? `Save ${dirtyKeys.length} change${dirtyKeys.length !== 1 ? "s" : ""}` : "Saved"}
        </Button>
      </div>

      {/* Section heading copy */}
      <Card>
        <CardContent className="grid gap-4 p-4 sm:grid-cols-2">
          {sectionFields.map((field) => (
            <div key={field.key} className={`space-y-1.5 ${field.type === "multiline" ? "sm:col-span-2" : ""}`}>
              <Label htmlFor={`obj-${field.key}`} className="text-xs">
                {field.label}
              </Label>
              {field.type === "multiline" ? (
                <Textarea
                  id={`obj-${field.key}`}
                  rows={2}
                  value={values[field.key] ?? ""}
                  onChange={(e) => setVal(field.key, e.target.value)}
                />
              ) : (
                <Input
                  id={`obj-${field.key}`}
                  value={values[field.key] ?? ""}
                  onChange={(e) => setVal(field.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* One card per object */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OBJECT_IDS.map((id, idx) => {
          const nameKey = `artifacts.${id}.name`;
          const formatKey = `artifacts.${id}.material`;
          const conceptKey = `artifacts.${id}.idea`;
          const imageKey = `artifacts.${id}.image`;
          const override = values[imageKey];
          return (
            <Card key={id}>
              <CardContent className="space-y-3 p-4">
                <div className="flex items-center justify-between">
                  <span className="lp-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Object {idx + 1}
                  </span>
                </div>
                <FeaturedImageField
                  previewSrc={objectImageFor(id, override)}
                  source={objectImageSource(id, override)}
                  busy={uploadingKey === imageKey}
                  onFile={(file) => handleImageUpload(imageKey, file)}
                  onRemove={() => setVal(imageKey, "")}
                />
                <div className="space-y-1.5">
                  <Label htmlFor={`obj-${nameKey}`} className="text-xs">Name</Label>
                  <Input id={`obj-${nameKey}`} value={values[nameKey] ?? ""} onChange={(e) => setVal(nameKey, e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`obj-${formatKey}`} className="text-xs">Format</Label>
                  <Input id={`obj-${formatKey}`} value={values[formatKey] ?? ""} onChange={(e) => setVal(formatKey, e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`obj-${conceptKey}`} className="text-xs">Concept</Label>
                  <Textarea id={`obj-${conceptKey}`} rows={3} value={values[conceptKey] ?? ""} onChange={(e) => setVal(conceptKey, e.target.value)} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default function Admin() {
  useSEO({
    title: "Admin — Bryan Lau",
    description: "Internal control room for managing drops, objects and the guest book on bryanlauwk.fun.",
    canonical: "https://www.bryanlauwk.fun/admin",
    noindex: true,
  });
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  
  // Only fetch data when user is confirmed admin
  const shouldFetchData = !authLoading && !!user && isAdmin;
  const { data: projects, isLoading: projectsLoading, error: projectsError } = useAdminProjects(shouldFetchData);
  const { data: guestBookEntries, isLoading: guestBookLoading } = useAdminGuestBook(shouldFetchData);
  const deleteGuestBookEntry = useDeleteGuestBookEntry();
  
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const duplicateProject = useDuplicateProject();
  const reorderProjects = useReorderProjects();
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>(emptyForm);
  const [localProjects, setLocalProjects] = useState<Project[]>([]);
  const [deleteGuestEntryId, setDeleteGuestEntryId] = useState<string | null>(null);

  // Featured image staging for the create/edit dialog
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageObjectUrl, setImageObjectUrl] = useState<string | null>(null);
  const [imageRemoved, setImageRemoved] = useState(false);


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (projects) {
      setLocalProjects(projects);
    }
  }, [projects]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!authLoading && user && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [authLoading, user, isAdmin, navigate, toast]);

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description || "",
        href: project.href,
        tag: project.tag || "",
        is_visible: project.is_visible,
        show_text_overlay: project.show_text_overlay,
      });
    } else {
      setEditingProject(null);
      setFormData(emptyForm);
    }
    // reset staged image state each time the dialog opens
    setImageFile(null);
    setImageObjectUrl(null);
    setImageRemoved(false);
    setDialogOpen(true);
  };

  const handleStageImage = (file: File) => {
    setImageFile(file);
    setImageObjectUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setImageRemoved(false);
  };

  const handleStageRemoveImage = () => {
    setImageFile(null);
    setImageObjectUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setImageRemoved(true);
  };

  // Inline (per-card) image change — applies immediately.
  const handleProjectImageChange = async (project: Project, imageUrl: string | null) => {
    await updateProject.mutateAsync({ id: project.id, image_url: imageUrl });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a project title.",
        variant: "destructive",
      });
      return;
    }

    try {
      const submitData = {
        ...formData,
        tag: formData.tag.trim() || null,
      };

      // Resolve the featured image: new upload wins, then explicit removal,
      // otherwise keep whatever the project already had.
      let imageUrl: string | null = editingProject?.image_url ?? null;
      if (imageFile) {
        imageUrl = await uploadProjectImage(imageFile);
      } else if (imageRemoved) {
        imageUrl = null;
      }

      if (editingProject) {
        await updateProject.mutateAsync({
          id: editingProject.id,
          ...submitData,
          image_url: imageUrl,
        });
        toast({ title: "Project updated!" });
      } else {
        await createProject.mutateAsync({
          ...submitData,
          color: DEFAULT_GRADIENT,
          image_url: imageUrl,
        });
        toast({ title: "Project created!" });
      }
      setDialogOpen(false);
      setFormData(emptyForm);
      setEditingProject(null);
      setImageFile(null);
      setImageObjectUrl(null);
      setImageRemoved(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteProject.mutateAsync(id);
      toast({ title: "Project deleted!" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleToggleVisibility = async (project: Project) => {
    try {
      await updateProject.mutateAsync({
        id: project.id,
        is_visible: !project.is_visible,
      });
      toast({
        title: project.is_visible ? "Project hidden" : "Project visible",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDuplicate = async (project: Project) => {
    try {
      await duplicateProject.mutateAsync(project);
      toast({ title: "Project duplicated!" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = localProjects.findIndex((p) => p.id === active.id);
      const newIndex = localProjects.findIndex((p) => p.id === over.id);

      const newOrder = arrayMove(localProjects, oldIndex, newIndex);
      setLocalProjects(newOrder);

      // Update display_order for affected items
      const updates = newOrder.map((project, index) => ({
        id: project.id,
        display_order: index,
      }));

      try {
        await reorderProjects.mutateAsync(updates);
      } catch (error: any) {
        // Revert on error
        setLocalProjects(projects || []);
        toast({
          title: "Error reordering",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteGuestEntry = async () => {
    if (!deleteGuestEntryId) return;
    
    try {
      await deleteGuestBookEntry.mutateAsync(deleteGuestEntryId);
      toast({ title: "Entry deleted!" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeleteGuestEntryId(null);
    }
  };

  // Loading state with specific messages
  if (authLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Signing you in...</p>
      </div>
    );
  }

  // Checking admin access
  if (user && !isAdmin && !authLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Checking admin access...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const projectCount = projects?.length ?? 0;
  const guestBookCount = guestBookEntries?.length ?? 0;

  // Featured-image preview for the create/edit dialog
  const dialogArtworkTitle = formData.title || editingProject?.title || "";
  const dialogStoredUrl = imageRemoved ? null : editingProject?.image_url ?? null;
  const dialogImagePreview =
    imageObjectUrl ?? featuredImageFor({ title: dialogArtworkTitle, image_url: dialogStoredUrl });
  const dialogImageSource = imageObjectUrl
    ? "custom"
    : featuredImageSource({ title: dialogArtworkTitle, image_url: dialogStoredUrl });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                {projectCount} project{projectCount !== 1 ? "s" : ""} · {guestBookCount} guest book entr{guestBookCount !== 1 ? "ies" : "y"}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderKanban className="h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="objects" className="flex items-center gap-2">
              <Boxes className="h-4 w-4" />
              Objects
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="guestbook" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
              {guestBookCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {guestBookCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">Manage Projects</h2>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => handleOpenDialog()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="font-display">
                      {editingProject ? "Edit Project" : "Add New Project"}
                    </DialogTitle>
                    <DialogDescription>
                      Fill in the details for your project card.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="P02, Block Blast, etc."
                        value={formData.title}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, title: e.target.value }))
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        placeholder="A fun puzzle game"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, description: e.target.value }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="href">URL</Label>
                      <Input
                        id="href"
                        type="url"
                        placeholder="https://..."
                        value={formData.href}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, href: e.target.value }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tag">Audience Tag</Label>
                      <Input
                        id="tag"
                        placeholder="Gamers, Foodies, Data Nerds..."
                        value={formData.tag}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, tag: e.target.value }))
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        Gold label shown on the card (leave empty for none)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <FeaturedImageField
                        label="Featured Image"
                        previewSrc={dialogImagePreview}
                        source={dialogImageSource}
                        onFile={handleStageImage}
                        onRemove={handleStageRemoveImage}
                      />
                      <p className="text-xs text-muted-foreground">
                        Shown in Past Seasons and on the drop page — this is exactly what visitors see.
                        Drag &amp; drop or click to upload. JPEG, PNG, GIF, or WebP up to 5MB.
                      </p>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <Label htmlFor="visibility">Visible on homepage</Label>
                        <p className="text-xs text-muted-foreground">
                          Hidden projects won't appear on the public site
                        </p>
                      </div>
                      <Switch
                        id="visibility"
                        checked={formData.is_visible}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, is_visible: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="text-overlay">Show text overlay</Label>
                      <Switch
                        id="text-overlay"
                        checked={formData.show_text_overlay}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, show_text_overlay: checked }))
                        }
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={createProject.isPending || updateProject.isPending}
                    >
                      {createProject.isPending || updateProject.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      {editingProject ? "Update Project" : "Create Project"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {projectsLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : projectsError ? (
              <Card className="border-destructive">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                  <p className="text-destructive font-medium">Failed to load projects</p>
                  <p className="text-sm text-muted-foreground">{(projectsError as Error).message}</p>
                </CardContent>
              </Card>
            ) : localProjects.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="mb-4 text-muted-foreground">No projects yet</p>
                  <Button onClick={() => handleOpenDialog()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add your first project
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={localProjects.map((p) => p.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3">
                    {localProjects.map((project) => (
                      <SortableProjectCard
                        key={project.id}
                        project={project}
                        onEdit={handleOpenDialog}
                        onDelete={handleDelete}
                        onToggleVisibility={handleToggleVisibility}
                        onDuplicate={handleDuplicate}
                        onImageChange={handleProjectImageChange}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </TabsContent>

          {/* Objects Tab */}
          <TabsContent value="objects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">Objects from the playground</h2>
            </div>
            <ObjectsEditor enabled={shouldFetchData} />
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">Site Content</h2>
            </div>
            <SiteContentEditor
              enabled={shouldFetchData}
              groups={CONTENT_GROUPS.filter((g) => g.id !== "artifacts")}
            />
          </TabsContent>

          {/* Guest Book Tab */}
          <TabsContent value="guestbook" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">Guest Book Entries</h2>
            </div>

            {guestBookLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : !guestBookEntries || guestBookEntries.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">No guest book entries yet</p>
                  <p className="text-sm text-muted-foreground">Entries will appear here when visitors sign your guest book.</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block">
                  <Card>
                    <ScrollArea className="h-[500px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[130px]">Name</TableHead>
                            <TableHead className="w-[90px]">Type</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead className="w-[140px]">Email</TableHead>
                            <TableHead className="w-[110px]">Date</TableHead>
                            <TableHead className="w-[60px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {guestBookEntries.map((entry) => (
                            <TableRow key={entry.id}>
                              <TableCell className="font-medium">{entry.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className={`text-[10px] ${CATEGORY_COLORS[entry.category] || ""}`}>
                                  {entry.category}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-muted-foreground max-w-[300px] truncate">{entry.message}</TableCell>
                              <TableCell className="text-muted-foreground text-xs truncate">
                                {entry.email || "—"}
                              </TableCell>
                              <TableCell className="text-muted-foreground text-sm">
                                {format(new Date(entry.created_at), "MMM d, yyyy")}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setDeleteGuestEntryId(entry.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </Card>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-3">
                  {guestBookEntries.map((entry) => (
                    <GuestBookEntryCard
                      key={entry.id}
                      entry={entry}
                      onDelete={(id) => setDeleteGuestEntryId(id)}
                    />
                  ))}
                </div>
              </>
            )}
          </TabsContent>

        </Tabs>
      </main>

      {/* Delete Guest Book Entry Confirmation */}
      <AlertDialog open={!!deleteGuestEntryId} onOpenChange={() => setDeleteGuestEntryId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Guest Book Entry?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteGuestEntry}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteGuestBookEntry.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

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
  type Project,
} from "@/hooks/useProjects";
import { useAdminGuestBook, useDeleteGuestBookEntry, type GuestBookEntry } from "@/hooks/useGuestBook";
import {
  useAdminSponsors,
  useCreateSponsor,
  useUpdateSponsor,
  useDeleteSponsor,
  useReorderSponsors,
  uploadSponsorLogo,
  type Sponsor,
} from "@/hooks/useSponsors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  Gamepad2,
  MessageSquare,
  FolderKanban,
  Handshake,
  Upload,
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

interface SortableProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (project: Project) => void;
  onDuplicate: (project: Project) => void;
}

function SortableProjectCard({
  project,
  onEdit,
  onDelete,
  onToggleVisibility,
  onDuplicate,
}: SortableProjectCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
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

        {/* Preview */}
        <div
          className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg ${project.color}`}
        >
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Gamepad2 className="h-6 w-6 opacity-30 text-primary-foreground" />
            </div>
          )}
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
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-foreground truncate">{entry.name}</span>
              <span className="text-xs text-muted-foreground">
                {format(new Date(entry.created_at), "MMM d, yyyy")}
              </span>
            </div>
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

interface SortableSponsorCardProps {
  sponsor: Sponsor;
  onEdit: (sponsor: Sponsor) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (sponsor: Sponsor) => void;
}

function SortableSponsorCard({ sponsor, onEdit, onDelete, onToggleVisibility }: SortableSponsorCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: sponsor.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <Card ref={setNodeRef} style={style} className={`${!sponsor.is_visible ? "opacity-60" : ""} ${isDragging ? "shadow-lg" : ""}`}>
      <CardContent className="flex items-center gap-4 p-4">
        <button {...attributes} {...listeners} className="cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing">
          <GripVertical className="h-5 w-5" />
        </button>
        <div className="h-12 w-20 flex-shrink-0 overflow-hidden rounded border border-border bg-background p-1">
          <img src={sponsor.logo_url} alt={sponsor.name} className="h-full w-full object-contain" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{sponsor.name}</h3>
          <p className="text-xs text-muted-foreground truncate">{sponsor.website_url || "No URL"}</p>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={sponsor.is_visible} onCheckedChange={() => onToggleVisibility(sponsor)} />
          {sponsor.website_url && (
            <Button variant="ghost" size="icon" asChild>
              <a href={sponsor.website_url} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" /></a>
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => onEdit(sponsor)}><Pencil className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(sponsor.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Admin() {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  
  // Only fetch data when user is confirmed admin
  const shouldFetchData = !authLoading && !!user && isAdmin;
  const { data: projects, isLoading: projectsLoading, error: projectsError } = useAdminProjects(shouldFetchData);
  const { data: guestBookEntries, isLoading: guestBookLoading } = useAdminGuestBook(shouldFetchData);
  const deleteGuestBookEntry = useDeleteGuestBookEntry();
  
  // Sponsor hooks
  const { data: sponsors, isLoading: sponsorsLoading } = useAdminSponsors(shouldFetchData);
  const createSponsor = useCreateSponsor();
  const updateSponsor = useUpdateSponsor();
  const deleteSponsor = useDeleteSponsor();
  const reorderSponsors = useReorderSponsors();

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

  // Sponsor state
  const [sponsorDialogOpen, setSponsorDialogOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [sponsorForm, setSponsorForm] = useState({ name: "", website_url: "", is_visible: true });
  const [sponsorLogoFile, setSponsorLogoFile] = useState<File | null>(null);
  const [sponsorLogoPreview, setSponsorLogoPreview] = useState<string | null>(null);
  const [localSponsors, setLocalSponsors] = useState<Sponsor[]>([]);
  const [deleteSponsorId, setDeleteSponsorId] = useState<string | null>(null);
  const sponsorFileRef = useRef<HTMLInputElement>(null);

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
    if (sponsors) {
      setLocalSponsors(sponsors);
    }
  }, [sponsors]);

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
    setDialogOpen(true);
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

      if (editingProject) {
        await updateProject.mutateAsync({
          id: editingProject.id,
          ...submitData,
        });
        toast({ title: "Project updated!" });
      } else {
        await createProject.mutateAsync({
          ...submitData,
          color: DEFAULT_GRADIENT,
          image_url: null,
        });
        toast({ title: "Project created!" });
      }
      setDialogOpen(false);
      setFormData(emptyForm);
      setEditingProject(null);
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

  // Sponsor handlers
  const handleOpenSponsorDialog = (sponsor?: Sponsor) => {
    if (sponsor) {
      setEditingSponsor(sponsor);
      setSponsorForm({ name: sponsor.name, website_url: sponsor.website_url || "", is_visible: sponsor.is_visible });
      setSponsorLogoPreview(sponsor.logo_url);
    } else {
      setEditingSponsor(null);
      setSponsorForm({ name: "", website_url: "", is_visible: true });
      setSponsorLogoPreview(null);
    }
    setSponsorLogoFile(null);
    setSponsorDialogOpen(true);
  };

  const handleSponsorLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSponsorLogoFile(file);
      setSponsorLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSponsorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sponsorForm.name.trim()) {
      toast({ title: "Name required", variant: "destructive" });
      return;
    }

    try {
      let logoUrl = editingSponsor?.logo_url || "";

      if (sponsorLogoFile) {
        logoUrl = await uploadSponsorLogo(sponsorLogoFile);
      }

      if (!logoUrl) {
        toast({ title: "Logo required", description: "Please upload a logo image.", variant: "destructive" });
        return;
      }

      const data = {
        name: sponsorForm.name.trim(),
        logo_url: logoUrl,
        website_url: sponsorForm.website_url.trim() || null,
        is_visible: sponsorForm.is_visible,
      };

      if (editingSponsor) {
        await updateSponsor.mutateAsync({ id: editingSponsor.id, ...data });
        toast({ title: "Sponsor updated!" });
      } else {
        await createSponsor.mutateAsync(data);
        toast({ title: "Sponsor added!" });
      }
      setSponsorDialogOpen(false);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleDeleteSponsor = async () => {
    if (!deleteSponsorId) return;
    try {
      await deleteSponsor.mutateAsync(deleteSponsorId);
      toast({ title: "Sponsor deleted!" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setDeleteSponsorId(null);
    }
  };

  const handleSponsorDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = localSponsors.findIndex((s) => s.id === active.id);
      const newIndex = localSponsors.findIndex((s) => s.id === over.id);
      const newOrder = arrayMove(localSponsors, oldIndex, newIndex);
      setLocalSponsors(newOrder);
      try {
        await reorderSponsors.mutateAsync(newOrder.map((s, i) => ({ id: s.id, display_order: i })));
      } catch (error: any) {
        setLocalSponsors(sponsors || []);
        toast({ title: "Error reordering", description: error.message, variant: "destructive" });
      }
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
  const sponsorCount = sponsors?.length ?? 0;

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
                {projectCount} project{projectCount !== 1 ? "s" : ""} · {sponsorCount} sponsor{sponsorCount !== 1 ? "s" : ""} · {guestBookCount} guest book entr{guestBookCount !== 1 ? "ies" : "y"}
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
          <TabsList className="grid w-full grid-cols-3 max-w-lg">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderKanban className="h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="guestbook" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Guest Book
              {guestBookCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {guestBookCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="sponsors" className="flex items-center gap-2">
              <Handshake className="h-4 w-4" />
              Sponsors
              {sponsorCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {sponsorCount}
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
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
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
                            <TableHead className="w-[150px]">Name</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead className="w-[120px]">Date</TableHead>
                            <TableHead className="w-[60px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {guestBookEntries.map((entry) => (
                            <TableRow key={entry.id}>
                              <TableCell className="font-medium">{entry.name}</TableCell>
                              <TableCell className="text-muted-foreground">{entry.message}</TableCell>
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

          {/* Sponsors Tab */}
          <TabsContent value="sponsors" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">Manage Sponsors</h2>
              <Dialog open={sponsorDialogOpen} onOpenChange={setSponsorDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => handleOpenSponsorDialog()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Sponsor
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="font-display">
                      {editingSponsor ? "Edit Sponsor" : "Add Sponsor"}
                    </DialogTitle>
                    <DialogDescription>
                      Upload a brand logo and configure the sponsor.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSponsorSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="sponsor-name">Name *</Label>
                      <Input
                        id="sponsor-name"
                        placeholder="Brand name"
                        value={sponsorForm.name}
                        onChange={(e) => setSponsorForm((p) => ({ ...p, name: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Logo *</Label>
                      <div className="flex items-center gap-4">
                        {sponsorLogoPreview && (
                          <img src={sponsorLogoPreview} alt="Preview" className="h-12 w-auto max-w-[100px] object-contain rounded border border-border bg-background p-1" />
                        )}
                        <Button type="button" variant="outline" onClick={() => sponsorFileRef.current?.click()}>
                          <Upload className="mr-2 h-4 w-4" />
                          {sponsorLogoPreview ? "Change" : "Upload"}
                        </Button>
                        <input ref={sponsorFileRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp" className="hidden" onChange={handleSponsorLogoChange} />
                      </div>
                      <p className="text-xs text-muted-foreground">JPEG, PNG, GIF, or WebP. Max 5MB.</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sponsor-url">Website URL</Label>
                      <Input
                        id="sponsor-url"
                        type="url"
                        placeholder="https://..."
                        value={sponsorForm.website_url}
                        onChange={(e) => setSponsorForm((p) => ({ ...p, website_url: e.target.value }))}
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <Label htmlFor="sponsor-visibility">Visible on homepage</Label>
                        <p className="text-xs text-muted-foreground">Hidden sponsors won't appear publicly</p>
                      </div>
                      <Switch
                        id="sponsor-visibility"
                        checked={sponsorForm.is_visible}
                        onCheckedChange={(checked) => setSponsorForm((p) => ({ ...p, is_visible: checked }))}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={createSponsor.isPending || updateSponsor.isPending}>
                      {(createSponsor.isPending || updateSponsor.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {editingSponsor ? "Update Sponsor" : "Add Sponsor"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {sponsorsLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : localSponsors.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Handshake className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="mb-4 text-muted-foreground">No sponsors yet</p>
                  <Button onClick={() => handleOpenSponsorDialog()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add your first sponsor
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleSponsorDragEnd}>
                <SortableContext items={localSponsors.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-3">
                    {localSponsors.map((sponsor) => (
                      <SortableSponsorCard
                        key={sponsor.id}
                        sponsor={sponsor}
                        onEdit={handleOpenSponsorDialog}
                        onDelete={(id) => setDeleteSponsorId(id)}
                        onToggleVisibility={async (s) => {
                          try {
                            await updateSponsor.mutateAsync({ id: s.id, is_visible: !s.is_visible });
                            toast({ title: s.is_visible ? "Sponsor hidden" : "Sponsor visible" });
                          } catch (error: any) {
                            toast({ title: "Error", description: error.message, variant: "destructive" });
                          }
                        }}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Delete Sponsor Confirmation */}
      <AlertDialog open={!!deleteSponsorId} onOpenChange={() => setDeleteSponsorId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Sponsor?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the sponsor.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSponsor}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteSponsor.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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

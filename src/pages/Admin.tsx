import { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  ArrowLeft,
  Upload,
  Copy,
  GripVertical,
  AlertCircle,
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

const GRADIENT_OPTIONS = [
  { label: "Pink/Rose", value: "bg-gradient-to-br from-pink-400 to-rose-500" },
  { label: "Violet/Purple", value: "bg-gradient-to-br from-violet-400 to-purple-500" },
  { label: "Blue/Cyan", value: "bg-gradient-to-br from-blue-400 to-cyan-500" },
  { label: "Emerald/Teal", value: "bg-gradient-to-br from-emerald-400 to-teal-500" },
  { label: "Amber/Orange", value: "bg-gradient-to-br from-amber-400 to-orange-500" },
  { label: "Red/Pink", value: "bg-gradient-to-br from-red-400 to-pink-500" },
];

interface ProjectFormData {
  title: string;
  description: string;
  href: string;
  color: string;
  is_visible: boolean;
  image_url: string;
}

const emptyForm: ProjectFormData = {
  title: "",
  description: "",
  href: "#",
  color: GRADIENT_OPTIONS[0].value,
  is_visible: true,
  image_url: "",
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
              <span className="text-2xl opacity-30">🎮</span>
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

export default function Admin() {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  
  // Only fetch projects when user is confirmed admin
  const shouldFetchProjects = !authLoading && !!user && isAdmin;
  const { data: projects, isLoading: projectsLoading, error: projectsError } = useAdminProjects(shouldFetchProjects);
  
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const duplicateProject = useDuplicateProject();
  const reorderProjects = useReorderProjects();
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [localProjects, setLocalProjects] = useState<Project[]>([]);

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
        color: project.color,
        is_visible: project.is_visible,
        image_url: project.image_url || "",
      });
    } else {
      setEditingProject(null);
      setFormData(emptyForm);
    }
    setDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadProjectImage(file);
      setFormData((prev) => ({ ...prev, image_url: url }));
      toast({ title: "Image uploaded!" });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingProject) {
        await updateProject.mutateAsync({
          id: editingProject.id,
          ...formData,
        });
        toast({ title: "Project updated!" });
      } else {
        await createProject.mutateAsync(formData);
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

  // Projects loading
  if (projectsLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  // Projects error
  if (projectsError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground">Failed to load projects</h2>
          <p className="text-sm text-muted-foreground">{(projectsError as Error).message}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
          <Button variant="ghost" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-display text-xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <Button variant="outline" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-foreground">Projects</h2>
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
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={2}
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
                  <Label>Background Color</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {GRADIENT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, color: option.value }))
                        }
                        className={`h-12 rounded-lg ${option.value} transition-all ${
                          formData.color === option.value
                            ? "ring-2 ring-primary ring-offset-2"
                            : "opacity-70 hover:opacity-100"
                        }`}
                        title={option.label}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Feature Image</Label>
                  <div className="flex items-center gap-4">
                    {formData.image_url ? (
                      <div className="relative h-20 w-32 overflow-hidden rounded-lg">
                        <img
                          src={formData.image_url}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, image_url: "" }))
                          }
                          className="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex h-20 w-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploading}
                        />
                        {uploading ? (
                          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        ) : (
                          <Upload className="h-6 w-6 text-muted-foreground" />
                        )}
                      </label>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="visibility">Visible on homepage</Label>
                  <Switch
                    id="visibility"
                    checked={formData.is_visible}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, is_visible: checked }))
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

        {localProjects.length === 0 ? (
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
      </main>
    </div>
  );
}

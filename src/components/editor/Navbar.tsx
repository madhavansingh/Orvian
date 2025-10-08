import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useEditorStore } from '@/store/editorStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Box, 
  Save, 
  FolderOpen, 
  User, 
  LogOut,
  Plus,
  Download
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { currentProject, projects, saveProject, createProject, loadProject, objects } = useEditorStore();
  const { toast } = useToast();
  const [newProjectName, setNewProjectName] = useState('');
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);

  const handleSave = () => {
    if (currentProject) {
      saveProject();
      toast({
        title: 'Project saved',
        description: `${currentProject.name} has been saved successfully.`,
      });
    }
  };

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      createProject(newProjectName);
      setNewProjectName('');
      setProjectDialogOpen(false);
      toast({
        title: 'Project created',
        description: `${newProjectName} has been created.`,
      });
    }
  };

  const handleExport = () => {
    if (currentProject) {
      const dataStr = JSON.stringify({ ...currentProject, objects }, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileDefaultName = `${currentProject.name}.json`;

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();

      toast({
        title: 'Project exported',
        description: `${currentProject.name} has been exported as JSON.`,
      });
    }
  };

  return (
    <nav className="h-14 bg-panel border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Box className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold">Orvian</span>
        </div>
        
        <div className="h-6 w-px bg-border" />
        
        <div className="flex items-center gap-2">
          <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Enter a name for your new 3D project.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="My Awesome Project"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCreateProject()}
                    className="bg-input border-border"
                  />
                </div>
                <Button onClick={handleCreateProject} className="w-full bg-primary hover:bg-hover">
                  Create Project
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <FolderOpen className="w-4 h-4 mr-2" />
                Open
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-popover border-border w-56">
              <DropdownMenuLabel>Recent Projects</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {projects.length === 0 ? (
                <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                  No projects yet
                </div>
              ) : (
                projects.map((project) => (
                  <DropdownMenuItem
                    key={project.id}
                    onClick={() => loadProject(project.id)}
                    className="cursor-pointer"
                  >
                    <span className="truncate">{project.name}</span>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {currentProject && (
            <>
              <Button variant="ghost" size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="ghost" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {currentProject && (
          <span className="text-sm text-muted-foreground">
            {currentProject.name}
          </span>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4 mr-2" />
              {user?.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-popover border-border">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;

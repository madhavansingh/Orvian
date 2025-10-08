import { useState } from 'react';
import { useEditorStore, ObjectType } from '@/store/editorStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Box, Circle, Cylinder, Square, Cone, Torus, 
  TreePine, Waves, Mountain, Cloud, Armchair, 
  Table2, Sun, Lightbulb, Pyramid
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion } from 'framer-motion';

interface ObjectItem {
  type: ObjectType;
  category: 'primitive' | 'environment' | 'light';
  icon: typeof Box;
  label: string;
  description: string;
  shortcut?: string;
}

const objectLibrary: ObjectItem[] = [
  // Primitives
  { type: 'cube', category: 'primitive', icon: Box, label: 'Cube', description: 'Basic cube shape', shortcut: 'C' },
  { type: 'sphere', category: 'primitive', icon: Circle, label: 'Sphere', description: 'Spherical object', shortcut: 'S' },
  { type: 'cylinder', category: 'primitive', icon: Cylinder, label: 'Cylinder', description: 'Cylindrical shape', shortcut: 'Y' },
  { type: 'plane', category: 'primitive', icon: Square, label: 'Plane', description: 'Flat plane surface', shortcut: 'P' },
  { type: 'cone', category: 'primitive', icon: Cone, label: 'Cone', description: 'Conical shape', shortcut: 'N' },
  { type: 'torus', category: 'primitive', icon: Torus, label: 'Torus', description: 'Donut shape', shortcut: 'T' },
  { type: 'capsule', category: 'primitive', icon: Cylinder, label: 'Capsule', description: 'Pill-shaped object' },
  { type: 'pyramid', category: 'primitive', icon: Pyramid, label: 'Pyramid', description: 'Four-sided pyramid' },
  
  // Environment
  { type: 'tree', category: 'environment', icon: TreePine, label: 'Tree', description: 'Low-poly tree with trunk and leaves' },
  { type: 'grass', category: 'environment', icon: Square, label: 'Grass Patch', description: 'Textured grass plane' },
  { type: 'rock', category: 'environment', icon: Mountain, label: 'Rock', description: 'Natural stone boulder' },
  { type: 'water', category: 'environment', icon: Waves, label: 'Water', description: 'Reflective water surface' },
  { type: 'cloud', category: 'environment', icon: Cloud, label: 'Cloud', description: 'Atmospheric cloud' },
  { type: 'chair', category: 'environment', icon: Armchair, label: 'Chair', description: 'Simple furniture chair' },
  { type: 'table', category: 'environment', icon: Table2, label: 'Table', description: 'Simple furniture table' },
  
  // Lights
  { type: 'directional', category: 'light', icon: Sun, label: 'Sun Light', description: 'Directional light source', shortcut: 'L' },
  { type: 'point', category: 'light', icon: Lightbulb, label: 'Point Light', description: 'Omnidirectional point light' },
  { type: 'spot', category: 'light', icon: Lightbulb, label: 'Spot Light', description: 'Focused spotlight' },
];

const ObjectLibrary = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'primitive' | 'environment' | 'light'>('all');
  const addObject = useEditorStore(state => state.addObject);

  const filteredObjects = objectLibrary.filter(obj => {
    const matchesSearch = obj.label.toLowerCase().includes(search.toLowerCase()) ||
                         obj.description.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === 'all' || obj.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleAddObject = (type: ObjectType, category: 'primitive' | 'environment' | 'light') => {
    addObject(type, category);
  };

  return (
    <div className="h-full flex flex-col bg-panel border-r border-border">
      <div className="p-4 border-b border-border space-y-3">
        <h3 className="font-semibold text-sm">Object Library</h3>
        <Input
          placeholder="Search objects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-input border-border h-8"
        />
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-4 mx-4 mt-2">
          <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
          <TabsTrigger value="primitive" className="text-xs">Shapes</TabsTrigger>
          <TabsTrigger value="environment" className="text-xs">Scene</TabsTrigger>
          <TabsTrigger value="light" className="text-xs">Lights</TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1 px-2">
          <TabsContent value={activeTab} className="mt-2">
            <div className="grid grid-cols-2 gap-2 p-2">
              {filteredObjects.map((obj, index) => (
                <TooltipProvider key={obj.type}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02 }}
                      >
                        <Button
                          variant="outline"
                          className="h-20 flex flex-col items-center justify-center gap-1 hover:bg-primary/20 hover:border-primary transition-all group relative"
                          onClick={() => handleAddObject(obj.type, obj.category)}
                        >
                          <obj.icon className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-medium truncate w-full text-center">
                            {obj.label}
                          </span>
                          {obj.shortcut && (
                            <span className="absolute top-1 right-1 text-[10px] opacity-50 bg-background px-1 rounded">
                              {obj.shortcut}
                            </span>
                          )}
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-popover border-border">
                      <div className="text-xs space-y-1">
                        <p className="font-semibold">{obj.label}</p>
                        <p className="text-muted-foreground">{obj.description}</p>
                        {obj.shortcut && (
                          <p className="text-primary">Shortcut: {obj.shortcut}</p>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default ObjectLibrary;
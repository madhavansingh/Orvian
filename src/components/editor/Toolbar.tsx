import { useEditorStore, PrimitiveType } from '@/store/editorStore';
import { Button } from '@/components/ui/button';
import { Box, Circle, Cylinder, Square } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const primitives: { type: PrimitiveType; icon: typeof Box; label: string }[] = [
  { type: 'cube', icon: Box, label: 'Cube' },
  { type: 'sphere', icon: Circle, label: 'Sphere' },
  { type: 'cylinder', icon: Cylinder, label: 'Cylinder' },
  { type: 'plane', icon: Square, label: 'Plane' },
];

const Toolbar = () => {
  const addObject = useEditorStore(state => state.addObject);

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        {primitives.map(({ type, icon: Icon, label }) => (
          <Tooltip key={type}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => addObject(type)}
                className="hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <Icon className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-popover border-border">
              <p>Add {label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default Toolbar;

import { useEditorStore } from '@/store/editorStore';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sun, Moon, Eye, EyeOff, Grid3x3 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LightingPanel = () => {
  const { 
    objects, 
    skyMode, 
    toggleSkyMode, 
    gridVisible, 
    gridSize, 
    toggleGrid, 
    setGridSize,
    selectObject 
  } = useEditorStore();
  
  const lights = objects.filter(obj => obj.category === 'light');

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-primary" />
          <h3 className="font-semibold">Lighting & Scene</h3>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Environment */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Environment</Label>
            
            <div className="flex items-center justify-between">
              <Label className="text-xs">Sky Mode</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleSkyMode}
                className="h-8 gap-2"
              >
                {skyMode === 'day' ? (
                  <>
                    <Sun className="w-3 h-3" />
                    Day
                  </>
                ) : (
                  <>
                    <Moon className="w-3 h-3" />
                    Night
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Grid */}
          <div className="space-y-3 pt-3 border-t border-border">
            <Label className="text-sm font-semibold">Grid Settings</Label>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Grid3x3 className="w-3 h-3" />
                <Label className="text-xs">Show Grid</Label>
              </div>
              <Switch
                checked={gridVisible}
                onCheckedChange={toggleGrid}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-xs">Grid Size</Label>
                <span className="text-xs text-muted-foreground">{gridSize}m</span>
              </div>
              <Slider
                value={[gridSize]}
                onValueChange={([value]) => setGridSize(value)}
                min={0.5}
                max={5}
                step={0.5}
                disabled={!gridVisible}
              />
            </div>
          </div>

          {/* Lights */}
          <div className="space-y-3 pt-3 border-t border-border">
            <Label className="text-sm font-semibold">Scene Lights ({lights.length})</Label>
            
            {lights.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No lights in scene. Add lights from the object library.
              </p>
            ) : (
              <div className="space-y-2">
                {lights.map((light) => (
                  <div
                    key={light.id}
                    className="p-2 rounded bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => selectObject(light.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sun className="w-3 h-3" />
                        <span className="text-xs font-medium">{light.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {(light.intensity || 1).toFixed(1)}x
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Tips */}
          <div className="pt-3 border-t border-border">
            <Label className="text-sm font-semibold mb-2 block">Quick Tips</Label>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>• Add directional lights for sunlight</p>
              <p>• Point lights work like light bulbs</p>
              <p>• Use ambient light for soft fill</p>
              <p>• Toggle day/night for different moods</p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default LightingPanel;
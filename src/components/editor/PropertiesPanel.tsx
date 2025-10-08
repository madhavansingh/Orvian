import { useEditorStore } from '@/store/editorStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings } from 'lucide-react';

const PropertiesPanel = () => {
  const { objects, selectedObjectId, updateObject } = useEditorStore();
  const selectedObject = objects.find(obj => obj.id === selectedObjectId);

  if (!selectedObject) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-primary" />
            <h3 className="font-semibold">Properties</h3>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8 text-center text-muted-foreground text-sm">
          Select an object to view its properties
        </div>
      </div>
    );
  }

  const handlePositionChange = (axis: number, value: string) => {
    const newPosition = [...selectedObject.position] as [number, number, number];
    newPosition[axis] = parseFloat(value) || 0;
    updateObject(selectedObject.id, { position: newPosition });
  };

  const handleRotationChange = (axis: number, value: string) => {
    const newRotation = [...selectedObject.rotation] as [number, number, number];
    newRotation[axis] = (parseFloat(value) || 0) * (Math.PI / 180); // Convert to radians
    updateObject(selectedObject.id, { rotation: newRotation });
  };

  const handleScaleChange = (axis: number, value: string) => {
    const newScale = [...selectedObject.scale] as [number, number, number];
    newScale[axis] = parseFloat(value) || 1;
    updateObject(selectedObject.id, { scale: newScale });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-primary" />
          <h3 className="font-semibold">Properties</h3>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={selectedObject.name}
              onChange={(e) => updateObject(selectedObject.id, { name: e.target.value })}
              className="bg-input border-border"
            />
          </div>

          {/* Position */}
          <div className="space-y-3">
            <Label>Position</Label>
            <div className="grid grid-cols-3 gap-2">
              {['X', 'Y', 'Z'].map((axis, index) => (
                <div key={axis} className="space-y-1">
                  <Label className="text-xs text-muted-foreground">{axis}</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={selectedObject.position[index].toFixed(2)}
                    onChange={(e) => handlePositionChange(index, e.target.value)}
                    className="bg-input border-border"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Rotation */}
          <div className="space-y-3">
            <Label>Rotation (degrees)</Label>
            <div className="grid grid-cols-3 gap-2">
              {['X', 'Y', 'Z'].map((axis, index) => (
                <div key={axis} className="space-y-1">
                  <Label className="text-xs text-muted-foreground">{axis}</Label>
                  <Input
                    type="number"
                    step="1"
                    value={(selectedObject.rotation[index] * (180 / Math.PI)).toFixed(0)}
                    onChange={(e) => handleRotationChange(index, e.target.value)}
                    className="bg-input border-border"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Scale */}
          <div className="space-y-3">
            <Label>Scale</Label>
            <div className="grid grid-cols-3 gap-2">
              {['X', 'Y', 'Z'].map((axis, index) => (
                <div key={axis} className="space-y-1">
                  <Label className="text-xs text-muted-foreground">{axis}</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={selectedObject.scale[index].toFixed(2)}
                    onChange={(e) => handleScaleChange(index, e.target.value)}
                    className="bg-input border-border"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={selectedObject.color}
                onChange={(e) => updateObject(selectedObject.id, { color: e.target.value })}
                className="w-16 h-10 p-1 bg-input border-border cursor-pointer"
              />
              <Input
                type="text"
                value={selectedObject.color}
                onChange={(e) => updateObject(selectedObject.id, { color: e.target.value })}
                className="flex-1 bg-input border-border"
              />
            </div>
          </div>

          {/* Material Properties */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Metalness</Label>
                <span className="text-xs text-muted-foreground">
                  {selectedObject.metalness.toFixed(2)}
                </span>
              </div>
              <Slider
                value={[selectedObject.metalness]}
                onValueChange={([value]) => updateObject(selectedObject.id, { metalness: value })}
                max={1}
                step={0.01}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Roughness</Label>
                <span className="text-xs text-muted-foreground">
                  {selectedObject.roughness.toFixed(2)}
                </span>
              </div>
              <Slider
                value={[selectedObject.roughness]}
                onValueChange={([value]) => updateObject(selectedObject.id, { roughness: value })}
                max={1}
                step={0.01}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default PropertiesPanel;

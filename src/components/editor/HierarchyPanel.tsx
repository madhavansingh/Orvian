import { useEditorStore } from '@/store/editorStore';
import { Button } from '@/components/ui/button';
import { Layers, Trash2, Copy } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const HierarchyPanel = () => {
  const { objects, selectedObjectId, selectObject, deleteObject, duplicateObject } = useEditorStore();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" />
          <h3 className="font-semibold">Hierarchy</h3>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {objects.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No objects in scene. Add objects from the toolbar.
            </div>
          ) : (
            objects.map((object) => {
              const isSelected = selectedObjectId === object.id;
              return (
                <div
                  key={object.id}
                  className={`
                    group flex items-center justify-between p-2 rounded cursor-pointer
                    transition-colors
                    ${isSelected 
                      ? 'bg-primary/20 text-primary' 
                      : 'hover:bg-muted'
                    }
                  `}
                  onClick={() => selectObject(object.id)}
                >
                  <span className="text-sm truncate flex-1">{object.name}</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateObject(object.id);
                      }}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteObject(object.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default HierarchyPanel;

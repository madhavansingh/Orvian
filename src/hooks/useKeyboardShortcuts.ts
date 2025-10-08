import { useEffect } from 'react';
import { useEditorStore } from '@/store/editorStore';

export const useKeyboardShortcuts = () => {
  const addObject = useEditorStore(state => state.addObject);
  const deleteObject = useEditorStore(state => state.deleteObject);
  const duplicateObject = useEditorStore(state => state.duplicateObject);
  const selectedObjectId = useEditorStore(state => state.selectedObjectId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Object shortcuts (without modifiers)
      if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'c':
            addObject('cube', 'primitive');
            break;
          case 's':
            addObject('sphere', 'primitive');
            break;
          case 'y':
            addObject('cylinder', 'primitive');
            break;
          case 'p':
            addObject('plane', 'primitive');
            break;
          case 'n':
            addObject('cone', 'primitive');
            break;
          case 't':
            addObject('torus', 'primitive');
            break;
          case 'l':
            addObject('directional', 'light');
            break;
        }
      }

      // Delete selected object
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedObjectId) {
        e.preventDefault();
        deleteObject(selectedObjectId);
      }

      // Duplicate selected object (Ctrl/Cmd + D)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd' && selectedObjectId) {
        e.preventDefault();
        duplicateObject(selectedObjectId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addObject, deleteObject, duplicateObject, selectedObjectId]);
};

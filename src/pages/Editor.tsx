import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/editor/Navbar';
import Toolbar from '@/components/editor/Toolbar';
import Viewport from '@/components/editor/Viewport';
import PropertiesPanel from '@/components/editor/PropertiesPanel';
import HierarchyPanel from '@/components/editor/HierarchyPanel';
import { useEditorStore } from '@/store/editorStore';
import { motion } from 'framer-motion';

const Editor = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const loadProjectsFromStorage = useEditorStore(state => state.loadProjectsFromStorage);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      loadProjectsFromStorage();
    }
  }, [isAuthenticated, navigate, loadProjectsFromStorage]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Navbar />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Toolbar */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-16 bg-panel border-r border-border flex flex-col items-center py-4"
        >
          <Toolbar />
        </motion.div>

        {/* Main Viewport */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Viewport />
        </div>

        {/* Right Panels */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="w-80 bg-panel border-l border-border flex flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-auto">
            <HierarchyPanel />
          </div>
          <div className="flex-1 overflow-auto border-t border-border">
            <PropertiesPanel />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Editor;

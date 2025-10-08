import { create } from 'zustand';
import * as THREE from 'three';

export type PrimitiveType = 'cube' | 'sphere' | 'cylinder' | 'plane';

export interface SceneObject {
  id: string;
  name: string;
  type: PrimitiveType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  metalness: number;
  roughness: number;
}

export interface Project {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  objects: SceneObject[];
}

interface EditorState {
  currentProject: Project | null;
  selectedObjectId: string | null;
  objects: SceneObject[];
  projects: Project[];
  
  // Actions
  createProject: (name: string) => void;
  loadProject: (projectId: string) => void;
  saveProject: () => void;
  deleteProject: (projectId: string) => void;
  
  addObject: (type: PrimitiveType) => void;
  selectObject: (id: string | null) => void;
  updateObject: (id: string, updates: Partial<SceneObject>) => void;
  deleteObject: (id: string) => void;
  duplicateObject: (id: string) => void;
  
  loadProjectsFromStorage: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const createDefaultObject = (type: PrimitiveType): SceneObject => ({
  id: generateId(),
  name: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
  type,
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: [1, 1, 1],
  color: '#8b5cf6',
  metalness: 0.5,
  roughness: 0.5,
});

export const useEditorStore = create<EditorState>((set, get) => ({
  currentProject: null,
  selectedObjectId: null,
  objects: [],
  projects: [],

  loadProjectsFromStorage: () => {
    const stored = localStorage.getItem('orvian_projects');
    if (stored) {
      const projects = JSON.parse(stored);
      set({ projects });
    }
  },

  createProject: (name: string) => {
    const newProject: Project = {
      id: generateId(),
      name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      objects: [],
    };
    
    const projects = [...get().projects, newProject];
    localStorage.setItem('orvian_projects', JSON.stringify(projects));
    
    set({ 
      currentProject: newProject, 
      objects: [],
      projects,
      selectedObjectId: null 
    });
  },

  loadProject: (projectId: string) => {
    const project = get().projects.find(p => p.id === projectId);
    if (project) {
      set({ 
        currentProject: project, 
        objects: project.objects,
        selectedObjectId: null 
      });
    }
  },

  saveProject: () => {
    const { currentProject, objects, projects } = get();
    if (!currentProject) return;

    const updatedProject = {
      ...currentProject,
      objects,
      updatedAt: Date.now(),
    };

    const updatedProjects = projects.map(p => 
      p.id === currentProject.id ? updatedProject : p
    );

    localStorage.setItem('orvian_projects', JSON.stringify(updatedProjects));
    
    set({ 
      currentProject: updatedProject,
      projects: updatedProjects 
    });
  },

  deleteProject: (projectId: string) => {
    const projects = get().projects.filter(p => p.id !== projectId);
    localStorage.setItem('orvian_projects', JSON.stringify(projects));
    
    set({ projects });
    
    if (get().currentProject?.id === projectId) {
      set({ currentProject: null, objects: [], selectedObjectId: null });
    }
  },

  addObject: (type: PrimitiveType) => {
    const newObject = createDefaultObject(type);
    set({ objects: [...get().objects, newObject] });
  },

  selectObject: (id: string | null) => {
    set({ selectedObjectId: id });
  },

  updateObject: (id: string, updates: Partial<SceneObject>) => {
    set({
      objects: get().objects.map(obj => 
        obj.id === id ? { ...obj, ...updates } : obj
      )
    });
  },

  deleteObject: (id: string) => {
    set({
      objects: get().objects.filter(obj => obj.id !== id),
      selectedObjectId: get().selectedObjectId === id ? null : get().selectedObjectId
    });
  },

  duplicateObject: (id: string) => {
    const object = get().objects.find(obj => obj.id === id);
    if (object) {
      const newObject = {
        ...object,
        id: generateId(),
        name: `${object.name} Copy`,
        position: [
          object.position[0] + 1,
          object.position[1],
          object.position[2]
        ] as [number, number, number],
      };
      set({ objects: [...get().objects, newObject] });
    }
  },
}));

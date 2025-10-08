import { create } from 'zustand';
import * as THREE from 'three';

export type PrimitiveType = 'cube' | 'sphere' | 'cylinder' | 'plane' | 'cone' | 'torus' | 'capsule' | 'pyramid';
export type EnvironmentType = 'tree' | 'grass' | 'rock' | 'water' | 'cloud' | 'chair' | 'table';
export type LightType = 'directional' | 'point' | 'spot' | 'ambient';
export type ObjectType = PrimitiveType | EnvironmentType | LightType;

export interface SceneObject {
  id: string;
  name: string;
  type: ObjectType;
  category: 'primitive' | 'environment' | 'light';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  metalness: number;
  roughness: number;
  texture?: string;
  intensity?: number; // for lights
  castShadow?: boolean;
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
  gridVisible: boolean;
  gridSize: number;
  skyMode: 'day' | 'night';
  
  // Actions
  createProject: (name: string) => void;
  loadProject: (projectId: string) => void;
  saveProject: () => void;
  deleteProject: (projectId: string) => void;
  
  addObject: (type: ObjectType, category: 'primitive' | 'environment' | 'light') => void;
  selectObject: (id: string | null) => void;
  updateObject: (id: string, updates: Partial<SceneObject>) => void;
  deleteObject: (id: string) => void;
  duplicateObject: (id: string) => void;
  
  toggleGrid: () => void;
  setGridSize: (size: number) => void;
  toggleSkyMode: () => void;
  
  loadProjectsFromStorage: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const createDefaultObject = (type: ObjectType, category: 'primitive' | 'environment' | 'light'): SceneObject => {
  const base = {
    id: generateId(),
    name: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
    type,
    category,
    position: [0, 0, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    scale: [1, 1, 1] as [number, number, number],
    color: '#8b5cf6',
    metalness: 0.5,
    roughness: 0.5,
    castShadow: true,
  };

  // Category-specific defaults
  if (category === 'light') {
    return { ...base, intensity: 1, color: '#ffffff' };
  }
  
  if (category === 'environment') {
    const envDefaults: Record<string, Partial<SceneObject>> = {
      tree: { color: '#2d5016', scale: [1, 2, 1] },
      grass: { color: '#4ade80', scale: [5, 0.1, 5], position: [0, 0, 0] },
      rock: { color: '#6b7280', metalness: 0.1, roughness: 0.9 },
      water: { color: '#0ea5e9', metalness: 0.9, roughness: 0.1, scale: [10, 0.1, 10] },
      cloud: { color: '#ffffff', metalness: 0, roughness: 1, position: [0, 5, 0] },
      chair: { color: '#8b5cf6' },
      table: { color: '#78350f', scale: [2, 0.1, 1] },
    };
    return { ...base, ...envDefaults[type as EnvironmentType] };
  }

  return base;
};

export const useEditorStore = create<EditorState>((set, get) => ({
  currentProject: null,
  selectedObjectId: null,
  objects: [],
  projects: [],
  gridVisible: true,
  gridSize: 1,
  skyMode: 'day',

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

  addObject: (type: ObjectType, category: 'primitive' | 'environment' | 'light') => {
    const newObject = createDefaultObject(type, category);
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

  toggleGrid: () => set({ gridVisible: !get().gridVisible }),
  setGridSize: (size: number) => set({ gridSize: size }),
  toggleSkyMode: () => set({ skyMode: get().skyMode === 'day' ? 'night' : 'day' }),
}));

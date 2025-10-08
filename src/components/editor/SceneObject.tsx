import { useRef, useState } from 'react';
import { useEditorStore, SceneObject as SceneObjectType } from '@/store/editorStore';
import { Mesh } from 'three';
import { SceneObjectGeometry } from './SceneObjectGeometry';

interface SceneObjectProps {
  object: SceneObjectType;
}

const SceneObject = ({ object }: SceneObjectProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const selectedObjectId = useEditorStore(state => state.selectedObjectId);
  const selectObject = useEditorStore(state => state.selectObject);
  const updateObject = useEditorStore(state => state.updateObject);

  const isSelected = selectedObjectId === object.id;

  const handleClick = (e: any) => {
    e.stopPropagation();
    selectObject(object.id);
  };

  // Don't render lights as meshes
  if (object.category === 'light') {
    return null;
  }

  // Handle special rendering for environment objects
  const isCompositeObject = ['tree', 'chair'].includes(object.type);

  return (
    <group
      position={object.position}
      rotation={object.rotation}
      scale={object.scale}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {isCompositeObject ? (
        // For composite objects, render the geometry directly
        <SceneObjectGeometry type={object.type} />
      ) : (
        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
        >
          <SceneObjectGeometry type={object.type} />
          <meshStandardMaterial
            color={object.color}
            metalness={object.metalness}
            roughness={object.roughness}
            emissive={isSelected ? '#8b5cf6' : hovered ? '#6366f1' : '#000000'}
            emissiveIntensity={isSelected ? 0.3 : hovered ? 0.1 : 0}
          />
        </mesh>
      )}
      {isSelected && !isCompositeObject && (
        <lineSegments>
          <edgesGeometry args={[meshRef.current?.geometry!]} />
          <lineBasicMaterial color="#8b5cf6" linewidth={2} />
        </lineSegments>
      )}
    </group>
  );
};

export default SceneObject;

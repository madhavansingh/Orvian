import { useRef, useState } from 'react';
import { useEditorStore, SceneObject as SceneObjectType } from '@/store/editorStore';
import { Mesh } from 'three';

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

  const renderGeometry = () => {
    switch (object.type) {
      case 'cube':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.5, 32, 32]} />;
      case 'cylinder':
        return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />;
      case 'plane':
        return <planeGeometry args={[1, 1]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={object.position}
      rotation={object.rotation}
      scale={object.scale}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      {renderGeometry()}
      <meshStandardMaterial
        color={object.color}
        metalness={object.metalness}
        roughness={object.roughness}
        emissive={isSelected ? '#8b5cf6' : hovered ? '#6366f1' : '#000000'}
        emissiveIntensity={isSelected ? 0.3 : hovered ? 0.1 : 0}
      />
      {isSelected && (
        <lineSegments>
          <edgesGeometry args={[meshRef.current?.geometry!]} />
          <lineBasicMaterial color="#8b5cf6" linewidth={2} />
        </lineSegments>
      )}
    </mesh>
  );
};

export default SceneObject;

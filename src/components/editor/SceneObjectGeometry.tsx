import { ObjectType } from '@/store/editorStore';
import { useRef } from 'react';
import * as THREE from 'three';

interface GeometryProps {
  type: ObjectType;
}

export const SceneObjectGeometry = ({ type }: GeometryProps) => {
  switch (type) {
    // Primitives
    case 'cube':
      return <boxGeometry args={[1, 1, 1]} />;
    case 'sphere':
      return <sphereGeometry args={[0.5, 32, 32]} />;
    case 'cylinder':
      return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />;
    case 'plane':
      return <planeGeometry args={[1, 1]} />;
    case 'cone':
      return <coneGeometry args={[0.5, 1, 32]} />;
    case 'torus':
      return <torusGeometry args={[0.4, 0.15, 16, 100]} />;
    case 'capsule':
      return <capsuleGeometry args={[0.3, 0.6, 4, 8]} />;
    case 'pyramid':
      return <coneGeometry args={[0.5, 1, 4]} />;
    
    // Environment objects
    case 'tree':
      return <TreeGeometry />;
    case 'grass':
      return <planeGeometry args={[1, 1, 8, 8]} />;
    case 'rock':
      return <dodecahedronGeometry args={[0.5, 1]} />;
    case 'water':
      return <planeGeometry args={[1, 1, 32, 32]} />;
    case 'cloud':
      return <sphereGeometry args={[0.5, 8, 8]} />;
    case 'chair':
      return <ChairGeometry />;
    case 'table':
      return <boxGeometry args={[1, 1, 1]} />;
    
    default:
      return <boxGeometry args={[1, 1, 1]} />;
  }
};

// Tree - composed of trunk and foliage
const TreeGeometry = () => {
  return (
    <group>
      {/* Trunk */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 0.8, 8]} />
        <meshStandardMaterial color="#4a2511" roughness={0.9} />
      </mesh>
      {/* Foliage - cone shape */}
      <mesh position={[0, 0.3, 0]}>
        <coneGeometry args={[0.4, 0.8, 8]} />
        <meshStandardMaterial color="#2d5016" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <coneGeometry args={[0.3, 0.6, 8]} />
        <meshStandardMaterial color="#3a6b1f" roughness={0.8} />
      </mesh>
    </group>
  );
};

// Simple chair
const ChairGeometry = () => {
  return (
    <group>
      {/* Seat */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.5, 0.05, 0.5]} />
      </mesh>
      {/* Back */}
      <mesh position={[0, 0.5, -0.225]}>
        <boxGeometry args={[0.5, 0.5, 0.05]} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.2, 0, -0.2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
      </mesh>
      <mesh position={[0.2, 0, -0.2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
      </mesh>
      <mesh position={[-0.2, 0, 0.2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
      </mesh>
      <mesh position={[0.2, 0, 0.2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
      </mesh>
    </group>
  );
};

export default SceneObjectGeometry;
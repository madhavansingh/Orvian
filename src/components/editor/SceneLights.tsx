import { useEditorStore } from '@/store/editorStore';
import { useRef } from 'react';
import * as THREE from 'three';

const SceneLights = () => {
  const { objects, selectedObjectId, selectObject } = useEditorStore();
  const lights = objects.filter(obj => obj.category === 'light');

  return (
    <>
      {lights.map((light) => {
        const isSelected = selectedObjectId === light.id;
        const intensity = light.intensity || 1;

        switch (light.type) {
          case 'directional':
            return (
              <group key={light.id}>
                <directionalLight
                  position={light.position}
                  intensity={intensity}
                  color={light.color}
                  castShadow
                />
                {/* Visual helper */}
                <mesh
                  position={light.position}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectObject(light.id);
                  }}
                >
                  <sphereGeometry args={[0.2, 16, 16]} />
                  <meshStandardMaterial
                    color={light.color}
                    emissive={light.color}
                    emissiveIntensity={isSelected ? 1 : 0.5}
                  />
                </mesh>
              </group>
            );

          case 'point':
            return (
              <group key={light.id}>
                <pointLight
                  position={light.position}
                  intensity={intensity}
                  color={light.color}
                  castShadow
                />
                {/* Visual helper */}
                <mesh
                  position={light.position}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectObject(light.id);
                  }}
                >
                  <sphereGeometry args={[0.15, 16, 16]} />
                  <meshStandardMaterial
                    color={light.color}
                    emissive={light.color}
                    emissiveIntensity={isSelected ? 1 : 0.7}
                  />
                </mesh>
              </group>
            );

          case 'spot':
            return (
              <group key={light.id}>
                <spotLight
                  position={light.position}
                  intensity={intensity}
                  color={light.color}
                  angle={Math.PI / 6}
                  penumbra={0.2}
                  castShadow
                />
                {/* Visual helper */}
                <mesh
                  position={light.position}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectObject(light.id);
                  }}
                >
                  <coneGeometry args={[0.15, 0.3, 16]} />
                  <meshStandardMaterial
                    color={light.color}
                    emissive={light.color}
                    emissiveIntensity={isSelected ? 1 : 0.6}
                  />
                </mesh>
              </group>
            );

          default:
            return null;
        }
      })}
    </>
  );
};

export default SceneLights;
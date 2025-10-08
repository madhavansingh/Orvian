import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { useEditorStore } from '@/store/editorStore';
import SceneObject from './SceneObject';

const Viewport = () => {
  const objects = useEditorStore(state => state.objects);

  return (
    <div className="w-full h-full bg-viewport">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        {/* Grid Helper */}
        <Grid
          args={[20, 20]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#6b7280"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#8b5cf6"
          fadeDistance={25}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid
        />

        {/* Scene Objects */}
        {objects.map((obj) => (
          <SceneObject key={obj.id} object={obj} />
        ))}

        {/* Camera Controls */}
        <OrbitControls
          makeDefault
          minDistance={1}
          maxDistance={50}
          enableDamping
          dampingFactor={0.05}
        />

        {/* Gizmo Helper */}
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport 
            axisColors={['#f87171', '#4ade80', '#60a5fa']} 
            labelColor="white"
          />
        </GizmoHelper>
      </Canvas>
    </div>
  );
};

export default Viewport;

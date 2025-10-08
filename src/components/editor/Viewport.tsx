import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, GizmoHelper, GizmoViewport, Sky } from '@react-three/drei';
import { useEditorStore } from '@/store/editorStore';
import SceneObject from './SceneObject';
import SceneLights from './SceneLights';

const Viewport = () => {
  const { objects, gridVisible, gridSize, skyMode } = useEditorStore();

  return (
    <div className="w-full h-full bg-viewport">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        shadows
      >
        {/* Sky */}
        {skyMode === 'day' ? (
          <Sky sunPosition={[100, 20, 100]} />
        ) : (
          <color attach="background" args={['#0a0a1a']} />
        )}

        {/* Lighting */}
        <ambientLight intensity={skyMode === 'day' ? 0.5 : 0.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={skyMode === 'day' ? 1 : 0.3}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -5]} intensity={skyMode === 'day' ? 0.5 : 0.2} />

        {/* Grid Helper */}
        {gridVisible && (
          <Grid
            args={[20, 20]}
            cellSize={gridSize}
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
        )}

        {/* Scene Lights (user-created) */}
        <SceneLights />

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

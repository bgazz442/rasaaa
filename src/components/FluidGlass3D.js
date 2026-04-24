import * as THREE from 'three';
import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  useFBO,
  Preload,
  MeshTransmissionMaterial,
  Text,
} from '@react-three/drei';
import { easing } from 'maath';

export default function FluidGlass3D({ 
  navItems = [], 
  activeIndex = 0,
  onItemHover,
  onItemLeave,
}) {
  return (
    <Canvas 
      camera={{ position: [0, 0, 15], fov: 45 }} 
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <FluidGlassBar 
        navItems={navItems}
        activeIndex={activeIndex}
        onItemHover={onItemHover}
        onItemLeave={onItemLeave}
      />
      <Preload all />
    </Canvas>
  );
}

// Bar Mode - Designed for navbar integration
function FluidGlassBar({ navItems, activeIndex, onItemHover, onItemLeave }) {
  const barRef = useRef();
  const textGroupRef = useRef();
  const buffer = useFBO();
  
  // Fallback geometry - BoxGeometry karena bar.glb tidak tersedia
  const barGeometry = useMemo(() => new THREE.BoxGeometry(10, 1, 0.8), []);
  const { viewport, camera, gl } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const [hoveredText, setHoveredText] = useState(null);
  
  // Device detection for responsive sizing
  const getScale = () => {
    const width = window.innerWidth;
    if (width < 768) return 0.08;
    if (width < 1024) return 0.12;
    return 0.15;
  };
  
  const [scale, setScale] = useState(getScale());
  
  useEffect(() => {
    const handleResize = () => setScale(getScale());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state, delta) => {
    const { pointer } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    
    // Position bar at top of navbar area
    const destY = v.height / 2 - 0.5;
    
    // Smooth follow with easing
    easing.damp3(barRef.current.position, [0, destY, 14], 0.12, delta);
    easing.damp3(textGroupRef.current.position, [0, destY, 14.5], 0.12, delta);
    
    // Subtle rotation based on pointer for fluid feel
    const targetRotX = (pointer.y * 0.1);
    const targetRotY = (pointer.x * 0.1);
    easing.damp(barRef.current.rotation, 'x', targetRotX, 0.1, delta);
    easing.damp(barRef.current.rotation, 'y', targetRotY, 0.1, delta);
    
    // Render scene to FBO
    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    
    // Clear color
    gl.setClearColor(0x000000, 0);
  });

  // Position nav items
  const spacing = useMemo(() => {
    const width = window.innerWidth;
    if (width < 1024) return 1.2;
    return 1.8;
  }, []);

  return (
    <>
      {/* Portal for background content */}
      {createPortal(
        <>
          <color attach="background" args={['transparent']} />
        </>,
        scene
      )}
      
      {/* Background plane with FBO texture */}
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent opacity={0} />
      </mesh>
      
      {/* Glass Bar Mesh */}
      <mesh 
        ref={barRef}
        scale={scale}
        rotation-x={Math.PI / 2}
        geometry={barGeometry}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          transmission={1}
          roughness={0.05}
          thickness={8}
          ior={1.15}
          chromaticAberration={0.06}
          anisotropy={0.02}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.05}
          color="#ffffff"
          attenuationColor="#ffffff"
          attenuationDistance={0.5}
          background={new THREE.Color('transparent')}
        />
      </mesh>
      
      {/* Nav Text Labels */}
      <group ref={textGroupRef}>
        {navItems.map((item, index) => {
          const isActive = activeIndex === index;
          const xOffset = (index - (navItems.length - 1) / 2) * spacing;
          
          return (
            <Text
              key={item.label}
              position={[xOffset, 0, 0]}
              fontSize={0.18}
              color={isActive ? '#1A1A1A' : '#5C5548'}
              anchorX="center"
              anchorY="middle"
              maxWidth={2}
              lineHeight={1}
              letterSpacing={-0.02}
              font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiJ-Ek-_EeA.woff2"
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredText(index);
                onItemHover?.(index);
              }}
              onPointerOut={() => {
                setHoveredText(null);
                onItemLeave?.();
              }}
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = item.link;
              }}
              material-transparent={true}
            >
              {item.label}
            </Text>
          );
        })}
      </group>
    </>
  );
}

// Lens Mode - For floating lens effect (alternative)
export function FluidGlassLens({ scale = 0.2, ior = 1.15, thickness = 5 }) {
  const lensRef = useRef();
  const buffer = useFBO();
  
  // Fallback geometry - CylinderGeometry karena lens.glb tidak tersedia
  const lensGeometry = useMemo(() => new THREE.CylinderGeometry(1, 1, 0.5, 32), []);
  const { viewport, camera, gl } = useThree();
  const [scene] = useState(() => new THREE.Scene());

  useFrame((state, delta) => {
    const { pointer } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    
    // Follow pointer with smooth easing
    const destX = (pointer.x * v.width) / 3;
    const destY = (pointer.y * v.height) / 3;
    easing.damp3(lensRef.current.position, [destX, destY, 14], 0.1, delta);
    
    // Render
    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0x000000, 0);
  });

  return (
    <>
      {createPortal(<color attach="background" args={['transparent']} />, scene)}
      
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent opacity={0} />
      </mesh>
      
      <mesh
        ref={lensRef}
        scale={scale}
        rotation-x={Math.PI / 2}
        geometry={lensGeometry}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          transmission={1}
          roughness={0}
          thickness={thickness}
          ior={ior}
          chromaticAberration={0.1}
          anisotropy={0.01}
        />
      </mesh>
    </>
  );
}

// Cube Mode - Alternative shape
export function FluidGlassCube({ scale = 0.15, ior = 1.15 }) {
  const cubeRef = useRef();
  const buffer = useFBO();
  
  // Fallback geometry - BoxGeometry karena cube.glb tidak tersedia
  const cubeGeometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const { viewport, camera, gl } = useThree();
  const [scene] = useState(() => new THREE.Scene());

  useFrame((state, delta) => {
    const { pointer } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    
    const destX = (pointer.x * v.width) / 4;
    const destY = (pointer.y * v.height) / 4;
    easing.damp3(cubeRef.current.position, [destX, destY, 14], 0.08, delta);
    
    // Add rotation
    cubeRef.current.rotation.x += delta * 0.2;
    cubeRef.current.rotation.y += delta * 0.3;
    
    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0x000000, 0);
  });

  return (
    <>
      {createPortal(<color attach="background" args={['transparent']} />, scene)}
      
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent opacity={0} />
      </mesh>
      
      <mesh
        ref={cubeRef}
        scale={scale}
        geometry={cubeGeometry}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          transmission={1}
          roughness={0.1}
          thickness={10}
          ior={ior}
          chromaticAberration={0.08}
        />
      </mesh>
    </>
  );
}

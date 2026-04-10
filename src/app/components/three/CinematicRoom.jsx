'use client';
import { usePerformance } from '@/app/context/PerformanceContext';

function SpaceScene({ scrollYProgress }) {
  const cameraRef = useRef();
  const asteroidRef = useRef();
  const { performanceTier } = usePerformance();
  const [warpSpeed, setWarpSpeed] = useState(false);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Performance-based limits
  const currentAsteroids = performanceTier === 'low' ? 40 : (performanceTier === 'medium' ? 100 : asteroidCount);

  // Listen for Warp Jump command from Navbar
  useEffect(() => {
    const triggerWarp = () => {
       setWarpSpeed(true);
       setTimeout(() => setWarpSpeed(false), 800);
    };
    
    window.addEventListener('WARP_JUMP', triggerWarp);
    return () => {
      window.removeEventListener('WARP_JUMP', triggerWarp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!cameraRef.current) return;
    
    const scroll = scrollYProgress.get() || 0;
    
    // Scrollytelling Space Flight
    const targetZ = -(scroll * 120);
    const targetRotZ = Math.sin(scroll * Math.PI) * 0.15;
    const targetRotY = Math.cos(scroll * Math.PI) * 0.1;

    cameraRef.current.position.z = THREE.MathUtils.damp(cameraRef.current.position.z, targetZ, 4, delta);
    cameraRef.current.rotation.z = THREE.MathUtils.damp(cameraRef.current.rotation.z, targetRotZ, 4, delta);
    cameraRef.current.rotation.y = THREE.MathUtils.damp(cameraRef.current.rotation.y, targetRotY, 4, delta);

    // Warp Jump stretch effect
    const targetFov = warpSpeed ? 140 : 70;
    cameraRef.current.fov = THREE.MathUtils.damp(cameraRef.current.fov, targetFov, 10, delta);
    if (warpSpeed) cameraRef.current.position.z -= 3;
    cameraRef.current.updateProjectionMatrix();

    // Rotate Asteroids
    if (asteroidRef.current) {
      for (let i = 0; i < currentAsteroids; i++) {
        const ast = asteroidData[i];
        ast.rot[0] += ast.spinSpeed;
        ast.rot[1] += ast.spinSpeed;
        dummy.position.set(ast.pos[0], ast.pos[1], ast.pos[2]);
        dummy.rotation.set(ast.rot[0], ast.rot[1], ast.rot[2]);
        dummy.scale.set(ast.scale, ast.scale, ast.scale);
        dummy.updateMatrix();
        asteroidRef.current.setMatrixAt(i, dummy.matrix);
      }
      asteroidRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <fog attach="fog" args={['#020208', 30, 180]} />
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 0]} fov={70} />
      
      <ambientLight intensity={0.5} />
      
      {/* Exoplanets - Reduced complexity for low-tier devices */}
      {planets.map((p, i) => (
        <mesh key={`planet-${i}`} position={p.position}>
          <icosahedronGeometry args={[p.size, performanceTier === 'low' ? 0 : 1]} />
          <meshBasicMaterial color={p.color} wireframe opacity={0.2} transparent />
        </mesh>
      ))}

      {/* Asteroid Field */}
      <instancedMesh ref={asteroidRef} args={[null, null, currentAsteroids]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#1a1a2e" wireframe />
      </instancedMesh>
      
      <Stars 
        radius={100} 
        depth={200} 
        count={performanceTier === 'high' ? 2000 : (performanceTier === 'medium' ? 800 : 300)} 
        factor={6} 
        saturation={1} 
        fade 
        speed={performanceTier === 'low' ? 1 : 3} 
      />
    </>
  );
}

export default function CinematicRoom() {
  const { scrollYProgress } = useScroll();
  const { dpr } = usePerformance();

  return (
    <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-[#020208] pointer-events-none">
      <Canvas dpr={dpr} gl={{ powerPreference: "high-performance", antialias: false }}>
        <SpaceScene scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
}

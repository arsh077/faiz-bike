import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect, Suspense } from "react";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;
  
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Premium subtle wave effect
    float waveStrength = 0.005;
    float waveSpeed = 0.5;
    
    // Base ambient movement
    float waveX = sin(uv.y * 5.0 + uTime * waveSpeed) * waveStrength;
    float waveY = cos(uv.x * 5.0 + uTime * waveSpeed * 0.5) * waveStrength;
    
    // Mouse interaction ripple
    float dist = distance(uv, uMouse);
    float mouseRipple = 0.0;
    if (uHover > 0.0) {
        float rippleStrength = 0.02 * uHover;
        float rippleFreq = 10.0;
        mouseRipple = sin(dist * rippleFreq - uTime * 2.0) * rippleStrength * smoothstep(0.5, 0.0, dist);
    }

    vec2 distortedUv = uv + vec2(waveX + mouseRipple, waveY + mouseRipple);
    
    // Simple chromatic aberration for premium feel
    float r = texture2D(uTexture, distortedUv + vec2(0.002, 0.0) * uHover).r;
    float g = texture2D(uTexture, distortedUv).g;
    float b = texture2D(uTexture, distortedUv - vec2(0.002, 0.0) * uHover).b;
    
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

interface ImagePlaneProps {
  src: string;
  aspectRatio: number;
  isHovered: boolean;
  onReady: () => void;
}

function ImagePlane({ src, aspectRatio, isHovered, onReady }: ImagePlaneProps) {
  const texture = useTexture(src);
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const hoverValue = useRef(0);

  // Notify parent that texture is loaded
  useEffect(() => {
    onReady();
  }, [onReady]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
    }),
    [texture]
  );

  const scale = useMemo<[number, number, number]>(() => {
    return aspectRatio > 1 ? [aspectRatio, 1, 1] : [1, 1 / aspectRatio, 1];
  }, [aspectRatio]);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Smooth hover transition
      const targetHover = isHovered ? 1 : 0;
      hoverValue.current += (targetHover - hoverValue.current) * 0.1;
      material.uniforms.uHover.value = hoverValue.current;

      // Map normalized pointer (-1 to 1) to UV space (0 to 1)
      material.uniforms.uMouse.value.set(
        (pointer.x + 1) / 2,
        (pointer.y + 1) / 2
      );
    }
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

interface RevealWaveImageProps {
  src: string;
  className?: string;
  // Props kept for API compatibility but handled internally now for simpler logic
  revealRadius?: number; 
  revealSoftness?: number;
  pixelSize?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
}

export const RevealWaveImage = ({
  src,
  className = "h-full w-full",
}: RevealWaveImageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  
  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop";

  useEffect(() => {
    setIsCanvasReady(false);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    
    img.onload = () => {
      setAspectRatio(img.naturalWidth / img.naturalHeight);
      setCurrentSrc(src);
    };

    img.onerror = () => {
        const fallbackImg = new Image();
        fallbackImg.crossOrigin = "anonymous";
        fallbackImg.src = FALLBACK_IMAGE;
        fallbackImg.onload = () => {
             setAspectRatio(fallbackImg.naturalWidth / fallbackImg.naturalHeight);
             setCurrentSrc(FALLBACK_IMAGE);
        }
    }
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${className} bg-stone-900`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
        {/* 1. Base Image - Always Visible initially */}
        <img 
            src={currentSrc} 
            alt="background" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* 2. WebGL Layer - Fades IN when ready */}
        {aspectRatio !== null && (
            <div 
                className={`absolute inset-0 z-10 transition-opacity duration-1000 ${isCanvasReady ? 'opacity-100' : 'opacity-0'}`}
            >
                <Canvas
                    style={{ width: "100%", height: "100%" }}
                    gl={{ antialias: true, alpha: true }}
                    camera={{ position: [0, 0, 1] }}
                >
                    <Suspense fallback={null}>
                        <ImagePlane
                            src={currentSrc}
                            aspectRatio={aspectRatio}
                            isHovered={isHovered}
                            onReady={() => setTimeout(() => setIsCanvasReady(true), 500)} 
                        />
                    </Suspense>
                </Canvas>
            </div>
        )}
    </div>
  );
}
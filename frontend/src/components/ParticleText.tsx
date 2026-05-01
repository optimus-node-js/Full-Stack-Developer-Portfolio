import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface ParticleTextProps {
  defaultText?: string;
  hoverText?: string;
  className?: string;
}

const ParticleText = ({ 
  defaultText = "DEVELOPER", 
  hoverText = "RAHUL",
  className = ""
}: ParticleTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const originalPositionsRef = useRef<Float32Array | null>(null);
  const targetPositionsRef = useRef<Float32Array | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const animationFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const checkWebGLSupport = (): boolean => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch {
      return false;
    }
  };

  const getTextPositions = (text: string, width: number, height: number): Float32Array => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = width;
    canvas.height = height;
    
    const fontSize = Math.min(width / (text.length * 0.7), height * 0.8);
    ctx.font = `bold ${fontSize}px 'Poppins', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText(text, width / 2, height / 2);
    
    const imageData = ctx.getImageData(0, 0, width, height);
    const positions: number[] = [];
    const gap = 3;
    
    for (let y = 0; y < height; y += gap) {
      for (let x = 0; x < width; x += gap) {
        const index = (y * width + x) * 4;
        if (imageData.data[index + 3] > 128) {
          positions.push(
            (x - width / 2) * 0.1,
            -(y - height / 2) * 0.1,
            (Math.random() - 0.5) * 2
          );
        }
      }
    }
    
    return new Float32Array(positions);
  };

  const createRandomPositions = (count: number): Float32Array => {
    const positions = new Float32Array(count);
    for (let i = 0; i < count; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 30 + Math.random() * 50;
      positions[i] = Math.cos(angle) * radius;
      positions[i + 1] = (Math.random() - 0.5) * 60;
      positions[i + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 20;
    }
    return positions;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    if (!checkWebGLSupport()) {
      setWebGLSupported(false);
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;

    try {
      scene = new THREE.Scene();
      sceneRef.current = scene;

      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 50;
      cameraRef.current = camera;

      renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch {
      setWebGLSupported(false);
      return;
    }

    const textPositions = getTextPositions(defaultText, 400, 150);
    const particleCount = textPositions.length;
    const randomPositions = createRandomPositions(particleCount);
    
    originalPositionsRef.current = randomPositions;
    targetPositionsRef.current = textPositions;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(randomPositions.slice(), 3));

    const colors = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i += 3) {
      const t = i / particleCount;
      colors[i] = 0.5 + Math.sin(t * Math.PI * 2) * 0.5;
      colors[i + 1] = 0.3 + Math.cos(t * Math.PI * 2) * 0.3;
      colors[i + 2] = 1;
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    gsap.to(geometry.attributes.position.array, {
      endArray: Array.from(textPositions),
      duration: 2,
      ease: 'power3.out',
      onUpdate: () => {
        geometry.attributes.position.needsUpdate = true;
      }
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / height) * 2 + 1;
    };

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    container.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (particles) {
        particles.rotation.y += 0.001;
        particles.position.x = mouseRef.current.x * 2;
        particles.position.y = mouseRef.current.y * 2;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [defaultText]);

  useEffect(() => {
    if (!particlesRef.current || !containerRef.current) return;

    const geometry = particlesRef.current.geometry;
    const currentPositions = geometry.attributes.position.array as Float32Array;
    const textToShow = isHovered ? hoverText : defaultText;
    const newTargetPositions = getTextPositions(textToShow, 400, 150);

    const maxCount = Math.max(currentPositions.length, newTargetPositions.length);
    const paddedTarget = new Float32Array(maxCount);
    
    for (let i = 0; i < maxCount; i++) {
      if (i < newTargetPositions.length) {
        paddedTarget[i] = newTargetPositions[i];
      } else {
        paddedTarget[i] = (Math.random() - 0.5) * 100;
      }
    }

    gsap.to(currentPositions, {
      endArray: Array.from(paddedTarget.slice(0, currentPositions.length)),
      duration: 1,
      ease: 'power2.inOut',
      onUpdate: () => {
        geometry.attributes.position.needsUpdate = true;
      }
    });
  }, [isHovered, defaultText, hoverText]);

  if (!webGLSupported) {
    return (
      <div 
        className={`w-full h-full flex items-center justify-center ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-testid="particle-text-fallback"
      >
        <div className="text-center">
          <h2 className={`text-6xl md:text-8xl font-bold transition-all duration-500 ${
            isHovered 
              ? 'bg-gradient-to-r from-secondary via-accent to-secondary' 
              : 'bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground'
          } bg-clip-text text-transparent animate-pulse`}>
            {isHovered ? hoverText : defaultText}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid="particle-text-container"
    />
  );
};

export default ParticleText;

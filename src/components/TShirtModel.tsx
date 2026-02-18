import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function TShirtModel({ color }: { color: string }) {
    const { nodes, materials } = useGLTF('/shirt_baked.glb');
    const meshRef = useRef<THREE.Mesh>(null);

    // Smooth rotation animation if no user interaction is detected
    useFrame(() => {
        if (meshRef.current) {
            // Slow idle rotation
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <group dispose={null} scale={[7, 7, 7]} position={[0, 0.5, 0]}>
            <mesh
                ref={meshRef}
                castShadow
                receiveShadow
                geometry={(nodes.T_Shirt_male as any)?.geometry}
                material={materials.lambert1}
            >
                <meshStandardMaterial
                    color={color}
                    roughness={0.3}
                    metalness={0.1}
                    emissive={color}
                    emissiveIntensity={0.05}
                />
            </mesh>
        </group>
    );
}

useGLTF.preload('/shirt_baked.glb');

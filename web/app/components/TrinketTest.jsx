import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function TrinketTest(props) {
  const { scene } = useGLTF(props.input.file.asset.url);
  const groupRef = useRef();

  useEffect(() => {
    // return;
    // Center the geometry of each mesh so the pivot is at the center of the model
    scene.traverse((child) => {
      if (child.isMesh) {
        console.log(child);
        child.geometry.center(); // Ensures the geometry is centered around its own origin
      }
    });
  }, [scene]);

  // Rotate the entire group (which contains the model) around its own center
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01; // Apply rotation on the group's Y axis
    }
  });

  return (
    <group ref={groupRef} position={props.initialPosition}>
      <group>
        {/* <Center> */}
        <primitive object={scene} />
        {/* </Center> */}
      </group>
    </group>
  );
}

export default TrinketTest;

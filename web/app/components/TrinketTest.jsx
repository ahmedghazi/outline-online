import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, useGLTF, PivotControls } from "@react-three/drei";
import * as THREE from "three";

function TrinketTest({ initialPosition, file }) {
  // const { scene } = useGLTF(input.file.asset.file);
  const { scene } = useGLTF(file);
  const groupRef = useRef();
  const primitiveRef = useRef();
  console.log(initialPosition);

  useEffect(() => {
    // if (primitiveRef.current) {
    //   const worldPosition = primitiveRef.current.getWorldPosition();
    //   console.log(worldPosition);
    // }
  }, []);

  useEffect(() => {
    // scene.position.set([0, 0, 0]);
    // groupRef.current.position.set(initialPosition);
    // return;
    // Center the geometry of each mesh so the pivot is at the center of the model
    // scene.traverse((child) => {
    //   if (child.isMesh) {
    //     // console.log(child);
    //     child.geometry.center(); // Ensures the geometry is centered around its own origin
    //   }
    // });
  }, [scene]);

  // Rotate the entire group (which contains the model) around its own center
  useFrame(() => {
    if (groupRef.current) {
      // scene.rotation.y += 0.001;
      //prev was roation
      groupRef.current.rotation.x += 0.01;
      groupRef.current.rotation.y += 0.01;
      // const position = groupRef.current.position;
      // position.y += 0.01; // Apply rotation on the group's Y axis
    }
  });

  return (
    <group ref={groupRef} position={initialPosition}>
      <PivotControls>
        <primitive ref={primitiveRef} object={scene} />
      </PivotControls>
    </group>
  );
}

export default TrinketTest;

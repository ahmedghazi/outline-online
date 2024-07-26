"use client";
import React, { useRef, useState } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { TransformControls } from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";

const state = proxy({ current: null, mode: 0 });

const Trinket = (props) => {
  const gltf = useLoader(GLTFLoader, props.input.gltf.asset.url);
  const meshRef = useRef();
  // const snap = useSnapshot(state);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(
    (state, delta) => (meshRef.current.rotation.x += delta * Math.random() * 1)
  );
  // Return view, these are regular three.js elements expressed in JSX

  return (
    <>
      <primitive
        {...props}
        ref={meshRef}
        object={gltf.scene}
        children-0-castShadow
        dispotse={null}
        // Click sets the mesh as the new target
        onClick={(e) => (e.stopPropagation(), (state.current = props.name))}
      />
    </>
  );
};

export default Trinket;

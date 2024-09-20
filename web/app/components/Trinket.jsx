"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  Float,
  DragControls,
  Center,
  PivotControls,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { publish } from "pubsub-js";
import * as THREE from "three";

// import { DragControls } from "three/examples/jsm/controls/DragControls";
//https://www.youtube.com/watch?v=tBSbgRRpNzI
// const state = proxy({ current: null, mode: 0 });

const Trinket = ({ file, initialPosition, metadata }) => {
  const { scene } = useGLTF(file);
  const group = useRef();
  const primitiveRef = useRef();
  const [isHover, setIsHover] = useState(false);

  const randRotations = useMemo(() => {
    const x = Math.random() * 0.001;
    const y = Math.random() * 0.005;
    return { x, y };
  }, []);

  // console.log(primitiveRef.current);
  useFrame((state) => {
    if (isHover) return;
    if (!group.current) return;

    primitiveRef.current.rotation.x += randRotations.x;
    primitiveRef.current.rotation.y += 0.00001;
  });

  const _onPointerOver = () => {
    // console.log(props.input.link);
    setIsHover(true);
    publish("TRINKET_INFO", metadata);
    // publish("TRINKET_INFO", "here is the infos");
  };
  const _onPointerOut = () => {
    setIsHover(false);
    publish("TRINKET_INFO", "");
  };

  return (
    <>
      <DragControls>
        <group
          ref={group}
          position={initialPosition}
          onPointerOver={_onPointerOver}
          onPointerOut={_onPointerOut}>
          {/* <PivotControls> */}

          <primitive
            castShadow={false}
            ref={primitiveRef}
            position={[0, 0, 0]}
            object={scene}
            scale={[1, 1, 1]}
          />

          {/* </PivotControls> */}
        </group>
      </DragControls>
    </>
  );
};

export default Trinket;

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
// import { TransformControls } from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";
import { useRouter } from "next/navigation";
import { _linkResolver, _randomNum } from "../utils/utils";
import { useDrag } from "react-use-gesture";
import { publish } from "pubsub-js";
import * as THREE from "three";

// import { DragControls } from "three/examples/jsm/controls/DragControls";
//https://www.youtube.com/watch?v=tBSbgRRpNzI
const state = proxy({ current: null, mode: 0 });

const Trinket = (props) => {
  const { scene } = useGLTF(props.input.file.asset.url);
  const group = useRef();
  const primitiveRef = useRef();
  const [isHover, setIsHover] = useState(false);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    // Center the geometry of the model locally
    scene.traverse((child) => {
      if (child.isMesh) {
        child.geometry.center(); // Ensures that the model's geometry is centered on its own origin
      }
    });
  }, [scene]);

  // console.log(props.parent);
  const randRotations = useMemo(() => {
    const x = Math.random() * 0.01;
    const y = Math.random() * 0.005;
    return { x, y };
  }, []);

  useFrame(() => {
    if (isHover) return;
    if (!group.current) return;
    // return;
    primitiveRef.current.rotation.x += randRotations.x;
    group.current.rotation.y += randRotations.y;
  });

  const _onPointerOver = () => {
    // console.log(props.input.link);
    setIsHover(true);
    publish("TRINKET_INFO", props.input.metadata);
    // publish("TRINKET_INFO", "here is the infos");
  };
  const _onPointerOut = () => {
    setIsHover(false);
    publish("TRINKET_INFO", "");
  };
  const _onCentered = ({ container, height }) => {
    console.log(container);
    console.log(height);
    // container.position = props.position;
    setPosition(props.position);
  };
  return (
    <>
      {/* <DragControls
        dragConfig={
          {
            // dragLimits: [
            //   [0, props.windowSize.w],
            //   [0, props.windowSize.h],
            //   [0, 0],
            // ],
          }
        }> */}
      {/* <PivotControls> */}
      <group
        ref={group}
        onPointerOver={_onPointerOver}
        onPointerOut={_onPointerOut}>
        {/* <Center onCentered={_onCentered}> */}

        <primitive
          ref={primitiveRef}
          object={scene}
          name={name}
          position={props.position}
        />

        {/* <axesHelper args={[5]} /> */}
      </group>
      {/* </PivotControls> */}
      {/* </DragControls> */}
    </>
  );
};

export default Trinket;

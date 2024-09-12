"use client";
import React, { useEffect, useRef, useState } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float, DragControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { TransformControls } from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";
import { useRouter } from "next/navigation";
import { _linkResolver, _randomNum } from "../utils/utils";
import { useDrag } from "react-use-gesture";
import { publish } from "pubsub-js";
// import { DragControls } from "three/examples/jsm/controls/DragControls";
//https://www.youtube.com/watch?v=tBSbgRRpNzI
const state = proxy({ current: null, mode: 0 });

const Trinket = (props) => {
  const { scene } = useGLTF(props.input.file.asset.url);
  const groupRef = useRef();
  const primitiveRef = useRef();
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);

  const [position, setPosition] = useState(props.position);
  // const { size, viewport } = useThree();
  // console.log(size, viewport);
  useEffect(() => {
    primitiveRef.current.position.set(0.5, 0.5, 0);
    groupRef.current.position.set(-0.5, -0.5, 0);
  }, []);

  // console.log(position);
  const _onClick = (e) => {
    e.stopPropagation();
    // console.log(props.input);
    if (props.input.link) {
      // router.push(_linkResolver(props.input.link), { scroll: false });
    }
  };
  // console.log(props.parent);
  useFrame(() => {
    if (isHover) return;
    const x = Math.random() * 0.001;
    const y = Math.random() * 0.005;
    groupRef.current.rotation.x += x;
    groupRef.current.rotation.y += y;
    groupRef.current.rotation.z += 0.0005;
  });

  const _onPointerOver = () => {
    // console.log(props.input.link);
    setIsHover(true);
    publish("TRINKET_INFO", props.input.link.title);
    // publish("TRINKET_INFO", "here is the infos");
  };
  const _onPointerOut = () => {
    setIsHover(false);
    publish("TRINKET_INFO", "");
  };

  return (
    <>
      {/* <Float speed={1} rotationIntensity={1} floatIntensity={1}> */}
      <DragControls
        dragConfig={{
          dragLimits: [
            [0, props.windowSize.w],
            [0, props.windowSize.h],
            [0, 0],
          ],
        }}>
        <group
          ref={groupRef}
          position={position}
          // {...bind()}
          // onClick={_onClick}
          // onPointerMove={(e) => setPosition(e.point.x, e.point.y, 0)}
          onPointerOver={_onPointerOver}
          onPointerOut={_onPointerOut}>
          <boxGeometry args={[1, 1, 1]} />
          <primitive ref={primitiveRef} object={scene} scale={1} name={name} />
        </group>
      </DragControls>
      {/* </Float> */}
    </>
  );
};

export default Trinket;

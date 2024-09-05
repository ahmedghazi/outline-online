"use client";
import React, { useRef, useState } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { TransformControls } from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";
import { useRouter } from "next/navigation";
import { _linkResolver, _randomNum } from "../utils/utils";
import { useDrag } from "react-use-gesture";

const state = proxy({ current: null, mode: 0 });

const Trinket = (props) => {
  // const gltf = useLoader(GLTFLoader, props.input.file.asset.url);
  // const scene = gltf.scene
  const { scene } = useGLTF(props.input.file.asset.url);
  const groupRef = useRef();
  // const router = useRouter();

  // const [position, setPosition] = useState([_randomNum(3), _randomNum(3), 0]);
  // const [position, setPosition] = useState([
  //   props.position[0],
  //   props.position[1],
  //   0,
  // ]);
  const [position, setPosition] = useState([0, 0, 0]);
  const { size, viewport } = useThree();
  // console.log(size, viewport);
  const aspect = size.width / viewport.width;
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame(
  //   (state, delta) => (groupRef.current.rotation.x += delta * Math.random() * 1)
  // );
  useFrame(() => {
    groupRef.current.rotation.z += 0.001;
    groupRef.current.rotation.x += 0.001;
  });

  // Return view, these are regular three.js elements expressed in JSX
  // console.log(props);
  const bind = useDrag(
    ({ offset: [x, y] }) => {
      // console.log(position);
      // console.log(aspect);
      const [, , z] = position;
      setPosition([x / aspect, -y / aspect, z]);
    },
    { pointerEvents: true }
  );
  // console.log(position);
  const _onClick = (e) => {
    e.stopPropagation();
    // console.log(props.input);
    if (props.input.link) {
      // router.push(_linkResolver(props.input.link), { scroll: false });
    }
  };
  return (
    <>
      <group
        ref={groupRef}
        position={position}
        {...bind()}
        onClick={_onClick}
        // onPointerMove={(e) => setPosition(e.point.x, e.point.y, 0)}
        onPointerOver={(e) => console.log("hover", e.x)}
        onPointerOut={(e) => console.log("unhover")}>
        <primitive object={scene} scale={0.1} name={name} />
      </group>

      {/* <primitive
        // {...props}
        {...bind()}
        scale={0.2}
        ref={meshRef}
        object={gltf.scene}
        children-0-castShadow
        dispotse={null}
        // Click sets the mesh as the new target
        onClick={_onClick}
        // onClick={(e) => (e.stopPropagation(), (state.current = props.name))}
      /> */}
    </>
  );
};

export default Trinket;

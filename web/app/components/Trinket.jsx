"use client";
import React, { useRef, useState } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float, DragControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { TransformControls } from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";
import { useRouter } from "next/navigation";
import { _linkResolver, _randomNum } from "../utils/utils";
import { useDrag } from "react-use-gesture";
// import { DragControls } from "three/examples/jsm/controls/DragControls";
//https://www.youtube.com/watch?v=tBSbgRRpNzI
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
  // const [position, setPosition] = useState([0, 0, 0]);
  const [position, setPosition] = useState(props.position);
  const { size, viewport } = useThree();
  // console.log(size, viewport);
  const aspect = size.width / viewport.width;
  // Subscribe this component to the render-loop, rotate the mesh every frame

  // useFrame(() => {
  //   groupRef.current.rotation.x += 0.0005;
  //   groupRef.current.rotation.y += 0.001;
  // });

  // Return view, these are regular three.js elements expressed in JSX
  // console.log(props);
  const bind = useDrag(
    ({ offset: [x, y] }) => {
      console.log(x, position, aspect);
      // console.log(aspect);
      const [, , z] = position;
      // setPosition([x / aspect, -y / aspect, z]);
      // setPosition([x / 20, -y / 20, z]);
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
      <Float speed={1} rotationIntensity={1} floatIntensity={1.3}>
        <DragControls>
          <group
            ref={groupRef}
            position={position}
            // {...bind()}
            onClick={_onClick}
            // onPointerMove={(e) => setPosition(e.point.x, e.point.y, 0)}
            onPointerOver={(e) => console.log("hover", e.x)}
            onPointerOut={(e) => console.log("unhover")}>
            <boxGeometry args={[1, 1, 1]} />
            <primitive object={scene} scale={1} name={name} />
          </group>
        </DragControls>
      </Float>
    </>
  );
};

export default Trinket;

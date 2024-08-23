"use client";

import React, { Suspense, useRef, useState } from "react";
import {
  Canvas,
  useFrame,
  createPortal,
  useThree,
  useLoader,
} from "@react-three/fiber";
import { DragControls, OrbitControls, useGLTF } from "@react-three/drei";
import { useDrag } from "react-use-gesture";
import { _randomNum } from "../utils/utils";
// import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Trinket from "./Trinket";

// function Model(props) {
//   const gltf = useGLTF(props.path);
//   // console.log(gltf);
//   return <primitive {...props} object={gltf.scene} />;
// }

// function DraggableModel({ url, name }) {
//   // const { scene } = useGLTF(url);
//   const gltf = useLoader(GLTFLoader, url);
//   // const gltf = useGLTF(url);
//   // const gltf = useLoader(GLTFLoader, url);
//   const groupRef = useRef();
//   // const controlsRef = useRef();
//   // const dragControlsRef = useRef();
//   // const { camera, gl } = useThree();
//   const [isDragging, setIsDragging] = useState(false);
//   const [position, setPosition] = useState([_randomNum(3), 0, 0]);
//   const { size, viewport } = useThree();
//   const aspect = size.width / viewport.width;

//   useFrame(() => {
//     groupRef.current.rotation.z += 0.001;
//     groupRef.current.rotation.x += 0.001;
//   });

//   const bind = useDrag(
//     ({ offset: [x, y] }) => {
//       const [, , z] = position;
//       setPosition([x / aspect, -y / aspect, z]);
//     },
//     { pointerEvents: true }
//   );

//   return (
//     <group ref={groupRef} position={position} {...bind()}>
//       {/* <primitive object={scene} scale={0.2} name={name} /> */}
//       <primitive object={gltf.scene} scale={0.2} name={name} />
//     </group>
//   );
// }

function Trinkets({ input }) {
  return (
    <section style={{ height: "100vh" }}>
      {/* <MultiSceneCanvas models={input} /> */}
      <Canvas shadows dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight
          intensity={0.5}
          castShadow
          shadow-mapSize-height={1512}
          shadow-mapSize-width={1512}
        />

        {/* <pointLight position={[10, 10, 10]} /> */}
        <Suspense fallback={null}>
          {/* Chargement de plusieurs modèles avec des positions différentes */}
          {input.map((item, i) => (
            // <DraggableModel
            //   key={i}
            //   url={item.file.asset.url}
            //   // position={[_randomNum(4), _randomNum(3), 0]}
            //   // rotation={[0, _randomNum(4), 0]}
            //   name={"--model--" + i + ""}
            //   // scale={[0.1, 0.1, 0.1]}
            // />
            <Trinket input={item} name={i + 10} key={i} />
          ))}
        </Suspense>
        {/* <OrbitControls /> */}
      </Canvas>
    </section>
  );
}

export default Trinkets;

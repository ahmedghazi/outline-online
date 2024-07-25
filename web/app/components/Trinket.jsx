"use client";
import { useRef } from "react";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Trinket = ({ input }) => {
  const gltf = useLoader(GLTFLoader, input.gltf.asset.url);
  console.log(input);
  return (
    <div className='flex justify-center items-center h-screen'>
      <Canvas
        className='!h-[500px] !w-[500px]'
        // camera={{ position, fov }}
        style={
          {
            // width: "100%",
            // height: "100%",
          }
        }>
        <color attach='background' args={["#fff"]} />
        <Environment preset='studio' />
        {/* <PerspectiveCamera makeDefault position={[2, 3.9, 4.1]} /> */}
        <OrbitControls />
        {/* <Model position={[0, -2, 0]} /> */}
        <primitive object={gltf.scene} />
        {/* <ContactShadows /> */}
      </Canvas>
    </div>
  );
};

export default Trinket;

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

const Model = (props) => {
  const { nodes, materials } = useGLTF("/three/LYGA.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        material={materials.Silver}
        position={[1.693, 0.203, 1.526]}
        rotation={[-0.533, -0.885, 0.043]}
        scale={[0.656, 0.057, 0.656]}>
        <group
          position={[-7.38, -0.826, -0.372]}
          rotation={[-1.574, 0, -0.246]}
          scale={[0.843, 0.843, 1.743]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_6.geometry}
            material={materials.Silver}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_8.geometry}
            material={materials.Platinum}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_10.geometry}
            material={materials.Platinum}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_12.geometry}
            material={materials.Platinum}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_14.geometry}
            material={materials.Platinum}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_16.geometry}
            material={materials.Brass}
          />
        </group>
      </mesh>
    </group>
  );
};

export function Test3d() {
  useGLTF.preload("/three/LYGA.gltf");
  const position = [0, 0, 0];
  const fov = 75;
  return (
    <div className='flex justify-center items-center h-screen'>
      <Canvas
        className='!h-[500px] !w-[500px]'
        camera={{ position, fov }}
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
        <Model position={[0, -2, 0]} />
        {/* <ContactShadows /> */}
      </Canvas>
    </div>
  );
}

export default Test3d;

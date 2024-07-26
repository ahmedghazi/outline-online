"use client";
import React, { Suspense, useRef, useState } from "react";
import { Obj3d } from "../types/schema";
// import Trinket from "./Trinket";
// import dynamic from "next/dynamic";
// import { Canvas } from "@react-three/fiber";
// const Trinket = dynamic(() => import("./Trinket"), { ssr: false });
import // ContactShadows,
// Environment,
// OrbitControls,
// PerspectiveCamera,
"@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  TransformControls,
  ContactShadows,
  useGLTF,
  useCursor,
  Environment,
  Stage,
} from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";
import Lyga from "./trinkets/Lyga";

// const Trinket = (props: any) => {
//   const gltf = useLoader(GLTFLoader, props.input.gltf.asset.url);

//   return <primitive {...props} object={gltf.scene} />;
// };

// Reactive state model, using Valtio ...
// const modes = ["translate", "rotate", "scale"];
const state = proxy({ current: null, mode: 0 });

function Model({ ...props }) {
  // Ties this component to the state model
  const snap = useSnapshot(state);
  // Fetching the GLTF, nodes is a collection of all the meshes
  // It's cached/memoized, it only gets loaded and parsed once
  // const { nodes } = useGLTF("/compressed.glb");
  // const { nodes } = useLoader(GLTFLoader, props.input.gltf.asset.url);
  const gltf = useLoader(GLTFLoader, props.input.gltf.asset.url);
  // Feed hover state into useCursor, which sets document.body.style.cursor to pointer|auto
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  // console.log(gltf);
  return (
    <>
      <primitive object={gltf.scene} scale={0.4} />
    </>
    // <primitive {...props} object={gltf.scene} />
    // <mesh geometry={nodes.geometry} material={nodes.material} />
    // <mesh
    //   // Click sets the mesh as the new target
    //   onClick={(e) => (e.stopPropagation(), (state.current = name))}
    //   // If a click happened but this mesh wasn't hit we null out the target,
    //   // This works because missed pointers fire before the actual hits
    //   onPointerMissed={(e) => e.type === "click" && (state.current = null)}
    //   // Right click cycles through the transform modes
    //   onContextMenu={(e) =>
    //     snap.current === name &&
    //     (e.stopPropagation(), (state.mode = (snap.mode + 1) % modes.length))
    //   }
    //   onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
    //   onPointerOut={(e) => setHovered(false)}
    //   name={name}
    //   geometry={nodes.geometry}
    //   material={nodes.material}
    //   material-color={snap.current === name ? "#ff6080" : "white"}
    //   {...props}
    //   dispose={null}
    // />
  );
}

function Controls() {
  // Get notified on changes to state
  const snap = useSnapshot(state);
  const scene = useThree((state) => state.scene);
  return (
    <>
      {/* As of drei@7.13 transform-controls can refer to the target by children, or the object prop */}
      {snap.current && (
        <TransformControls
          object={scene.getObjectByName(snap.current)}
          mode={modes[snap.mode]}
        />
      )}
      {/* makeDefault makes the controls known to r3f, now transform-controls can auto-disable them when active */}
      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.75}
      />
    </>
  );
}

const Obj3dsAll = ({ input }) => {
  const ref = useRef();
  return (
    <section className='obj3dsAll'>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 50 }}
        style={{
          width: "calc(var(--vw) * 100)",
          height: "calc(var(--vh) * 100)",
        }}>
        <Suspense fallback={null}>
          <Stage
            controls={ref}
            preset='rembrandt'
            intensity={1}
            shadows={false}
            environment='city'>
            false
            <Lyga scale={0.2} />
            false
          </Stage>
        </Suspense>
        <OrbitControls ref={ref} makeDefault />
      </Canvas>
    </section>
  );
};

export default Obj3dsAll;

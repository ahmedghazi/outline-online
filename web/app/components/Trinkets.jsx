"use client";
import React, { Suspense, useRef, useState } from "react";
// import { Obj3d } from "../types/schema";

import { Canvas, useThree } from "@react-three/fiber";
import { Float, OrbitControls, Stage } from "@react-three/drei";
import { PerspectiveCamera } from "three";
import Trinket from "./Trinket";
// import { proxy, useSnapshot } from "valtio";
// const state = proxy({ current: null, mode: 0 });

// function Controls() {
//   // Get notified on changes to state
//   const snap = useSnapshot(state);
//   const scene = useThree((state) => state.scene);
//   // console.log(snap);
//   return (
//     <>
//       {/* As of drei@7.13 transform-controls can refer to the target by children, or the object prop */}
//       {snap.current && (
//         <TransformControls
//           object={scene.getObjectByName(snap.current)}
//           mode={modes[snap.mode]}
//         />
//       )}
//       {/* makeDefault makes the controls known to r3f, now transform-controls can auto-disable them when active */}
//       {/* <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} /> */}
//     </>
//   );
// }

const Trinkets = (props) => {
  const ref = useRef();
  const space = 1;
  //fov
  //aspect-ratio: 16/9 => 1.77

  function CameraHelper() {
    const camera = new PerspectiveCamera(60, 1, 1, 3);
    return <cameraHelper args={[camera]} />;
  }
  return (
    <section className='tinkets'>
      <Canvas
        shadows
        // dpr={[1, 2]}
        // camera={{ fov: 50 }}
        camera={{ fov: 60, zoom: 1, near: 1, far: 1000 }}
        // orthographic
        // camera={{
        //   position: [0, 0, 20],
        //   fov: 50,

        // }}
        // orthographic

        style={{
          width: "calc(var(--vw) * 100)",
          height: "calc(var(--vh) * 100)",
        }}>
        <ambientLight />
        <pointLight position={[5, 5, 5]} intensity={3} />
        <pointLight position={[-3, -3, 2]} />
        <Suspense fallback={null}>
          <Stage
            controls={ref}
            preset='rembrandt'
            intensity={1}
            shadows={false}
            environment='city'>
            {props.input.map((item, i) => (
              <Trinket
                key={i}
                input={item}
                name={i + 10}
                position={[Math.random() * space, Math.random() * space, 0]}
                // scale={1}
              />
            ))}
          </Stage>
        </Suspense>
        <CameraHelper />
        {/* <Controls /> */}
        {/* <OrbitControls ref={ref} makeDefault={false} /> */}
      </Canvas>
    </section>
  );
};
export default Trinkets;

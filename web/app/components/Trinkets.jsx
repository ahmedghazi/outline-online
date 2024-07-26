"use client";
import React, { Suspense, useRef, useState } from "react";
// import { Obj3d } from "../types/schema";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import Trinket from "./Trinket";
import { proxy, useSnapshot } from "valtio";
const state = proxy({ current: null, mode: 0 });

function Controls() {
  // Get notified on changes to state
  const snap = useSnapshot(state);
  const scene = useThree((state) => state.scene);
  // console.log(snap);
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
      {/* <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} /> */}
    </>
  );
}

const Trinkets = (props) => {
  const ref = useRef();
  const space = 5;
  return (
    <section className='tinkets'>
      <Canvas
        shadows
        dpr={[1, 2]}
        // camera={{ fov: 50 }}
        camera={{ fov: 35, zoom: 1.3, near: 1, far: 1000 }}
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
            {props.input.map((item, i) => (
              <Trinket
                input={item}
                name={i + 10}
                key={i}
                position={[Math.random() * space, 0, Math.random() * space]}
                // scale={0.4}
                scale={[0.1, 0.1, 0.1]}
              />
            ))}
          </Stage>
        </Suspense>
        {/* <Controls /> */}
        {/* <OrbitControls ref={ref} makeDefault /> */}
      </Canvas>
    </section>
  );
};
export default Trinkets;

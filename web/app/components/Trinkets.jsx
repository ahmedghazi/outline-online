"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stage } from "@react-three/drei";
import { PerspectiveCamera } from "three";
import Trinket from "./Trinket";

const Trinkets = (props) => {
  const refParent = useRef();
  // const ref = useRef();
  const space = 3;
  const [ready, setReady] = useState(false);
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    console.log(refParent);
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    setReady(true);
  }, []);
  //fov
  //aspect-ratio: 16/9 => 1.77

  function CameraHelper() {
    const camera = new PerspectiveCamera(60, 1, 1, 3);
    return <cameraHelper args={[camera]} />;
  }
  return (
    <section className='tinkets' ref={refParent}>
      {ready && (
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
          {/* <pointLight position={[-3, -3, 2]} /> */}
          <Suspense fallback={null}>
            <Stage
              // controls={ref}
              preset='rembrandt'
              intensity={1}
              shadows={false}
              environment='city'>
              {refParent &&
                props.input.map((item, i) => (
                  <Trinket
                    key={i}
                    input={item}
                    name={i + 10}
                    position={[Math.random() * space, Math.random() * space, 0]}
                    windowSize={windowSize}
                    // scale={1}
                  />
                ))}
            </Stage>
          </Suspense>
          {/* <CameraHelper /> */}
          {/* <Controls /> */}
          {/* <OrbitControls ref={ref} makeDefault={false} /> */}
        </Canvas>
      )}
    </section>
  );
};
export default Trinkets;

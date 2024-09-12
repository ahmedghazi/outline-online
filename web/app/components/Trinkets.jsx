"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stage } from "@react-three/drei";
// import { PerspectiveCamera } from "three";
import Trinket from "./Trinket";
import { subscribe, unsubscribe } from "pubsub-js";

const Trinkets = (props) => {
  const refParent = useRef();
  // const ref = useRef();
  const space = 3;
  const [ready, setReady] = useState(false);
  const [infos, setInfos] = useState("infos");
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    console.log(refParent);
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    setReady(true);

    const token = subscribe("TRINKET_INFO", (e, d) => {
      console.log(e);
      console.log(d);
      setInfos(d);
    });

    return () => {
      unsubscribe(token);
    };
  }, []);

  // function CameraHelper() {
  //   const camera = new PerspectiveCamera(60, 1, 1, 3);
  //   return <cameraHelper args={[camera]} />;
  // }

  return (
    <section className='tinkets' ref={refParent}>
      {ready && (
        <Canvas
          shadows
          camera={{ fov: 60, near: 1, far: 1000 }}
          style={{
            // width: "calc(var(--vw) * 100)",
            height: "calc(var(--vh) * 100)",
          }}>
          <ambientLight />
          <pointLight position={[5, 5, 5]} intensity={3} />
          <Suspense fallback={null}>
            <Stage
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
      {infos && <div className='infos'>{infos}</div>}
    </section>
  );
};
export default Trinkets;

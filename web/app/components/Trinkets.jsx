"use client";
import React, { Fragment, Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Center, Stage, Text3D } from "@react-three/drei";
import { PerspectiveCamera } from "three";
import Trinket from "./Trinket";
import TrinketTest from "./TrinketTest";

import { subscribe, unsubscribe } from "pubsub-js";
import { _shuffle } from "../utils/utils";

//https://gltf.pmnd.rs/

const TrinketInfo = ({ infos }) => {
  const ref = useRef();
  const [transform, setTransform] = useState("");
  useEffect(() => {
    window.addEventListener("mousemove", _update);
    return () => {
      window.removeEventListener("mousemove", _update);
    };
  }, []);

  const _update = (e) => {
    // console.log(e);
    if (!ref) return;
    const bounding = ref.current.getBoundingClientRect();
    const offsetX = bounding.width / 2;
    // const offset
    const { clientX, clientY } = e;
    const x = clientX - offsetX;
    const y = clientY + 100;
    setTransform(`translate(${x}px, ${y}px)`);
  };
  return (
    <div
      ref={ref}
      className='infos'
      style={{
        transform: transform,
      }}>
      {infos}
    </div>
  );
};

const Trinkets = (props) => {
  const refParent = useRef();
  // const ref = useRef();
  const space = 10;
  const [ready, setReady] = useState(false);
  const [infos, setInfos] = useState(null);
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    // console.log(refParent);
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    setReady(true);

    const token = subscribe("TRINKET_INFO", (e, d) => {
      setInfos(d);
    });

    return () => {
      unsubscribe(token);
    };
  }, []);

  function CameraHelper() {
    const camera = new PerspectiveCamera(60, 1, 1, 3);
    return <cameraHelper args={[camera]} />;
  }
  // const items = [props.input[1], props.input[2]];
  // const _shuffledItems = _shuffle(items);
  return (
    <section className='section--trinkets h-screen' ref={refParent}>
      {ready && (
        <Canvas camera={{ zoom: 1 }}>
          {/* <ambientLight /> */}
          {/* <pointLight position={[5, 5, 5]} intensity={3} /> */}
          {/* <Suspense fallback={null}>
            <Stage preset='rembrandt' intensity={1} environment='city'> */}
          {/* <Bounds fit observe margin={4}> */}

          {/* {props.input.map((item, i) => (
            <TrinketTest
              key={i}
              input={item}
              name={i + 10}
              initialPosition={[
                Math.random() * space,
                (Math.random() * space) / 2,
                0,
              ]}
            />
          ))} */}
          <Stage preset='rembrandt' intensity={1} environment='city'>
            <Suspense fallback={null}>
              <TrinketTest input={props.input[0]} position={[0, 0, 0]} />
              <TrinketTest input={props.input[1]} position={[3, 0, 0]} />
              <TrinketTest input={props.input[2]} position={[-3, 0, 0]} />
            </Suspense>
          </Stage>

          {/* </Bounds> */}
          {/* </Stage>
          </Suspense> */}
          <CameraHelper />
          <axesHelper args={[5]} />
        </Canvas>
      )}
      {infos !== "" && <TrinketInfo infos={infos} />}
    </section>
  );
};
export default Trinkets;

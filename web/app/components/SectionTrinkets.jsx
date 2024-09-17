"use client";
import React, {
  Fragment,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Bounds,
  Center,
  Stage,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  CameraControls,
} from "@react-three/drei";
// import { PerspectiveCamera } from "three";
import Trinket from "./Trinket";
// import TrinketTest from "./trinkets/TrinketTest";

import { subscribe, unsubscribe } from "pubsub-js";
import { _shuffle, _randomNum } from "../utils/utils";
// import { metadata } from "../layout";

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

const Scene = (props) => {
  const refGroup = useRef();
  const cameraControlsRef = useRef();
  // const { camera } = useThree();

  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    console.log(refGroup.current);
    setTimeout(() => {
      window.scroll(0, 1);
      cameraControlsRef.current?.fitToBox(refGroup.current, true);
      setTimeout(() => {
        cameraControlsRef.current?.fitToBox(refGroup.current, true);
      }, 1000);
    }, 1000);
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  // function CameraHelper() {
  //   const camera = new PerspectiveCamera(60, 1, 1, 3);
  //   return <cameraHelper args={[camera]} />;
  // }

  const distance = 5;
  const files = [
    // "/three/Scene.glb",
    "/three/LUPA.glb",
    "/three/KEYCHAIN.glb",
    "/three/KEYCARD.glb",
    "/three/ATHERN.glb",
  ];
  const items = useMemo(() => {
    return files.map((item, i) => {
      return {
        file: files[i],
        position: [_randomNum(distance * 2), _randomNum(distance), 0],
        metadata: props.input[i] ? props.input[i].metadata : "",
      };
    });
  }, []);
  // console.log(props);
  return (
    <>
      {/* <Bounds fit clip observe margin={1.2}> */}
      <group ref={refGroup}>
        <Suspense fallback={null}>
          {items.map((item, i) => (
            <group key={i}>
              <Trinket
                key={i}
                file={item.file}
                initialPosition={item.position}
                metadata={item.metadata}
              />
            </group>
          ))}
        </Suspense>
      </group>
      {/* </Bounds> */}

      <CameraControls ref={cameraControlsRef} enabled={false} />
      {/* <CameraHelper /> */}
      {/* <axesHelper args={[5]} /> */}

      {/* <OrbitControls
      // enableZoom={false}
      // enablePan={false}
      // enableRotate={false}
      /> */}
    </>
  );
};

const SectionTrinkets = (props) => {
  const [ready, setReady] = useState(false);
  const [infos, setInfos] = useState(null);

  useEffect(() => {
    setReady(true);

    const token = subscribe("TRINKET_INFO", (e, d) => {
      setInfos(d);
    });

    return () => {
      unsubscribe(token);
    };
  }, []);

  return (
    <section className='section--trinkets h-screen'>
      <Canvas orthographic camera={{ position: [0, 0, 5], fov: 60 }}>
        <Stage preset='rembrandt' intensity={1} environment='city'>
          <Scene input={props.input} />
        </Stage>
      </Canvas>

      {infos !== "" && <TrinketInfo infos={infos} />}
    </section>
  );
};

export default SectionTrinkets;
//position={[1, 2, 3]} rotation={[Math.PI / 2, 0, 0]

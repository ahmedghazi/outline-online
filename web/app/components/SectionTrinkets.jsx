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
import TrinketImage from "./TrinketImage";
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
        opacity: transform !== "" ? 1 : 0,
      }}>
      {infos}
    </div>
  );
};

const Scene = (props) => {
  const refGroup = useRef();
  const cameraControlsRef = useRef();

  useEffect(() => {
    window.scroll(0, 1);
    setTimeout(() => {
      window.scroll(0, 0);

      cameraControlsRef.current?.fitToBox(refGroup.current, true, {
        paddingTop: 150,
        paddingLeft: 150,
        paddingBottom: 150,
        paddingRight: 150,
      });
      setTimeout(() => {
        cameraControlsRef.current?.fitToBox(refGroup.current, true);
      }, 1000);
    }, 1000);
  }, []);

  const distance = 5;

  const items = useMemo(() => {
    return props.input.map((item, i) => {
      return {
        _type: item.name ? "file" : "image",
        file: item.name ? `/three/${item.name}.reset_location.glb` : "",
        position: [_randomNum(distance * 2), _randomNum(distance), 0],
        metadata: item.metadata,
        image: item.image ? item.image.asset.url : "",
        dimensions: item.image ? item.image.asset.metadata.dimensions : "",
      };
    });
  }, []);

  // console.log(items);
  return (
    <>
      {/* <Bounds fit clip observe margin={1.2}> */}
      <group ref={refGroup}>
        <Suspense fallback={null}>
          {items.map((item, i) => (
            <group key={i}>
              {item._type === "file" && (
                <Trinket
                  key={i}
                  file={item.file}
                  initialPosition={item.position}
                  metadata={item.metadata}
                />
              )}
              {item._type === "image" && (
                <TrinketImage
                  key={i}
                  url={item.image}
                  dimensions={item.dimensions}
                  initialPosition={item.position}
                  metadata={item.metadata}
                />
              )}
            </group>
          ))}
        </Suspense>
      </group>
      {/* </Bounds> */}

      <CameraControls ref={cameraControlsRef} enabled={false} />
      {/* <CameraHelper /> */}
      {/* <axesHelper args={[5]} /> */}
      {/*test */}
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
        <Stage
          preset='rembrandt'
          intensity={1}
          environment='city'
          shadows={false}>
          <Scene input={props.input} />
        </Stage>
      </Canvas>

      {infos !== "" && <TrinketInfo infos={infos} />}
    </section>
  );
};

export default SectionTrinkets;
//position={[1, 2, 3]} rotation={[Math.PI / 2, 0, 0]

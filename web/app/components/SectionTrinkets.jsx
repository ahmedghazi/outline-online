"use client";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stage, CameraControls } from "@react-three/drei";
import { Box3 } from "three";
import Trinket from "./Trinket";
import TrinketImage from "./TrinketImage";
import { subscribe, unsubscribe } from "pubsub-js";
import { _shuffle, _randomNum } from "../utils/utils";
import useDeviceDetect from "../hooks/useDeviceDetect";

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
    if (!ref || !ref.current) return;
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
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
    window.scroll(0, 1);
    setTimeout(() => {
      window.scroll(0, 0);
      const box3 = new Box3().setFromObject(refGroup.current);
      cameraControlsRef.current?.fitToBox(box3, false, {
        paddingTop: 2,
        paddingLeft: 2,
        paddingBottom: 2,
        paddingRight: 2,
      });
    }, 1000);
  }, []);

  const distance = 1;

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
              {item.image && (
                <TrinketImage
                  key={i}
                  url={item.image}
                  dimensions={item.dimensions}
                  initialPosition={item.position}
                  metadata={item.metadata}
                  scale={isMobile ? [0.9, 0.9, 0.9] : [0.4, 0.4, 0.4]}
                />
              )}
              {!item.image && item._type === "file" && (
                <Trinket
                  key={i}
                  file={item.file}
                  initialPosition={item.position}
                  metadata={item.metadata}
                  scale={isMobile ? [0.9, 0.9, 0.9] : [0.1, 0.1, 0.1]}
                />
              )}
              {/* {item._type === "file" && (
                <Trinket
                  key={i}
                  file={item.file}
                  initialPosition={item.position}
                  metadata={item.metadata}
                  scale={isMobile ? [0.9, 0.9, 0.9] : [0.4, 0.4, 0.4]}
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
              )} */}
            </group>
          ))}
        </Suspense>
      </group>
      {/* </Bounds> */}

      <CameraControls ref={cameraControlsRef} enabled={false} />
    </>
  );
};

const SectionTrinkets = (props) => {
  const [ready, setReady] = useState(false);
  const [infos, setInfos] = useState(null);
  const { isMobile } = useDeviceDetect();

  const _getChain = () => {
    return props.input.filter((el) => {
      // console.log(el);
      return el.name === "KEYCHAIN";
    });
  };
  // const chain = _getChain();
  let items = isMobile ? _getChain() : props.input;

  // console.log(items);

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
      {ready && (
        <Canvas orthographic camera={{ position: [0, 0, 5], fov: 60 }}>
          <Stage
            preset='rembrandt'
            intensity={1}
            environment='city'
            shadows={false}>
            <Scene input={items} />
          </Stage>
        </Canvas>
      )}
      {infos !== "" && <TrinketInfo infos={infos} />}
    </section>
  );
};

export default SectionTrinkets;
//position={[1, 2, 3]} rotation={[Math.PI / 2, 0, 0]

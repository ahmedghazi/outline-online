import React, { useState, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { DragControls } from "@react-three/drei";
import { publish } from "pubsub-js";

const Texture = ({ texture, scale, dimensions, initialPosition, metadata }) => {
  const args = [1.5, 1.5 / dimensions.aspectRatio];
  const group = useRef();
  const meshRef = useRef();
  // const [isHover, setIsHover] = useState(false);

  // const randRotations = useMemo(() => {
  //   const x = Math.random() * 0.005;
  //   const y = Math.random() * 0.005;
  //   return { x, y };
  // }, []);

  // console.log(meshRef.current);
  // useFrame((state) => {
  //   if (isHover) return;
  //   if (!meshRef.current) return;

  //   // meshRef.current.rotation.x += randRotations.x;
  //   // meshRef.current.rotation.y += 0.00001;
  //   meshRef.current.rotation.x += randRotations.x;
  //   meshRef.current.rotation.y += randRotations.y;
  //   // meshRef.current.scale.x = 3;
  //   // meshRef.current.scale.y = 3;
  // });

  const _onPointerOver = () => {
    // console.logmetadata;
    // setIsHover(true);
    publish("TRINKET_INFO", metadata);
    // publish("TRINKET_INFO", "here is the infos");
  };
  const _onPointerOut = () => {
    // setIsHover(false);
    publish("TRINKET_INFO", "");
  };

  return (
    <DragControls>
      <group
        ref={group}
        position={initialPosition}
        scale={0.3}
        onPointerOver={_onPointerOver}
        onPointerOut={_onPointerOut}>
        <mesh ref={meshRef}>
          {/* <planeBufferGeometry attach='geometry' args={[5, 4]} /> */}
          <planeGeometry attach='geometry' args={args} scale={scale} />
          <meshBasicMaterial attach='material' transparent map={texture} />
        </mesh>
      </group>
    </DragControls>
  );
};

const TrinketImage = (props) => {
  const { url } = props;
  const texture = useMemo(() => {
    return new THREE.TextureLoader().load(url);
  }, [url]);
  return <Texture texture={texture} {...props} />;
};

export default TrinketImage;

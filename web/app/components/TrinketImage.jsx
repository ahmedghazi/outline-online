import React, { useState, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { DragControls } from "@react-three/drei";
import { publish } from "pubsub-js";

const Texture = ({ texture, dimensions, initialPosition, metadata }) => {
  const args = [2.5, 2.5 / dimensions.aspectRatio];
  const group = useRef();
  const meshRef = useRef();
  const [isHover, setIsHover] = useState(false);

  const randRotations = useMemo(() => {
    const x = Math.random() * 0.001;
    const y = Math.random() * 0.005;
    return { x, y };
  }, []);

  // console.log(meshRef.current);
  useFrame((state) => {
    if (isHover) return;
    if (!meshRef.current) return;

    meshRef.current.rotation.x += randRotations.x;
    meshRef.current.rotation.y += 0.00001;
  });

  const _onPointerOver = () => {
    console.logmetadata;
    setIsHover(true);
    publish("TRINKET_INFO", metadata);
    // publish("TRINKET_INFO", "here is the infos");
  };
  const _onPointerOut = () => {
    setIsHover(false);
    publish("TRINKET_INFO", "");
  };

  return (
    <DragControls>
      <group
        ref={group}
        position={initialPosition}
        onPointerOver={_onPointerOver}
        onPointerOut={_onPointerOut}>
        <mesh ref={meshRef}>
          {/* <planeBufferGeometry attach='geometry' args={[5, 4]} /> */}
          <planeGeometry attach='geometry' args={args} />
          <meshBasicMaterial attach='material' map={texture} />
        </mesh>
      </group>
    </DragControls>
  );
};

const TrinketImage = (props) => {
  const { url } = props;
  const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);
  return <Texture texture={texture} {...props} />;
};

export default TrinketImage;

import React, { useEffect, useRef, useState } from "react"
// import PubSub from "pubsub-js";
import styled from "styled-components"

const Container = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => props.left};
  width: 50%;
  height: 100%;
  z-index: 49;
  cursor: none;
  @media all and (max-width: 1080px) {
    opacity: 0;
  }
  &:hover .label {
    opacity: 1;
  }
  * {
    pointer-events: none;
  }
`
const Label = styled.div`
  opacity: 0;
  position: absolute;
  will-change: transform;
  transform: translate(-100vw, -100vh);
  transform-origin: center center;
  text-align: center;
  font-size: 2em;
  // color: white;
  // mix-blend-mode: difference;
`

const SliderCursorPrevNextText = (props) => {
  // console.log(props);
  const { label, left, className, style, onClick } = props
  const refContainer = useRef()
  const refLabel = useRef()
  const [positions, setPositions] = useState({
    transform: "translate(-100vw, -100vh)",
  })

  useEffect(() => {
    refContainer.current.addEventListener("mouseenter", _onEnter)
    refContainer.current.addEventListener("mouseleave", _onLeave)
    return () => {
      if (refContainer && refContainer.current) {
        refContainer.current.removeEventListener("mouseenter", _onEnter)
        refContainer.current.removeEventListener("mouseleave", _onLeave)
        refContainer.current.removeEventListener("mousemove", _update)
      }
    }
  }, [])

  const _onEnter = (e) => {
    refContainer.current.addEventListener("mousemove", _update)
  }
  const _onLeave = (e) => {
    refContainer.current.removeEventListener("mousemove", _update)
  }

  const _update = (e) => {
    // const { offsetX, offsetY } = e;
    const { width, height } = refLabel.current.getBoundingClientRect()
    const left = e.offsetX - width / 2
    const top = e.offsetY - height / 2
    setPositions({
      transform: `translate(${left}px, ${top}px)`,
    })
  }

  return (
    <Container
      className={`${className}  hidden-sm`}
      style={{ ...style }}
      onClick={onClick}
      left={left}
      ref={refContainer}
    >
      <div>
        <Label className="label" style={positions} ref={refLabel}>
          {/* {label} */}
          {label === "prev" && <i className="icon-chevron-w  font-black"></i>}
          {label === "next" && <i className="icon-chevron-e  font-black"></i>}
        </Label>
      </div>
    </Container>
  )
}

export default SliderCursorPrevNextText

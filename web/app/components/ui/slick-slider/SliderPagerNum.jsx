import React, { useEffect, useState } from "react"
import PubSub from "pubsub-js"
import clsx from "clsx"

const SliderPagerNum = ({ length }) => {
  const [index, setIndex] = useState(0)

  const arr = Array.from(Array(length).keys())
  // console.log(arr)

  useEffect(() => {
    const token = PubSub.subscribe("SLIDER_CHANGE", (e, d) => {
      setIndex(d)
    })
    return () => PubSub.unsubscribe(token)
  }, [])

  return (
    <ul className="slider-pager flex">
      {arr.map((li, i) => (
        <li key={i}>
          <button
            className={clsx("pr-xs", i === index ? "font-bold" : "")}
            onClick={() => PubSub.publish("SLIDER_INDEX", i)}
          >
            {i + 1}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default SliderPagerNum

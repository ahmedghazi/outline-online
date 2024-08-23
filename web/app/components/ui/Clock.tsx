"use client";
import React, { useState, useEffect } from "react";
// import { pad2 } from "../../core/utils";

const Clock = () => {
  // const [date, setDate] = useState("00.00");
  const [time, setTime] = useState("");
  const [ready, setReady] = useState<boolean>(false);

  const pad2 = (n: number) => {
    return n < 10 ? `0${n}` : n;
  };

  useEffect(() => {
    const timer = setInterval(_update, 1000);
    setReady(true);
    // _start();
    return () => clearInterval(timer);
  }, []);

  const _update = () => {
    const now = new Date();

    const day = pad2(now.getDate());
    const month = pad2(now.getMonth() + 1);
    const hour = pad2(now.getHours()) as number;
    const minute = pad2(now.getMinutes());
    const seconde = pad2(now.getSeconds());
    let ampm = hour >= 12 ? "pm" : "am";

    // setDate(`${day}.${month}`);
    setTime(`${hour}:${minute} ${ampm}`);
    // console.log(now);
  };
  //Local Time: 03:17 pm (CET)
  return <div className='clock'>{ready && <>Local Time: {time} (CET)</>}</div>;
};

export default Clock;

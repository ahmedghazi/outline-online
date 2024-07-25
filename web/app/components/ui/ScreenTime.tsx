"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {};
type TimeProps = {
  h: string | number;
  m: string | number;
  s: string | number;
};

const ScreenTime = (props: Props) => {
  // const [date, setDate] = useState("00.00");
  // const [start, setStart] = useState<Date>(new Date());
  const start = useRef<Date>(new Date());
  const [time, setTime] = useState("");
  const [ready, setReady] = useState<boolean>(false);

  const pad2 = (n: number) => {
    return n < 10 ? `0${n}` : n;
  };

  const formatTime = (obj: TimeProps) => {
    var x = [];
    // x.push(obj.h);
    x.push(obj.m);
    x.push(obj.s);
    return x.join(":");
  };
  const secs2Time = (secs: number) => {
    var hours = Math.floor(secs / (60 * 60));
    var minutes = Math.floor(secs / 60);
    var seconds = Math.floor(secs % 60);
    var obj: TimeProps = {
      h: pad2(hours),
      m: pad2(minutes),
      s: pad2(seconds),
    };
    return obj;
  };

  useEffect(() => {
    // setStart(new Date());

    const _update = () => {
      // console.log(start);
      if (!start) return;
      const now = new Date();
      const diff = now.getTime() - start.current.getTime();
      const formated = formatTime(secs2Time(diff / 1000));
      // const day = pad2(now.getDate());
      // const month = pad2(now.getMonth() + 1);
      // const hour = pad2(now.getHours()) as number;
      // const minute = pad2(now.getMinutes());
      // const seconde = pad2(now.getSeconds());

      // setDate(`${day}.${month}`);
      setTime(`${formated} `);
      // console.log(now);
    };

    const timer = setInterval(_update, 1000);
    setReady(true);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='screen-time'>
      {ready && (
        <>
          Screen Time: <span className='tabnum'>{time}</span>
        </>
      )}
    </div>
  );
};

export default ScreenTime;

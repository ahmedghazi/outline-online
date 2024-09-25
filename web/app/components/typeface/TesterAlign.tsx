import React, { ReactNode, useEffect, useState } from "react";

type Props = {
  target: HTMLDivElement;
};

const TesterAlign = ({ target }: Props) => {
  const [val, setVal] = useState<string>("left");
  useEffect(() => {
    _update();
  }, []);

  useEffect(() => {
    _update();
  }, [val]);

  const _update = () => {
    // target.style.textAlign = val;
    target.style.setProperty("--type-textAlign", `${val}`);
  };

  return (
    <div className='text-align'>
      <ul className='text-align flex gap-02e'>
        <li>
          <button onClick={() => setVal("left")}>
            <svg
              width='13'
              height='11'
              viewBox='0 0 13 11'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <line
                y1='-0.5'
                x2='9'
                y2='-0.5'
                transform='matrix(-1 0 0 1 9 7.89258)'
                stroke='black'
              />
              <line
                y1='-0.5'
                x2='9'
                y2='-0.5'
                transform='matrix(-1 0 0 1 9 3.46191)'
                stroke='black'
              />
              <line
                y1='-0.5'
                x2='13'
                y2='-0.5'
                transform='matrix(-1 9.83506e-08 7.77092e-08 1 13 10.1074)'
                stroke='black'
              />
              <line
                y1='-0.5'
                x2='13'
                y2='-0.5'
                transform='matrix(-1 9.83506e-08 7.77092e-08 1 13 5.67676)'
                stroke='black'
              />
              <line
                y1='-0.5'
                x2='13'
                y2='-0.5'
                transform='matrix(-1 8.74228e-08 8.74228e-08 1 13 1.24609)'
                stroke='black'
              />
            </svg>
          </button>
        </li>
        <li>
          <button onClick={() => setVal("center")}>
            <svg
              width='13'
              height='11'
              viewBox='0 0 13 11'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <line x1='2' y1='7.39258' x2='11' y2='7.39258' stroke='black' />
              <line x1='2' y1='2.96191' x2='11' y2='2.96191' stroke='black' />
              <line
                x1='3.88546e-08'
                y1='9.60742'
                x2='13'
                y2='9.60742'
                stroke='black'
              />
              <line
                x1='3.88546e-08'
                y1='5.17676'
                x2='13'
                y2='5.17676'
                stroke='black'
              />
              <line
                x1='4.37114e-08'
                y1='0.746094'
                x2='13'
                y2='0.746095'
                stroke='black'
              />
            </svg>
          </button>
        </li>
        <li>
          <button onClick={() => setVal("right")}>
            <svg
              width='13'
              height='11'
              viewBox='0 0 13 11'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <line x1='4' y1='7.39258' x2='13' y2='7.39258' stroke='black' />
              <line x1='4' y1='2.96191' x2='13' y2='2.96191' stroke='black' />
              <line
                x1='3.88546e-08'
                y1='9.60742'
                x2='13'
                y2='9.60742'
                stroke='black'
              />
              <line
                x1='3.88546e-08'
                y1='5.17676'
                x2='13'
                y2='5.17676'
                stroke='black'
              />
              <line
                x1='4.37114e-08'
                y1='0.746094'
                x2='13'
                y2='0.746095'
                stroke='black'
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TesterAlign;

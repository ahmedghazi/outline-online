import React from "react";
import "./index.scss";
import { KeyValString, LicenseSize } from "@/app/types/schema";
import { label } from "three/examples/jsm/nodes/Nodes.js";

type Props = {
  label?: string;
  options: LicenseSize[] | KeyValString[];
  onChange: Function;
};

const Select = (props: Props) => {
  // console.log(JSON.stringify(props.options[0]));
  return (
    <div className='select-ui'>
      <select
        onChange={(e) => {
          // console.log(e.target.value);
          if (e.target.value) props.onChange(JSON.parse(e.target.value));
        }}
        defaultValue={
          props.label === "" &&
          props.options[0] &&
          props.options[0]._type === "keyValString"
            ? JSON.stringify(props.options[0])
            : ""
        }>
        {props.label && (
          <option defaultValue='' value=''>
            {props.label}
          </option>
        )}
        {props.options &&
          props.options.map((item, i) => (
            <option
              key={i}
              value={JSON.stringify(item)}
              // defaultValue={JSON.stringify(item)}
            >
              {item._type === "licenseSize" && item.title}
              {item._type === "keyValString" && item.key}
            </option>
          ))}
      </select>
      {!props.options && <div>Please provide some options</div>}
    </div>
  );
};

export default Select;

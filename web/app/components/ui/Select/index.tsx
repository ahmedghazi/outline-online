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
  return (
    <div className='select-ui'>
      <select onChange={(e) => props.onChange(JSON.parse(e.target.value))}>
        {props.label && <option defaultValue=''>{props.label}</option>}
        {props.options &&
          props.options.map((item, i) => (
            <option key={i} value={JSON.stringify(item)}>
              {item._type === "licenseSize" && item.title}
              {item._type === "keyValString" && item.key}
            </option>
          ))}
        {/* <option value=''>Stylistic Altern.</option>
        <option value=''>Proportional Fig.</option>
        <option value=''>Ordinals</option>
        <option value=''>Numerator</option>
        <option value=''>Fractions</option> */}
      </select>
      {!props.options && <div>Please provide some options</div>}
    </div>
  );
};

export default Select;

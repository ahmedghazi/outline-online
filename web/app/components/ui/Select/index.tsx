import React from "react";
import "./index.scss";
import { KeyValString, LicenseSize } from "@/app/types/schema";
import { label } from "three/examples/jsm/nodes/Nodes.js";

type Props = {
  label?: string;
  options: LicenseSize[] | KeyValString[];
  onChange: Function;
  disabled?: boolean;
};

const Select = ({ label, options, onChange, disabled = false }: Props) => {
  // console.log(JSON.stringify(props.options[0]));
  // console.log(label, disabled);

  return (
    <div className='select-ui'>
      <select
        disabled={disabled}
        onChange={(e) => {
          // console.log(e.target.value);
          if (e.target.value) onChange(JSON.parse(e.target.value));
        }}
        defaultValue={
          label === "" && options[0] && options[0]._type === "keyValString"
            ? JSON.stringify(options[0])
            : ""
        }>
        {label && (
          <option defaultValue='' value=''>
            {label}
          </option>
        )}
        {options &&
          options.map((item, i) => (
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
      {!options && <div>Please provide some options</div>}
    </div>
  );
};

export default Select;

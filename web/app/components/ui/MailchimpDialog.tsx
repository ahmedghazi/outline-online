"use client";
import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types"
import jsonp from "jsonp";
// import PropTypes from "prop-types";
// import styled, { css } from "styled-components"
import clsx from "clsx";
import { publish } from "pubsub-js";
import Dialog from "./Dialog";

type FieldProp = {
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
};

type Props = {
  action: string;
  fields: FieldProp[];
};

const FormMailchimp = (props: Props) => {
  const messages = {
    sending: "Sending...",
    success: "Registered successfully :)",
    error: "Error :(",
    empty: "E-mail is empty.",
    duplicate: "Too much unsuccessfull tries with this e-mail",
    button: "Keep me updated!",
  };

  const { fields, action } = props;
  const [state, setState] = useState<any[string]>([]);
  // const { messages } = Mailchimp.defaultProps
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [valid, setValid] = useState<boolean>(false);

  const getButtonMsg = () => {
    switch (status) {
      case "sending":
        return messages.sending;
      case "success":
        return messages.success;
      case "duplicate":
        return messages.duplicate;
      case "empty":
        return messages.empty;
      case "error":
        return messages.error;
      default:
        return messages.button;
    }
  };

  const validateEmail = (email: string) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  useEffect(() => {
    const email = state["EMAIL"];
    const isValidEmail = validateEmail(email);

    const isValid = isValidEmail && Object.keys(state).length === fields.length;
    setValid(isValid);
    console.log({ isValidEmail });
    console.log(Object.keys(state).length, fields.length);
    console.log(state);
  }, [state]);

  const handleSubmit = (evt: React.SyntheticEvent<HTMLFormElement>) => {
    // alert("submit");
    evt.preventDefault();
    const values = fields
      .map((field) => {
        return `${field.name}=${encodeURIComponent(state[field.name])}`;
      })
      .join("&");
    console.log(values);
    // const path = `${action}&EMAIL=${encodeURIComponent(email)}`;
    const path = `${action}&${values}`;
    const url = path.replace("/post?", "/post-json?");
    console.log(path);
    // const email = state["EMAIL"];
    sendData(url);

    // const isValidEmail = validateEmail(email);
    // const isValid = isValidEmail && state.length === fields.length;
    // isValid ? sendData(url) : "";
    // // validateEmail(email) ? sendData(url) : setStatus("empty");
  };

  const sendData = (url: string) => {
    setStatus("sending");
    document.body.classList.add("is-fetching");

    jsonp(url, { param: "c" }, (err: any, data: any) => {
      // console.log(err);
      // console.log(data);
      if (data.msg.includes("already subscribed")) {
        setStatus("duplicate");
      } else if (err) {
        setStatus("error");
      } else if (data.result !== "success") {
        setStatus("error");
      } else {
        setStatus("success");
        setTimeout(() => {
          publish("NEWSLETTER_TOGGLE", false);
        }, 2000);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx("mailchimp", valid && "is-valid")}>
      <div className='fields px-md'>
        {fields.map((field, i) => (
          <div className='form-row' key={i}>
            {field.required && <span className='text-red'>*</span>}
            <label htmlFor={field.name}>{field.placeholder}:</label>
            <input
              type={field.type}
              name={field.name}
              required={true}
              role='textbox'
              onChange={({ target }) => {
                setState((prev: any) => ({
                  ...prev,
                  [field.name]: target.value,
                }));
              }}
            />
          </div>
        ))}
      </div>

      <button
        disabled={status === "sending" || status === "success"}
        type='submit'
        className='text-white'
        aria-label='submit'>
        <span>{getButtonMsg()}</span>
      </button>
    </form>
  );
};
const MailchimpDialog = (props: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <div className='mailchimp-dialog'>
      <button className='toggle' onClick={() => setOpenModal(!openModal)}>
        Newsletter {openModal && "is open"}
      </button>

      <Dialog openModal={openModal} onCloseModal={() => setOpenModal(false)}>
        <div className='body'>
          <FormMailchimp action={props.action} fields={props.fields} />
        </div>
      </Dialog>
    </div>
  );
};
export default MailchimpDialog;

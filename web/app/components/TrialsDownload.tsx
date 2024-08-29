import React, { useEffect, useState } from "react";
import Checkbox from "./ui/Checkbox";
import useShop from "./shop/ShopContext";

type Props = {};

/**
 * process
 * collect client infos
 * api/trials [POST]
 * - send client infos
 * - send styles infos
 * inside api/trials
 * get data
 * loop styles and collect zip file
 * sendgrid send email
 */

const TrialsDownload = (props: Props) => {
  const [okToSend, setOkToSend] = useState<boolean>(true);
  const [state, setState] = useState<any[string]>([]);
  const [status, setStatus] = useState<string>("");
  const { trials } = useShop();
  const fields = [
    { type: "text", name: "website", required: false },
    { type: "email", name: "email", required: true },
    { type: "text", name: "first_name", required: false },
    { type: "text", name: "last_name", required: true },
    { type: "text", name: "name", required: false },
    { type: "text", name: "location", required: false },
    { type: "text", name: "postbox", required: false },
    { type: "text", name: "street", required: false },
    { type: "text", name: "zipcode", required: false },
    { type: "text", name: "city", required: false },
    { type: "text", name: "county", required: false },
    { type: "text", name: "country", required: false },
  ];
  const requiredLength = fields.filter((el) => el.required).length;

  const getButtonMsg = () => {
    switch (status) {
      case "sending":
        return "Please wait...";
      case "success":
        return "Thanks, check your email :)";
      case "error":
        return "ERROR";
      default:
        return "Download Trials";
    }
  };

  useEffect(() => {
    // console.log(Object.keys(state), requiredLength);
    setOkToSend(Object.keys(state).length >= requiredLength);
  }, [state]);

  const _collectTypefacesId = () => {
    const ids = trials.map((item, i) => item.typeface?._id);
    return ids;
  };
  console.log(trials);
  const _onSubmit = async (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!okToSend) return;
    setStatus("sending");
    document.body.classList.add("is-fetching");

    const typefacesId = _collectTypefacesId();
    // console.log(typefacesId);
    // return;
    if (!typefacesId[0]) return;
    // console.log(typefacesId);
    const payload = {
      clientInfos: state,
      typefacesId: typefacesId,
    };
    console.log(payload);
    // return;
    try {
      const res = await fetch("/api/trials", {
        method: "POST",
        body: JSON.stringify({ data: payload }),
      });
      const data = await res.json();
      console.log(data);
      if (data.ok) {
        setStatus("success");
      }
      // if (setSearchResult) setSearchResult(data);
      document.body.classList.remove("is-fetching");
    } catch (error: any) {
      console.log(error);
    }
    // .join("&");
  };

  // console.log(state);

  return (
    <div className='trials-download'>
      <div className='px-md'>Licencee Information:</div>
      <form action='' className='form-trials' onSubmit={_onSubmit}>
        <div className='client-infos'>
          {fields.map((item, i) => (
            <div className='form-row' key={i}>
              {item.required && <span className='text-red'>*</span>}
              <label htmlFor={item.name}>{item.name}:</label>
              <input
                type={item.type}
                name={item.name}
                placeholder={item.name}
                required={item.required}
                role='textbox'
                onChange={({ target }) => {
                  setState((prev: any) => ({
                    ...prev,
                    [item.name]: target.value,
                  }));
                }}
                // defaultValue={state[item.name]}
              />
            </div>
          ))}
        </div>
        <div className='consent'>
          <div className='form-row'>
            <Checkbox
              name={"✓ I agree with the EULA"}
              onChange={(checked: boolean) => {}}
            />
          </div>
          <div className='form-row'>
            <Checkbox
              name={"✓ Subscribe to Outline Online Newsletter!"}
              onChange={(checked: boolean) => {}}
            />
          </div>
        </div>
        {okToSend && (
          <div className='footer'>
            <button type='submit'>{getButtonMsg()}</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default TrialsDownload;

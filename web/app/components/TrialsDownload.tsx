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
  const groups = [
    {
      title: "LICENCEE INFORMATION",
      fields: [
        { type: "text", name: "website", required: false },
        { type: "email", name: "email", required: true },
      ],
    },

    {
      title: "NAME",
      fields: [
        { type: "text", name: "first_name", required: false },
        { type: "text", name: "last_name", required: true },
      ],
    },

    {
      title: "COMPANY",
      fields: [
        { type: "text", name: "name", required: false },
        { type: "text", name: "location", required: false },
      ],
    },

    {
      title: "ADDRESS",
      fields: [
        { type: "text", name: "postbox", required: false },
        { type: "text", name: "street", required: false },
        { type: "text", name: "zipcode", required: false },
        { type: "text", name: "city", required: false },
        { type: "text", name: "county", required: false },
        { type: "text", name: "country", required: false },
      ],
    },
  ];

  const requiredLength = groups.reduce(
    (sum, tasks) =>
      tasks.fields.reduce((previousSum, task) => {
        const is = task.required ? 1 : 0;
        return previousSum + is;
      }, sum),
    0
  );
  // console.log({ requiredLength });

  // const r = groups.reduce((count, current) => count + current.products.length, 0);
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
  // console.log(trials);
  const _collectTypefacesId = () => {
    const ids = trials.map((item, i) => item.typeface?._id);
    return ids;
  };
  // console.log(trials);
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
      // console.log(data);
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
      <form action='' className='form-trials' onSubmit={_onSubmit}>
        <div className='client-infos'>
          {groups.map((item, i) => (
            <div className='form-group' key={i}>
              <div className='title'>{item.title}</div>
              <div className='fields'>
                {item.fields.map((field, i) => (
                  <div className='form-row' key={i}>
                    {field.required && <span className='text-red'>*</span>}
                    <label htmlFor={field.name}>{field.name}:</label>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.name}
                      required={field.required}
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

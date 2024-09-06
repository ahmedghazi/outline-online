"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Product, Style, Trials } from "../types/schema";
import clsx from "clsx";
import Dialog from "./ui/Dialog";
import Checkbox from "./ui/Checkbox";
import { usePageContext } from "../context/PageContext";
import useShop from "./shop/ShopContext";
import TrialsDownload from "./TrialsDownload";
import { _removeFromArr } from "../utils/utils";
import { PortableText } from "next-sanity";
import portableTextComponents from "../utils/portableTextComponents";

type TypeFaceItemProps = {
  input: Product;
  defaultActive?: boolean;
};

/*
TO DO
- select, select all [product, product > style]
- dialog form
- api/get-trials
- - array typeface > file
- - email send (pj, link dl)
- - link dl expire
*/
const TypeFaceItem = ({ input, defaultActive }: TypeFaceItemProps) => {
  const [active, setActive] = useState<boolean>(false);
  const { trials, setTrials } = useShop();
  return (
    <div className={clsx("item", active && "is-active")}>
      <div className='_row grid md:grid-cols-8 gap-md-'>
        <div
          className={clsx("flex gap-sm col-span-2 cursor-pointer")}
          onClick={() => setActive(!active)}>
          <button className='btn-toggle'>►</button>
          <h2>{input.title}</h2>
        </div>
        {/* {input.singles && (
          <div className='styles'>{input.singles.length} styles</div>
        )} */}
        <div className='md:col-span-5'>
          <div className='grid md:grid-cols-5 gap-sm'>
            <div className='label'>metadata</div>
            {input.metadata?.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </div>
        </div>

        <div className='flex justify-end'>
          {/* {defaultActive && "defaultActive"} */}
          <Checkbox
            name={input.title?.toLowerCase() || ""}
            checked={defaultActive}
            onChange={(checked: boolean) => {
              // console.log(checked);
              const { singles } = input;
              if (!singles) return;

              // console.log({ checked });
              if (checked) {
                // setTrials((prev: any) => [...prev, ...singles]);
                // setTrials({ type: "ADD", payload: [...singles] });
                singles.forEach((el) => {
                  setTrials({ type: "ADD", payload: el });
                });
              } else {
                // console.log({ trials });
                // console.log(typeof singles);
                // console.log({ singles });
                singles.forEach((el) => {
                  // console.log(el);
                  setTrials({ type: "REMOVE", payload: el });
                });
                // const arrToFilter = trials;
                // let filteredArr = _removeFromArr(arrToFilter, ...singles);
                // console.log({ filteredArr });
                // setTrials(filteredArr);

                // const newArr = trials.filter(
                //   (el: any) => el._key !== input.bundles.
                // );
              }
            }}
          />
        </div>
      </div>
      {active && (
        <div className='detail'>
          <div className='grid md:grid-cols-8 gap-md-'>
            {input.singles?.map((item, i) => (
              <div className='item col-start-3 col-span-6' key={i}>
                <div className='_row flex justify-between'>
                  <div className='title text-muted'>{item.title}</div>
                  {/* <Checkbox
                    name={item.title || ""}
                    onChange={(checked: boolean) => {
                      // console.log(item.title, checked);
                      if (checked) {
                        setTrials((prev: any) => [...prev, item]);
                      } else {
                        const newArr = trials.filter(
                          (el: any) => el._key !== item._key
                        );
                        setTrials(newArr);
                      }
                    }}
                  /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

type Props = {
  input: Trials;
};
const ContentTrials = ({ input }: Props) => {
  // const [items, setItems] = useState<Style[]>([]);
  const [allActive, setAllActive] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { trials } = useShop();

  const total = useMemo(() => {
    const sum =
      input.typefaces &&
      input.typefaces.reduce((accumulator, item) => {
        return (accumulator += item.singles?.length || 0);
      }, 0);
    return sum || 0;
  }, []);

  const dlButtonClick = () => {
    if (trials.length === 0) {
      setAllActive(true);
    } else if (trials.length > 0) {
      setOpenModal(true);
    }
  };

  const _getDlButtonLabel = () => {
    if (trials.length === 0) return "Select all";
    else if (trials.length > 0 && trials.length < total)
      return "Download selected";
    else if (trials.length === total) return "Download all";
    else return "";
  };

  return (
    <div className='content content-trials min-h-screen pt-header-height px-lg'>
      <div className='list min-h-full '>
        {input.typefaces &&
          input.typefaces.map((item, i) => (
            <TypeFaceItem key={i} input={item} defaultActive={allActive} />
          ))}
      </div>
      <div
        className={clsx("footer", trials.length > 0 && "has-trials")}
        onClick={() => {
          if (trials.length > 0) {
            setOpenModal(true);
          }
        }}>
        <Checkbox
          name={_getDlButtonLabel()}
          checked={openModal}
          onChange={(checked: boolean) => {
            if (checked) setAllActive(trials.length < total);
            else {
              setAllActive(false);
            }
          }}
        />
        {/* <div className='checkbox-ui'>
          <label htmlFor='dl'>
            <input
              type='checkbox'
              id='dl'
              name='dl'
              onChange={(e) => {
                if (trials.length === 0) {
                  setAllActive(e.target.checked);
                }
              }}
            />
            <span className='checkmark'></span>
            <span className='label'>{_getDlButtonLabel()}</span>
          </label>
        </div> */}
      </div>
      {/* <pre>{JSON.stringify(trials, null, 2)}</pre> */}
      <Dialog openModal={openModal} onCloseModal={() => setOpenModal(false)}>
        <TrialsDownload />
      </Dialog>

      <div className='infos absolute bottom-header-height'>
        <div className='grid md:grid-cols-8 gap-md'>
          <h2 className='md:col-start-4'>{input.infosLabel}:</h2>
          <div className='text md:col-span-4'>
            {input.infos && (
              <PortableText
                value={input.infos}
                components={portableTextComponents}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTrials;

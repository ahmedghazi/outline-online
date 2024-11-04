"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Product, Trials } from "../types/schema";
import clsx from "clsx";
import Dialog from "./ui/Dialog";
import Checkbox from "./ui/Checkbox";
// import { usePageContext } from "../context/PageContext";
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
      <div className='_row grid grid-cols-6 md:grid-cols-8 gap-md-'>
        <div
          className={clsx(
            "flex gap-sm col-span-3 md:col-span-2 cursor-pointer"
          )}
          onClick={() => setActive(!active)}>
          <button className='btn-toggle'>◢</button>
          <h2>{input.title}</h2>
        </div>
        {/* {input.singles && (
          <div className='styles'>{input.singles.length} styles</div>
        )} */}
        <div className='col-span-2 md:col-span-5'>
          <div className='grid md:grid-cols-5 gap-sm'>
            <div className='label hidden-sm'>Metadata</div>
            {input.singles && (
              <div className='styles sm-only'>
                {input.singles.length} styles
              </div>
            )}
            {input.metadata?.map((item, i) => (
              <div key={i} className='hidden-sm'>
                {item}
              </div>
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
                singles.forEach((el) => {
                  setTrials({ type: "ADD", payload: el });
                });
              } else {
                singles.forEach((el) => {
                  // console.log(el);
                  setTrials({ type: "REMOVE", payload: el });
                });
              }
            }}
          />
        </div>
      </div>
      {active && (
        <div className='detail'>
          <div className='grid grid-cols-2- md:grid-cols-8 gap-md-'>
            {input.singles?.map((item, i) => (
              <div className='item md:col-span-6 md:col-start-3' key={i}>
                <div className='_row flex  justify-end md:block'>
                  <div className='title w-1/2 md:w-full text-muted'>
                    {item.title}
                  </div>
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
  const { trials, setTrials } = useShop();

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
  /*
- select all
- - download all
- download selected
*/
  return (
    <div className='content content-trials px-sm md:px-lg'>
      <div className='list  '>
        {input.typefaces &&
          input.typefaces.map((item, i) => (
            <TypeFaceItem key={i} input={item} defaultActive={allActive} />
          ))}
      </div>
      <div
        className={clsx(
          "footer",
          // trials.length > 0 && "has-trials-"
          trials.length > 0 ? "button-submit" : "button-disabled"
        )}
        onClick={() => {
          // if (trials.length > 0) {
          //   setOpenModal(true);
          // }
        }}>
        {trials.length === 0 && (
          <Checkbox
            name={_getDlButtonLabel()}
            // checked={openModal}
            onChange={(checked: boolean) => {
              setAllActive(checked);
            }}
          />
        )}
        {trials.length > 0 && (
          <Checkbox
            name={_getDlButtonLabel()}
            checked={openModal}
            onChange={(checked: boolean) => {
              setOpenModal(checked);
            }}
          />
        )}
        {/* {openModal && <span>openModal</span>} */}
        {/* <Checkbox
          name={_getDlButtonLabel()}
          checked={openModal}
          onChange={(checked: boolean) => {
            if (checked) {
              if (trials.length === 0) {
                setAllActive(true);
              }
              if (trials.length > 0) {
                setOpenModal(true);
              }
            } else {
              setAllActive(false);
              setTrials({ type: "REMOVE_ALL" });
            }
            // if (checked) setAllActive(trials.length < total);
            // else {
            //   setAllActive(false);
            // }
          }}
        /> */}
      </div>
      {/* <pre>{JSON.stringify(trials, null, 2)}</pre> */}
      <Dialog openModal={openModal} onCloseModal={() => setOpenModal(false)}>
        <TrialsDownload />
      </Dialog>

      <div className='infos md:absolute md:bottom-header-height'>
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

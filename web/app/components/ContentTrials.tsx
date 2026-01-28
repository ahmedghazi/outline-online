"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Product, Trials } from "../types/schema";
import clsx from "clsx";
import Dialog from "./ui/Dialog";
import Checkbox from "./ui/Checkbox";
// import { usePageContext } from "../context/PageContext";
import useShop from "./shop/ShopContext";
import TrialsDownload from "./TrialsDownload";
import { PortableText } from "next-sanity";
import portableTextComponents from "../sanity-api/portableTextComponents";

type TypeFaceItemProps = {
  input: Product;
  defaultActive?: boolean;
};

/*
TO DO
// - select, select all [product, product > style]
// - dialog form
// - api/get-trials
// - - array typeface > file
// - - email send (pj, link dl)
// - - link dl expire

get zip

*/
const TypeFaceItem = ({ input, defaultActive }: TypeFaceItemProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { trials, setTrials } = useShop();
  return (
    <div className={clsx("item", open && "is-open")}>
      <div className='_row grid grid-cols-6 md:grid-cols-8 gap-md-'>
        <div
          className={clsx(
            "flex gap-sm col-span-3 md:col-span-2 cursor-pointer py-05e",
          )}
          onClick={() => setOpen(!open)}>
          <button className='btn-toggle'>◢</button>
          <h2>{input.title}</h2>
        </div>

        <div className='col-span-2 md:col-span-3 py-05e'>
          <div className='grid md:grid-cols-4 gap-sm'>
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

        <div className='flex justify-end md:col-span-3 '>
          {/* {defaultActive && "defaultActive"} */}
          <Checkbox
            name={input.title?.toLowerCase() || ""}
            checked={defaultActive}
            onChange={(checked: boolean) => {
              if (checked) {
                setTrials({ type: "ADD", payload: input });
              } else {
                setTrials({ type: "REMOVE", payload: input });
              }
            }}
          />
        </div>
      </div>
      {open && (
        <div className='detail'>
          <div className='grid grid-cols-2- md:grid-cols-8 gap-md-'>
            {input.singles?.map((item, i) => (
              <div className='item md:col-span-6 md:col-start-3' key={i}>
                <div className='_row flex  justify-end md:block'>
                  <div className='title w-1/2 md:w-full text-muted'>
                    {item.title}
                  </div>
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
    else if (trials.length === total) return "Download";
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
          trials.length > 0 ? "button-submit" : "button-disabled",
        )}>
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

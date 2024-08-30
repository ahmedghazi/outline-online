"use client";
import React, { useEffect, useState } from "react";
import { Product, Style, Trials } from "../types/schema";
import clsx from "clsx";
import Dialog from "./ui/Dialog";
import Checkbox from "./ui/Checkbox";
import { usePageContext } from "../context/PageContext";
import useShop from "./shop/ShopContext";
import TrialsDownload from "./TrialsDownload";

type TypeFaceItemProps = {
  input: Product;
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
const TypeFaceItem = ({ input }: TypeFaceItemProps) => {
  const [active, setActive] = useState<boolean>(false);
  const { trials, setTrials } = useShop();
  // console.log(input);
  return (
    <div className={clsx("item", active && "is-active")}>
      <div className='_row grid md:grid-cols-8 gap-md-'>
        <div
          className={clsx("flex gap-sm col-span-2 cursor-pointer")}
          onClick={() => setActive(!active)}>
          <button className='btn-toggle'>►</button>
          <h2>{input.title}</h2>
        </div>
        {input.singles && (
          <div className='styles'>{input.singles.length} styles</div>
        )}
        <div></div>
        <div></div>
        <div></div>
        <div></div>

        <div className='flex justify-end'>
          <Checkbox
            name={input.title || ""}
            onChange={(checked: boolean) => {
              if (checked && input.singles) {
                const styles = input.singles;
                setTrials((prev: any) => [...prev, ...styles]);
              } else {
                // const newArr = trials.filter(
                //   (el: any) => el._key !== item._key
                // );
                // setTrials(newArr);
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
  const { trials } = useShop();
  useEffect(() => {
    console.log(trials);
  }, [trials]);

  return (
    <div className='content-trials min-h-screen pt-header-height px-lg'>
      <div className='list mb-xl min-h-full '>
        {input.typefaces &&
          input.typefaces.map((item, i) => (
            <TypeFaceItem key={i} input={item} />
          ))}
      </div>
      {/* <pre>{JSON.stringify(trials, null, 2)}</pre> */}
      <Dialog openModal={trials.length > 0}>
        <TrialsDownload />
      </Dialog>

      <div className='infos absolute bottom-header-height'>
        <div className='grid md:grid-cols-8 gap-md'>
          <h2 className='md:col-start-4'>Trial Downloads:</h2>
          <div className='text md:col-span-4'>
            We offer trial fonts with bextended Western Latin character sets
            including numbers, and punctuation. Trial font files provided are
            strictly limited for testing and pitching purposes. By downloading
            the files, you accept Outline Online’s End User Licence Agreement
            (EULA). If you download the trial files, and would then like to use
            the font for a published project, your client will need to purchase
            the appropriate licence.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTrials;

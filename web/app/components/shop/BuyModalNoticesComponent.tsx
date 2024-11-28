import { BlockContent, BuyModalNotices, KeyVal } from "@/app/types/schema";
import React, { Fragment, useEffect, useState } from "react";
import Dialog from "../ui/Dialog";
import { PortableText } from "next-sanity";
import portableTextComponents from "@/app/utils/portableTextComponents";

type Props = {
  input: BuyModalNotices;
};

const BuyModalNoticesComponent = ({ input }: Props) => {
  const { title, items } = input;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<BlockContent | undefined>(
    undefined
  );

  useEffect(() => {
    if (currentItem) setOpenModal(true);
  }, [currentItem]);

  useEffect(() => {
    if (!openModal) setCurrentItem(undefined);
  }, [openModal]);

  return (
    <div className='buy-modal-notices'>
      {/* <pre>{JSON.stringify(input, null, 2)}</pre> */}
      <div className='nav flex'>
        <span className='title'>{title}</span>{" "}
        {items?.map((item, i) => (
          <Fragment key={i}>
            <button onClick={() => setCurrentItem(item.val)}>
              <span className='underline'>{item.key}</span>
            </button>
            {/* {i < items.length - 1 && ", "} */}
          </Fragment>
        ))}
      </div>

      <Dialog openModal={openModal} onCloseModal={() => setOpenModal(false)}>
        {currentItem && (
          <div className='contact'>
            <div className='px-sm pb-sm'>
              <div className='text'>
                <PortableText
                  value={currentItem}
                  components={portableTextComponents}
                />
              </div>
            </div>
            <div className='footer'>
              <a href='mailto:mail@samiraschneuwly.ch'>Send email</a>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default BuyModalNoticesComponent;

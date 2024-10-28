import useDeviceDetect from "@/app/hooks/useDeviceDetect";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
type Props = {
  children: ReactNode;
  openModal: boolean;
  onCloseModal?: Function;
  // closeModal: Function;
};

const Dialog = ({ openModal, children, onCloseModal }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { isMobile } = useDeviceDetect();
  // console.log("openModal", openModal);
  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
      if (onCloseModal) onCloseModal();
    }
  }, [open]);
  // console.log({ isMobile });
  return (
    <>
      {ready && (
        // <Draggable nodeRef={ref} disabled={isMobile}>
        <dialog
          ref={ref}
          // onCancel={closeModal}
        >
          <div className='header'>
            <button
              className='!text-red text-[18px]'
              onClick={() => setOpen(false)}>
              ╳
            </button>
          </div>
          {children}
        </dialog>
        // </Draggable>
      )}
    </>
  );
};

export default Dialog;

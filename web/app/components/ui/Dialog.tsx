import React, { ReactNode, useEffect, useRef } from "react";
import Draggable from "react-draggable";
type Props = {
  children: ReactNode;
  openModal: boolean;
  onCloseModal?: Function;
  // closeModal: Function;
};

const Dialog = ({ openModal, children, onCloseModal }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
      if (onCloseModal) onCloseModal();
    }
  }, [openModal]);

  return (
    <Draggable>
      <dialog
        ref={ref}
        // onCancel={closeModal}
      >
        <div className='header'>
          <button className='text-red' onClick={() => ref.current?.close()}>
            ╳
          </button>
        </div>
        {children}
      </dialog>
    </Draggable>
  );
};

export default Dialog;

import React, { ReactNode, useEffect, useRef } from "react";
import Draggable from "react-draggable";
type Props = {
  children: ReactNode;
  openModal: boolean;
  // closeModal: Function;
};

const Dialog = ({ openModal, children }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
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

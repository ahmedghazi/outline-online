import React, { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  openModal: boolean;
  closeModal: Function;
};

const Dialog = ({ openModal, closeModal, children }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog
      ref={ref}
      // onCancel={closeModal}
    >
      {children}
      <button onClick={() => closeModal()}>Close</button>
    </dialog>
  );
};

export default Dialog;

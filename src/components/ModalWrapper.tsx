import React, { ReactNode } from "react";

interface Prop {
  children: ReactNode;
}

const ModalWrapper: React.FC<Prop> = ({ children }) => {
  return <div className="p-2">{children}</div>;
};

export default ModalWrapper;

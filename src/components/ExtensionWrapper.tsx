import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ExtensionWrapper: React.FC<Props> = ({ children }) => {
  return <div className="flex flex-col w-[380px]">{children}</div>;
};

export default ExtensionWrapper;

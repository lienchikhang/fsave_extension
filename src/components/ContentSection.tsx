import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ContentSection: React.FC<Props> = ({ children }) => {
  return (
    <section className="contentSection flex-1 p-4 bg-slate-950">
      {children}
    </section>
  );
};

export default ContentSection;

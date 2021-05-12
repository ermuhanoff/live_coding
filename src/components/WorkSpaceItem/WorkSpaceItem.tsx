import React, { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  size?: {
    width: number;
    height: number;
  };
}

const WorkSpaceItem: FC<Props> = ({
  children,
  size = { width: 100, height: 100 },
}: Props) => {
  return (
    <div style={{ width: size.width + "%", height: size.height + "%" }}>
      {children}
    </div>
  );
};

export default WorkSpaceItem;

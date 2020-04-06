import React from "react";

const If: React.FunctionComponent<{ condition: boolean }> = (
  props: React.PropsWithChildren<{
    condition: boolean;
  }>
): JSX.Element => {
  return <>{props?.condition ? props.children : null}</>;
};

export default If;

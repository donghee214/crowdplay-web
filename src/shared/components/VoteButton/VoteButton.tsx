import React, { PureComponent } from "react";

interface Props {
  active: Boolean;
}

export default ({ active }: Props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" className={"voteButton"}>
    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

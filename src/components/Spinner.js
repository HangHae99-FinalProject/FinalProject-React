import React from "react";
import { MutatingDots } from "react-loader-spinner";

import styled from "styled-components";

const Spinner = () => {
  return (
    <Wrap>
      <div className="spinners">
        <MutatingDots
          color="#2967AC"
          secondaryColor="#6AD8F5"
          height={100}
          width={100}
        />
      </div>
    </Wrap>
  );
};

export default Spinner;
const Wrap = styled.div`
  .spinners {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

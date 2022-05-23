import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    is_center,
    right,
    verticalAlign,
    position,
    display,
    width,
    padding,
    margin,
    bg,
    children,
    _onClick,
    _className,
  } = props;

  const styles = {
    is_flex: is_flex,
    is_center: is_center,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    display: display,
    position: position,
    verticalAlign: verticalAlign,
    className: _className,
    right: right,
  };

  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  is_center: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  _onClick: () => {},
  display: null,
  position: false,
  verticalAlign: false,
  right: false,
  className: "",
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  box-sizing: border-box;
  vertical-align: ${(props) => props.verticalAlign};
  ${(props) => (props.display ? `display: ${props.display}` : "")};
  ${(props) => (props.right ? `right: ${props.right}` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding}` : "")};
  ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
  ${(props) => (props.position ? `position: ${props.position}` : "")};
  ${(props) => (props.bg ? `background-color: ${props.bg}` : "")};
  ${(props) =>
    props.is_flex ? `display:flex; align-items:center; justify-content:space-between` : ""}
  ${(props) =>
    props.is_center
      ? `display:flex; flex-direction:column; align-items:center; justify-content:center`
      : ""}
`;

export default Grid;

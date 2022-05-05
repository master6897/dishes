import styled, { css } from "styled-components";

const StyledButton = styled.button`
  padding: 1rem;
  border: 1px solid purple;
  border-radius: 2rem;
  transition: 0.3s;
  font-size: 1.1rem;
  ${(props) =>
    props.primary &&
    css`
      background-color: #00008b;
      color: white;
      &:hover {
        background-color: white;
        color: black;
      }
    `};
  ${(props) =>
    props.secondary &&
    css`
      background-color: transparent;
      color: black;
      &:hover {
        background-color: #00008b;
        color: white;
      }
    `};
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.disabled &&
    css`
      background-color: grey;
      color: white;
      cursor: not-allowed;
      border: 1px solid grey;
      &:hover {
        background-color: grey;
        color: white;
        cursor: not-allowed;
        border: 1px solid grey;
      }
    `}
`;

const Button = (props) => {
  return (
    <StyledButton
      onClick={props.onClick}
      primary={props.primary}
      secondary={props.secondary}
      type={props.type}
      disabled={props.disabled}
    >
      {props.value}
    </StyledButton>
  );
};

export default Button;

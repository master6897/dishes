import styled, { keyframes } from "styled-components";

const animation = keyframes`
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 65vh;
  & div.animation {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 20rem;
    &:after {
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid #fff;
      border-color: #00008b transparent #00008b transparent;
      animation: ${animation} 1.2s linear infinite;
    }
  }
`;

const Loading = (props) => {
  return (
    <StyledContainer animate={props.animate}>
      <div className="animation"></div>
    </StyledContainer>
  );
};
export default Loading;

import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5rem;
  background-color: #00008b;
  color: white;
`;

const Navigation = () => {
  return (
    <StyledHeader>
      <h1>Dishes</h1>
    </StyledHeader>
  );
};
export default Navigation;

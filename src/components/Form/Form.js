import styled from "styled-components";
import Button from "../Shared/Button/Button";

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 60%;
  padding: 2rem;
  box-sizing: border-box;
  border: 2px solid #00008b;
  border-radius: 2rem;
  @media (max-width: 768px) {
    width: 90%;
  }
  & div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 90%;
    margin: 1rem 0;
    @media (max-width: 768px) {
      flex-direction: column;
    }
    &.error {
      & input {
        border-color: red;
      }
    }
    &.buttons-container {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      @media (max-width: 768px) {
        flex-direction: row;
      }
    }
    & label {
      width: 40%;
      font-size: 1.3rem;
      text-align: left;
      @media (max-width: 768px) {
        width: 90%;
      }
    }
    & input {
      width: 60%;
      font-size: 1.1rem;
      padding: 0.5rem;
      border: 1px solid black;
      border-radius: 1rem;
      transition: 0.3s;
      box-sizing: border-box;
      @media (max-width: 768px) {
        width: 90%;
      }
      &:focus {
        padding: 1rem;
      }
    }
    & select {
      font-size: 1.2rem;
      padding: 0.3rem;
    }
  }
  & p {
    color: red;
    text-align: right;
    width: 90%;
  }
`;

const Form = (props) => {
  return (
    <StyledForm onSubmit={props.formSubmitHandler}>
      <div
        className={props.dishNameTouched && props.dishNameError ? "error" : ""}
      >
        <label>Dish name:</label>
        <input
          type="text"
          value={props.dishName}
          onChange={props.dishNameChangeHandler}
          onBlur={props.dishNameBlurHandler}
          placeholder="For example: Pasta"
        />
      </div>
      {props.dishNameTouched && props.dishNameError && (
        <p>Dish name can not be empty!</p>
      )}
      <div
        className={
          props.preparationTimeTouched && props.preparationTimeError
            ? "error"
            : ""
        }
      >
        <label>Preparation time:</label>
        <input
          type="time"
          step="2"
          value={props.preparationTime}
          onChange={props.preparationTimeChangeHandler}
          onBlur={props.preparationTimeBlurHandler}
        />
      </div>
      {props.preparationTimeTouched && props.preparationTimeError && (
        <p>Preparation time can not be empty!</p>
      )}
      <div
        className={props.dishTypeTouched && props.dishTypeError ? "error" : ""}
      >
        <label>Type:</label>
        <select
          value={props.dishType}
          onChange={props.dishTypeChangeHandler}
          onBlur={props.dishTypeBlurHandler}
        >
          <option value="pizza">pizza</option>
          <option value="soup">soup</option>
          <option value="sandwich">sandwich</option>
        </select>
      </div>
      {props.dishTypeTouched && props.dishTypeError && (
        <p>Select proper dish type!</p>
      )}
      {props.otherFields}
      <div className="buttons-container">
        <Button
          type="submit"
          value="Send request"
          disabled={!props.isValid}
          primary
        />
        <Button
          type="reset"
          value="Reset"
          secondary
          onClick={props.resetForm}
        />
      </div>
    </StyledForm>
  );
};
export default Form;

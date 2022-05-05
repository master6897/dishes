import useInput from "../hooks/useInput";
import useHttp from "../hooks/useHttp";
import Form from "./Form";
import styled from "styled-components";
import Loading from "../Shared/Modal/Loading";
import { useState } from "react";
import Button from "../Shared/Button/Button";

const StyledSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 90vh;
`;

const FormContainer = () => {
  const [isDone, setIsDone] = useState(false);
  const applyData = (data) => {
    console.log(data);
    setIsDone(true);
  };
  const { isLoading, error, setError, sendRequest } = useHttp(applyData);
  const {
    inputValue: dishName,
    error: dishNameError,
    isTouched: dishNameTouched,
    onChangeHandler: dishNameChangeHandler,
    onBlurHandler: dishNameBlurHandler,
    resetInput: dishNameReset,
  } = useInput((item) => item !== "");
  const {
    inputValue: preparationTime,
    error: preparationTimeError,
    isTouched: preparationTimeTouched,
    onChangeHandler: preparationTimeChangeHandler,
    onBlurHandler: preparationTimeBlurHandler,
    resetInput: preparationTimeReset,
  } = useInput((item) => item !== "");
  const {
    inputValue: dishType,
    error: dishTypeError,
    isTouched: dishTypeTouched,
    onChangeHandler: dishTypeChangeHandler,
    onBlurHandler: dishTypeBlurHandler,
    resetInput: dishTypeReset,
  } = useInput((item) => item !== "", "pizza");
  const {
    inputValue: numOfSlices,
    error: numOfSlicesError,
    isTouched: numOfSlicesTouched,
    onChangeHandler: numOfSlicesChangeHandler,
    onBlurHandler: numOfSlicesBlurHandler,
    resetInput: numOfSlicesReset,
  } = useInput((item) => item > 0, 1);
  const {
    inputValue: diameter,
    error: diameterError,
    isTouched: diameterTouched,
    onChangeHandler: diameterChangeHandler,
    onBlurHandler: diameterBlurHandler,
    resetInput: diameterReset,
  } = useInput((item) => item > 0 && item < 50, 1.1);
  const {
    inputValue: spiciness,
    error: spicinessError,
    isTouched: spicinessTouched,
    onChangeHandler: spicinessChangeHandler,
    onBlurHandler: spicinessBlurHandler,
    resetInput: spicinessReset,
  } = useInput((item) => item > 0 && item < 11, 1);
  const {
    inputValue: slicesOfBread,
    error: slicesOfBreadError,
    isTouched: slicesOfBreadTouched,
    onChangeHandler: slicesOfBreadChangeHandler,
    onBlurHandler: slicesOfBreadBlurHandler,
    resetInput: slicesOfBreadReset,
  } = useInput((item) => item > 0, 1);

  const resetForm = (evt) => {
    evt.preventDefault();
    dishNameReset();
    preparationTimeReset();
    dishTypeReset();
    numOfSlicesReset();
    diameterReset();
    spicinessReset();
    slicesOfBreadReset();
    setError(false);
    setIsDone(false);
  };
  let otherFields = null;
  if (dishType === "pizza") {
    otherFields = (
      <>
        <div className={numOfSlicesTouched && numOfSlicesError ? "error" : ""}>
          <label>Number of slices:</label>
          <input
            type="number"
            value={numOfSlices}
            onChange={numOfSlicesChangeHandler}
            onBlur={numOfSlicesBlurHandler}
          />
        </div>
        {numOfSlicesTouched && numOfSlicesError && (
          <p>Enter valid number of slices (min. 1 slice)!</p>
        )}
        <div className={diameterTouched && diameterError ? "error" : ""}>
          <label>Diameter:</label>
          <input
            type="number"
            step="0.01"
            value={diameter}
            onChange={diameterChangeHandler}
            onBlur={diameterBlurHandler}
          />
        </div>
        {diameterTouched && diameterError && (
          <p>Enter valid diameter value (greater than 0)!</p>
        )}
      </>
    );
  } else if (dishType === "soup") {
    otherFields = (
      <>
        <div className={spicinessTouched && spicinessError ? "error" : ""}>
          <label>Spiciness scale:</label>
          <input
            type="number"
            value={spiciness}
            onChange={spicinessChangeHandler}
            onBlur={spicinessBlurHandler}
            min="1"
            max="10"
          />
        </div>
        {spicinessTouched && spicinessError && (
          <p>Select valid spiciness scale (from 1 to 10)!</p>
        )}
      </>
    );
  } else if (dishType === "sandwich") {
    otherFields = (
      <>
        <div
          className={slicesOfBreadTouched && slicesOfBreadError ? "error" : ""}
        >
          <label>Slices of bread:</label>
          <input
            type="number"
            value={slicesOfBread}
            onChange={slicesOfBreadChangeHandler}
            onBlur={slicesOfBreadBlurHandler}
          />
        </div>
        {slicesOfBreadTouched && slicesOfBreadError && (
          <p>Slices of bread must be grater than 0!</p>
        )}
      </>
    );
  }
  let isValid = false;
  if (
    !dishNameError &&
    dishNameTouched &&
    !preparationTimeError &&
    preparationTimeTouched &&
    !dishTypeError
  ) {
    if (dishType === "pizza") {
      if (!numOfSlicesError && !diameterError) {
        isValid = true;
      }
    } else if (dishType === "soup") {
      if (!spicinessError) {
        isValid = true;
      }
    } else if (dishType === "sandwich") {
      if (!slicesOfBreadError) {
        isValid = true;
      }
    }
  }

  const formSubmitHandler = (evt) => {
    let parameters = {
      name: dishName,
      preparation_time: preparationTime,
      type: dishType,
    };
    if (dishType === "pizza") {
      parameters.no_of_slices = +numOfSlices;
      parameters.diameter = +diameter;
    } else if (dishType === "soup") {
      parameters.spiciness_scale = +spiciness;
    } else if (dishType === "sandwich") {
      parameters.slices_of_bread = +slicesOfBread;
    }
    evt.preventDefault();
    sendRequest({
      url: "https://frosty-wood-6558.getsandbox.com/dishes",
      method: "POST",
      body: { ...parameters },
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <StyledSection>
      {!isLoading && !error && !isDone && (
        <Form
          dishName={dishName}
          dishNameError={dishNameError}
          dishNameTouched={dishNameTouched}
          dishNameChangeHandler={dishNameChangeHandler}
          dishNameBlurHandler={dishNameBlurHandler}
          preparationTime={preparationTime}
          preparationTimeError={preparationTimeError}
          preparationTimeTouched={preparationTimeTouched}
          preparationTimeChangeHandler={preparationTimeChangeHandler}
          preparationTimeBlurHandler={preparationTimeBlurHandler}
          dishType={dishType}
          dishTypeError={dishTypeError}
          dishTypeTouched={dishTypeTouched}
          dishTypeChangeHandler={dishTypeChangeHandler}
          dishTypeBlurHandler={dishTypeBlurHandler}
          resetForm={resetForm}
          formSubmitHandler={formSubmitHandler}
          otherFields={otherFields}
          isValid={isValid}
        />
      )}
      {isLoading && <Loading />}
      {!isLoading && error && (
        <div>
          <h1>Something went wrong!</h1>
          <Button value="Try again" onClick={resetForm} primary />
        </div>
      )}
      {isDone && !error && (
        <div>
          <h1>Request sent successfully!</h1>
          <Button value="Make another order" onClick={resetForm} primary />
        </div>
      )}
    </StyledSection>
  );
};
export default FormContainer;

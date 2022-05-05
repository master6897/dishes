import { useState } from "react";
const useInput = (validation, defaultValue = "") => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validation(inputValue);
  const error = !valueIsValid && isTouched;

  const onChangeHandler = (evt) => {
    setInputValue(evt.target.value);
  };
  const onBlurHandler = () => {
    setIsTouched(true);
  };
  const resetInput = () => {
    if (defaultValue === "") {
      setInputValue("");
    } else {
      setInputValue(defaultValue);
    }
    setIsTouched(false);
  };

  return {
    inputValue,
    error,
    isTouched,
    onChangeHandler,
    onBlurHandler,
    resetInput,
  };
};
export default useInput;

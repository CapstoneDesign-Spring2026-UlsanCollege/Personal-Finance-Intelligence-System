import { useState } from "react";

export default function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function reset(nextState = initialValues) {
    setValues(nextState);
  }

  return { values, setValues, handleChange, reset };
}

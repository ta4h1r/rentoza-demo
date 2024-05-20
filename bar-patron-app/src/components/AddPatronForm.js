import React, { useState } from "react";
import { addPatron } from "../utils/api";
import { GenericForm } from "./GenericForm";

const AddPatronForm = ({
  show,
  setShow,
  allDrinks,
  setRevalidate,
  setIsLoading,
  isLoading
}) => {
  const [formState, setFormState] = useState({
    name: "",
    drinks: [],
    bodyMass: null,
  });
  const [drink, setDrink] = useState({
    name: "",
    id: "",
  });

  const handleClose = () => {
    setFormState({ name: "", drinks: [] });
    setDrink("");
    setShow(false);
    setIsLoading(false);
  };
  const handleSubmit = () => {
    if (!formState.name) alert("Please insert a patron name");
    if (!formState.bodyMass) alert("Please insert a patron body mass");
    if (isNaN(formState.bodyMass))
      alert("Please insert a number for patron body mass");
    else {
      // Upload to db
      setIsLoading(true);
      addPatron(formState).then((_) => {
        setRevalidate(true);
        handleClose();
      });
    }
  };

  return (
    <GenericForm
      title="Add Patron"
      show={show}
      handleClose={handleClose}
      formState={formState}
      setFormState={setFormState}
      setDrink={setDrink}
      allDrinks={allDrinks}
      drink={drink}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default AddPatronForm;

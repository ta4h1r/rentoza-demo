import React, { useState } from "react";
import { addPatron } from "../uils/api";
import { GenericForm } from "./GenericForm";

const AddPatronForm = ({ show, setShow, allDrinks, setRevalidate }) => {
  const [formState, setFormState] = useState({
    name: "",
    drinks: [],
    bodyMass: null,
  });
  const [drink, setDrink] = useState("");

  const handleClose = () => {
    setFormState({ name: "", drinks: [] });
    setDrink("");
    setShow(false);
  };
  const handleSubmit = () => {
    if (!formState.name) alert("Please insert a patron name");
    else {
      // Upload to db
      addPatron(formState);
      setRevalidate(true);
      handleClose();
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
    />
  );
};

export default AddPatronForm;

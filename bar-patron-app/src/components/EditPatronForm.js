import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { addPatron, editPatron, getPatron } from "../uils/api";
import { GenericForm } from "./GenericForm";

const EditPatronForm = ({
  show,
  setShow,
  patronToEdit,
  setRevalidate,
  allDrinks,
}) => {
  const [formState, setFormState] = useState({ name: "", drinks: [] });
  const [drink, setDrink] = useState("");

  useEffect(() => {
    if (patronToEdit)
      getPatron(patronToEdit).then((r) => {
        setFormState({
          name: r.data.name,
          drinks: r.data.drinks,
          bodyMass: r.data.bodyMass,
        });
      });
  }, [patronToEdit]);

  const handleClose = () => {
    setShow(false);
  };
  const handleSubmit = () => {
    if (!formState.name) alert("Please insert a patron name");
    if (!formState.bodyMass) alert("Please insert a patron body mass");
    else {
      editPatron(patronToEdit, formState);
      setRevalidate(true);
      handleClose();
    }
  };

  return (
    <GenericForm
      title="Edit Patron"
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

export default EditPatronForm;

import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { addPatron, editPatron, getPatron } from "../utils/api";
import { GenericForm } from "./GenericForm";

const EditPatronForm = ({
  show,
  setShow,
  patronToEdit,
  setRevalidate,
  allDrinks,
  setIsLoading,
  isLoading,
}) => {
  const [formState, setFormState] = useState({ name: "", drinks: [] });
  const [drink, setDrink] = useState({
    name: "",
    id: "",
  });

  useEffect(() => {
    if (patronToEdit)
      getPatron(patronToEdit).then((r) => {
        setFormState({
          name: r.data ? r.data.name : "",
          drinks: r.data ? r.data.drinks : [],
          bodyMass: r.data ? r.data.bodyMass : 0,
        });
      });
  }, [patronToEdit]);

  const handleClose = () => {
    setIsLoading(false);
    setShow(false);
  };
  const handleSubmit = () => {
    if (!formState.name) alert("Please insert a patron name");
    if (!formState.bodyMass) alert("Please insert a patron body mass");
    if (isNaN(formState.bodyMass))
      alert("Please insert a number for patron body mass");
    else {
      setIsLoading(true);
      editPatron(patronToEdit, formState).then((_) => {
        setRevalidate(true);
        handleClose();
      });
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
      isLoading={isLoading}
    />
  );
};

export default EditPatronForm;

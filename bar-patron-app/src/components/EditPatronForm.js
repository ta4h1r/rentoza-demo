import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { addPatron, editPatron, getPatron } from "../uils/api";

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
        });
      });
  }, [patronToEdit]);

  const handleClose = () => {
    setShow(false);
  };
  const handleSubmit = () => {
    if (!formState.name) alert("Please insert a patron name");
    else {
      editPatron(patronToEdit, formState);
      setRevalidate(true);
      handleClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Patron</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input
              type="text"
              placeholder="Enter patron name"
              value={formState.name}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div>
            <ul>
              {formState.drinks.map((it) => (
                <div
                  key={it}
                  style={{
                    display: "flex",
                    margin: "5px",
                  }}
                >
                  <li>{it}</li>
                  <button
                    style={{
                      marginLeft: "5px",
                    }}
                    onClick={() => {
                      const drinksCopy = [...formState.drinks];
                      drinksCopy.splice(drinksCopy.indexOf(it), 1);
                      setFormState({
                        ...formState,
                        drinks: [...drinksCopy],
                      });
                    }}
                  >
                    x
                  </button>
                </div>
              ))}
            </ul>
            <label>Add a drink: </label>
            <select
              onChange={(e) => {
                setDrink(e.target.value);
              }}
            >
              <option value=""></option>
              {allDrinks.map((it) => (
                <option key={it?.strDrink} value={it?.strDrink}>{it?.strDrink}</option>
              ))}
            </select>
            <button
              style={{ margin: "5px" }}
              onClick={(e) => {
                if (!drink) alert("Please select a drink");
                else
                  setFormState({
                    ...formState,
                    drinks: [...formState.drinks, drink],
                  });
              }}
            >
              {" "}
              +{" "}
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditPatronForm;

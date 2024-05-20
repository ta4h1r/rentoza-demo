import React from "react";
import { Button, Modal } from "react-bootstrap";

export const GenericForm = ({
  title, 
  show,
  handleClose,
  formState,
  setFormState,
  setDrink,
  allDrinks,
  drink,
  handleSubmit,
}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label style={{ marginRight: "5px" }}>Patron Name</label>
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
          <label style={{ marginTop: "5px", marginRight: "5px" }}>
            Patron Mass
          </label>
          <div>
            <input
              type="text"
              placeholder="Enter patron body mass"
              value={formState.bodyMass}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  bodyMass: e.target.value,
                })
              }
            />
            <text> kg</text>
          </div>
          <label style={{ marginTop: "5px", marginRight: "5px" }}>
            Drinks Tally:
          </label>
          <div>
            <ul>
              {formState.drinks.map((it) => (
                <div
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
            <div>
              <select
                onChange={(e) => {
                  setDrink(e.target.value);
                }}
              >
                <option value=""></option>
                {allDrinks.map((it) => (
                  <option value={it?.strDrink}>{it?.strDrink}</option>
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

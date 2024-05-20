import React, { useState, useEffect } from "react";
import "./App.css";
import AddPatronForm from "./components/AddPatronForm";
import EditPatronForm from "./components/EditPatronForm";
import PatronList from "./components/PatronList";
import { loadPatrons, loadAllDrinks } from "./uils/api";
import { Button } from "react-bootstrap";

function App() {
  // Get data
  const [patrons, setPatrons] = useState([]);
  const [showAddPatronForm, setShowAddPatronForm] = useState(false);
  const [revalidate, setRevalidate] = useState(null);
  const [patronToEdit, setPatronToEdit] = useState("");
  const [showEditPatronForm, setShowEditPatronForm] = useState(false);

  useEffect(() => {
    loadPatrons().then((r) => {
      setPatrons(r.data);
      setRevalidate(false);
    });
  }, [revalidate]);

  const [allDrinks, setAllDrinks] = useState([]);

  useEffect(() => {
    loadAllDrinks().then((r) => setAllDrinks(r));
  }, []);

  return (
    <div style={{ margin: "20px" }}>
      <PatronList
        setRevalidate={setRevalidate}
        patrons={patrons}
        setShowEditPatronForm={setShowEditPatronForm}
        setPatronToEdit={setPatronToEdit}
      />
      <Button
        disabled={allDrinks.length < 1}
        onClick={() => setShowAddPatronForm(true)}
      >
        ADD PATRON
      </Button>
      <AddPatronForm
        show={showAddPatronForm}
        setShow={setShowAddPatronForm}
        allDrinks={allDrinks}
        setRevalidate={setRevalidate}
      />
       <EditPatronForm
        show={showEditPatronForm}
        setShow={setShowEditPatronForm}
        allDrinks={allDrinks}
        setRevalidate={setRevalidate}
        patronToEdit={patronToEdit}
      />
    </div>
  );
}

export default App;

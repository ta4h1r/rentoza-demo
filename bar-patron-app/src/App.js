import React, { useState, useEffect } from "react";
import "./App.css";

import PatronList from "./components/PatronList";
import { loadPatrons, loadAllDrinks, getPatronSaturation } from "./utils/api";
import { Button } from "react-bootstrap";

import AddPatronForm from "./components/AddPatronForm";
import EditPatronForm from "./components/EditPatronForm";

function App() {
  // Get data
  const [patrons, setPatrons] = useState([]);
  const [showAddPatronForm, setShowAddPatronForm] = useState(false);
  const [revalidate, setRevalidate] = useState(null);
  const [patronToEdit, setPatronToEdit] = useState("");
  const [showEditPatronForm, setShowEditPatronForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    loadPatrons().then((r) => {
      setPatrons(r.data);
      setRevalidate(null);
    });
  }, [revalidate]);

  // useEffect(() => {
  //   for(let i = 0; i < patrons.length; i++) {
  //     getPatronSaturation(patrons[i]._id).then(s => {
  //       console.log(s.data)
  //     })

  //   }
  // }, [patrons])

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

        // showAddPatronForm={showAddPatronForm}
        // setShowAddPatronForm= {setShowAddPatronForm}
        // allDrinks={allDrinks}
        // showEditPatronForm={showEditPatronForm}
        // patronToEdit={patronToEdit}
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
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <EditPatronForm
        show={showEditPatronForm}
        setShow={setShowEditPatronForm}
        allDrinks={allDrinks}
        setRevalidate={setRevalidate}
        patronToEdit={patronToEdit}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
     
    </div>
  );
}

export default App;

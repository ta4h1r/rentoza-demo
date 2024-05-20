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
      const mPatrons = r.data; 
      const promises = []
      for(let i = 0; i < mPatrons.length; i++) {
        promises.push(getPatronSaturation(mPatrons[i]._id))
      }
      Promise.all(promises).then(s => {
        s = s.map(s => s.data)
        for(let i = 0; i < mPatrons.length; i++) {
          mPatrons[i]["saturation"] = s[i]
        }
        setPatrons(mPatrons);
        setRevalidate(false);
      })
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

import React, { useState, useEffect } from "react";
import "./App.css";
import AddPatronForm from "./components/AddPatronForm";
import PatronList from "./components/PatronList";
import { loadPatrons, loadAllDrinks } from "./uils/api";
import { Button } from "react-bootstrap";

function App() {
  // Get data
  // const [patrons, setPatrons] = useState([]);
  // useEffect(() => {
  //   loadPatrons().then((r) => setPatrons(r));
  // }, []);

  const [showAddPatronForm, setShowAddPatronForm] = useState(false);

  const [allDrinks, setAllDrinks] = useState([]); 

  useEffect(() => {
      loadAllDrinks().then(r => setAllDrinks(r))
  }, [])

  return (
    <div style={{margin: "20px"}}>
      <PatronList
        patrons={[
          { id: "1", name: "patron1" },
          { id: "2", name: "patron2" },
        ]}
      />
      <Button disabled={allDrinks.length < 1} onClick={() => setShowAddPatronForm(true)} >ADD PATRON</Button>
      <AddPatronForm show={showAddPatronForm} setShow={setShowAddPatronForm} allDrinks={allDrinks} />
    </div>
  );
}

export default App;

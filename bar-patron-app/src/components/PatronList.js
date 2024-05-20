import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { removePatron } from "../uils/api";

const PatronList = ({ patrons, setRevalidate, setPatronToEdit, setShowEditPatronForm }) => {
  const editPatron = (id) => {
    setPatronToEdit(id)
    setShowEditPatronForm(true)
  };
  return (
    <>
      <div>
        <h2>Patrons List</h2>
        {patrons.length > 0 ? <p> Click on a patron to edit or view a patron's drinks tally </p> : null}
        <ul>
          {patrons.map((patron) => (
            <div key={patron._id}
              style={{
                display: "flex",
                margin: "5px",
              }}
            >
              <li onClick={() => editPatron(patron._id)} key={patron.id}>
                {patron.name}
              </li>
              <button
                style={{
                  marginLeft: "5px",
                }}
                onClick={() => {
                  removePatron(patron)
                  setRevalidate(true); 
                }}
              >
                x
              </button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PatronList;

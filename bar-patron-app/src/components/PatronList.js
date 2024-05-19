import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PatronList = ({ patrons }) => {
  const editPatron = (id) => {
    console.log(id);
  };
  return (
    <>
      <div>
        <h2>Patrons List</h2>
        <p> Click on a patron to edit </p>
        <ul>
          {patrons.map((patron) => (
            <li onClick={() => editPatron(patron.id)} key={patron.id}>
              {patron.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PatronList;

import { useNavigate } from 'react-router';
import React, { useState } from 'react';
import { api } from './api.1';
 export function AddMovie() {
  const style = {
    width:"690px"
  }
  const navigate = useNavigate();
  var [name, setname] = useState();
  var [pic, setpic] = useState();
  var [rating, setrating] = useState();
  var [description, setdescription] = useState();
  var button = () => {
    var newMovie = {
      pic,
      name,
      rating,
      description,
      A1: "seats",
      A2: "blocked",
      A3: "seats",
      A4: "seats",
      A5: "seats",
      A6: "seats",
      A7: "seats",
      A8: "seats",
      A9: "seats",
      A10: "seats",
      A11: "seats",
      A12: "seats",
      A13: "seats",
      A14: "seats",
      A15: "seats",
      B1: "seats",
      B2: "blocked",
      B3: "seats",
      B4: "seats",
      B5: "seats",
      B6: "seats",
      B7: "seats",
      B8: "seats",
      B9: "seats",
      B10: "seats",
      B11: "seats",
      B12: "seats",
      B13: "seats",
      B14: "seats",
      B15: "seats",
      C1: "seats",
      C2: "blocked",
      C3: "seats",
      C4: "seats",
      C5: "seats",
      C6: "seats",
      C7: "seats",
      C8: "seats",
      C9: "seats",
      C10: "seats",
      C11: "seats",
      C12: "seats",
      C13: "seats",
      C14: "seats",
      C15: "seats",
      D1: "seats",
      D2: "blocked",
      D3: "seats",
      D4: "seats",
      D5: "seats",
      D6: "seats",
      D7: "seats",
      D8: "seats",
      D9: "seats",
      D10: "seats",
      D11: "seats",
      D12: "seats",
      D13: "seats",
      D14: "seats",
      D15: "seats",
      E1: "seats",
      E2: "blocked",
      E3: "seats",
      E4: "seats",
      E5: "seats",
      E6: "seats",
      E7: "seats",
      E8: "seats",
      E10: "seats",
      E9: "seats",
      E11: "seats",
      E12: "seats",
      E13: "seats",
      E14: "seats",
      E15: "seats"
    };

    fetch(`${api}/admin/addMovie`, {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers: {
        "Content-Type": "application/json"
      
      }
    })
      .then(data => data.json()).then(data=> console.log(data))
  };
  return (
    <div className="movie">
     
      <input onChange={(e) => setname(e.target.value)} type="text" placeholder='name' style={style} />
      <input onChange={(e) => setpic(e.target.value)} type="text" placeholder='post' style={style}/>
      <input onChange={(e) => setrating(e.target.value)} type="text" placeholder='rateing' style={style}/>
      <input onChange={(e) => setdescription(e.target.value)} type="text" placeholder='sum' style={style}/>
      <button onClick={button} style={style}>add</button>
      
    </div>
  );
}

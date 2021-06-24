import React, { useState } from "react"
import "./App.css"

function App() {
  const [state, setState] = useState({
    fname: "",
    lname: "",
  })

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e =>{
    
    e.preventDefault();
    //alert("You are submitting " + state.fname + " " + state.lname);

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"firstName":state.fname ,"lastName":state.lname});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://cyvx06f8jk.execute-api.us-east-1.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));

  }


  return (
    <div>
      <h1>React Form Handling</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:{" "}
          <input
            type="text"
            name="fname"
            value={state.fname}
            onChange={handleChange}
          />
        </label>{" "}
        <label>
          Last Name:{" "}
          <input
            type="text"
            name="lname"
            value={state.lname}
            onChange={handleChange}
          />
        </label>
        <button>Submit!</button>
      </form>
      <h5>
        Name: {state.fname} {state.lname}
      </h5>
    </div>
  )
}

export default App
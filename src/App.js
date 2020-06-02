import React, { useState } from "react";
import Search from "./Components/Search";
import axios from "axios";
import Results from "./Components/Results";
import Popup from './Popup'

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
  });
  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=7531f8e9";

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        const results = data.Search;
        setState((prev) => {
          console.log(results)
          return {
            ...prev,
            results: results,
          };
        });
      });
    }
  };

  const handleChange = (e) => {
    const s = e.target.value;

    setState((prev) => {
      return {
        ...prev,
        s: s,
      };
    });
  };


  const openPopUp = id => {
    axios(apiurl + "&i" + id).then(({ data }) => {
      const result = data;

      setState(prev => {
        return {
          ...prev,selected:result
        }
      })
  })
  }
  
  const closePopUp = () => {
    setState(prev => {
      return {
      ...prev,selected:{}
    }
  })
}

  return (
    <div className="App">
      <header>
        <h1> Movie Database</h1>
      </header>
      <main>
        <Search handleInput={handleChange} search={search} />
        <Results results={state.results} openPopUp={openPopUp} />

         {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopUp} /> : false}
      </main>
    </div>
  );
}

export default App;

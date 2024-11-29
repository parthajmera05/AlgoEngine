import React, { useState } from "react";
import codeforcesimg from './assets/Codeforces.png' ;
import codechefimg from "./assets/Codechef.png";
import leetcodeimg from "./assets/Leetcode.png"

import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLeetCodeSelected, setIsLeetCodeSelected] = useState(true);
  const [isCodeForcesSelected, setIsCodeForcesSelected] = useState(false);
  const [isCodeChefSelected, setIsCodeChefSelected] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    setResponse(null);
    setIsLoading(true);

    try {
      const data = await fetch(
        "https://coding-search-service.onrender.com/api/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        }
      );
      try {
        const outputList = await data.json();
        setResponse(outputList);
        console.log(outputList);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  const filterSearchResults = () => {
    if (!response || !response.results) return [];

    return response.results.filter((value) => {
      const [link, platform] = value.split("*");
      platform.toLowerCase();
      if (
        (isLeetCodeSelected && link.includes("leetcode")) ||
        (isCodeForcesSelected && link.includes("codeforces")) ||
        (isCodeChefSelected && link.includes("codechef"))
      ) {
        return true;
      }
      return false;
    });
  };

  const searchResults = filterSearchResults();

  return (
    <>
      <div className="App">
        <button data-text="Awesome" className="button1">
          <span className="actual-text">&nbsp;AlgoSearch&nbsp;</span>
          <span className="hover-text" aria-hidden="true">
            &nbsp;AlgoSearch&nbsp;
          </span>
        </button>
       
        <div className="wow">
          <div>Search for your favourite coding problems from </div>
          <img
            className="image1"
            src={codeforcesimg}
            alt="Codeforces"
            border="0"
          />
          <img
            className="image2"
            src={leetcodeimg}
            alt="Leetcode"
            border="0"
          />
          <img
            className="image3"
            src={codechefimg}
            alt="codechef"
            border="0"
          />
        </div>
        <div className="container_x">
          <input
            placeholder="Enter the keywords ......."
            className="input"
            type="text"
            value={query}
            onChange={handleInputChange}
          ></input>
          <button className="button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="sliders">
          <div className="platform-slider">
            <label class="container">
              <input
                type="checkbox"
                checked={isLeetCodeSelected}
                onChange={() => setIsLeetCodeSelected(!isLeetCodeSelected)}
              />
              <div class="checkmark"></div>
              <div>LeetCode</div>
            </label>
            <label class="container">
              <input
                type="checkbox"
                checked={isCodeForcesSelected}
                onChange={() => setIsCodeForcesSelected(!isCodeForcesSelected)}
              />
              <div class="checkmark"></div>
              <div>CodeForces</div>
            </label>
            <label class="container">
              <input
                type="checkbox"
                checked={isCodeChefSelected}
                onChange={() => setIsCodeChefSelected(!isCodeChefSelected)}
              />
              <div class="checkmark"></div>
              <div>CodeChef</div>
            </label>
          </div>
          <div className="tab">Total Questions: {searchResults.length}</div>
        </div>
        <div className="content">
          {isLoading ? (
            <>
              <h3>
                The Dataset is very big so it may take some time, please be
                patient...
              </h3>
              <div className="loader">
                <div class="spinner">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </>
          ) : (
            response &&
            response !== undefined &&
            response !== null && (
              <>
                <ul>
                  {searchResults.map((value, index) => (
                    <li key={index}>
                      <a
                        href={value.split("*")[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {value.split("*")[1]}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
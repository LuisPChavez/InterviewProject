import React, { useState, useEffect } from "react";
import "../styles/DrugSearchPage.css";

function DrugSearchPage() {
  const [sideEffectsData, setSideEffectsData] = useState(null);
  const [drugInputBox, setDrugInputBox] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    console.log(sideEffectsData);
    if (sideEffectsData != null) {
      refreshData();
    }
  }, [pageNumber]);

  const refreshData = () => {
    fetch(
      `http://localhost:3030/drug/effects?name=${drugInputBox}&pageNumber=${pageNumber}`
    )
      .then((response) => response.json())
      .then((json) => setSideEffectsData(json))
      .catch((error) => console.error(error));
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      //Using 1 since clicking Enter will always the user to see the first results

      await callFdaApi(drugInputBox, 1);
    }
    setDrugInputBox(event.target.value);
  };

  const renderResults = () => {
    return sideEffectsData.map(({ term, count }) => {
      return (
        <div key={term + count} className="side-effect-box">
          <p>Side Effect: {term} </p>
          <p>Times Reported {count}</p>
        </div>
      );
    });
  };

  const renderArrows = () => {
    return sideEffectsData ? (
      <>
        <button
          onClick={() => {
            pageNumber > 1 ? setPageNumber(pageNumber - 1) : null;
          }}
        >
          {"<"}
        </button>
        <>{pageNumber}</>
        <button onClick={() => setPageNumber(pageNumber + 1)}>{">"}</button>
      </>
    ) : null;
  };
  return (
    <>
      <div>
        <input value={drugInputBox} onChange={handleKeyDown} />
        <button onClick={refreshData}>Search</button>
        {renderArrows()}
      </div>
      {sideEffectsData ? (
        <div style={{ marginTop: 10 }}>{renderResults()}</div>
      ) : (
        <></>
      )}
      <div></div>
    </>
  );
}

export default DrugSearchPage;

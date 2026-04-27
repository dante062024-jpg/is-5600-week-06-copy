import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [prints, setPrints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPrint, setSelectedPrint] = useState(null);
  const printsPerPage = 6;

  useEffect(() => {
    fetch("/data/prints.json")
      .then((res) => res.json())
      .then((data) => setPrints(data));
  }, []);

  const indexOfLast = currentPage * printsPerPage;
  const indexOfFirst = indexOfLast - printsPerPage;
  const currentPrints = prints.slice(indexOfFirst, indexOfLast);

  if (selectedPrint) {
    return (
      <div className="pa4">
        <button onClick={() => setSelectedPrint(null)}>⬅ Back</button>
        <h2>{selectedPrint.title}</h2>
        <img src={selectedPrint.image} alt="" width="300" />
        <p>{selectedPrint.description}</p>
      </div>
    );
  }

  return (
    <div className="pa4">
      <h1>Print Shop</h1>

      <div className="flex flex-wrap">
        {currentPrints.map((print) => (
          <div
            key={print.id}
            className="pa3 ma2 ba pointer"
            onClick={() => setSelectedPrint(print)}
          >
            <img src={print.image} alt="" width="150" />
            <h3>{print.title}</h3>
          </div>
        ))}
      </div>

      <div className="mt4">
        {Array.from({ length: Math.ceil(prints.length / printsPerPage) }).map(
          (_, i) => (
            <button
              key={i}
              className="ma1"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default App;

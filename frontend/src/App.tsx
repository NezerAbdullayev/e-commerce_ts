import React, { useEffect, useState } from "react";

const App: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((response) => response.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
};

export default App;

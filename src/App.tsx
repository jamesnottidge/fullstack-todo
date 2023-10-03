import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [count, setCount] = useState<string>("james");

  const API = axios.create({
    baseURL: "http://localhost:3002",
    headers: {
      "Content-type": "application/json",
    },
  });

  useEffect(() => {
    API.get("/tasks")
      .then((res) => {
        console.log(res);
        // setCount(res.data);
      })
      .catch((err) => console.log("me", err));
  }, []);

  return (
    <>
      <div>Hello {count} </div>
    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/sample`)
      .then(res => setData(res.data.message))
      .catch(err => setData("Failed to fetch data"));
  }, []);

  return (
    <div>
      <h1>Test App</h1>
      <p>Backend message: {data}</p>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import Api from "./api";

function App() {
  const [result, setResult] = useState();
  const resource = "posts";
  const params = {
    pagination: {
      page: 0,
      perPage: 5,
    },
    sort: {
      field: "id",
      order: "ASC",
    },
  };
  useEffect(() => {
    Api.getList(resource, params).then((res) => setResult(res));
  }, []);
  return <div className="App">{JSON.stringify(result)}</div>;
}

export default App;

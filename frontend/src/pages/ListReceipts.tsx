import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function ListReceipts() {
  const [fetchErrorLog, setfetchErrorLog] = useState("");

  const { data, isError: fetchError } = useQuery({
    queryKey: ["fetch1"],
    queryFn: () =>
      fetch(`https://swapi.dev/api/people/1/`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((e) => {
          setfetchErrorLog(e.message);
        }),
  });

  function handleClick(){
    console.log(data);
  }

  return (
    <>
      <h1>You are at List Receipts Section</h1>
      <button className="btn btn-primary" onClick={handleClick}>Click me</button>
    </>
  );
}

export default ListReceipts;
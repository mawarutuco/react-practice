import { useState, useEffect, useRef } from "react";
import { API_GET_DATA } from "../../global/constants.js";

import Edit from "./components/Edit.js";
import List from "./components/List.js";

// async function fetchData(setData) {
//   const res = await fetch(API_GET_DATA);
//   const { data } = await res.json();
//   setData(data);
// }

// async function fetchSetData(data) {
//   await fetch(API_GET_DATA, {
//     method: "PUT",
//     headers: { "Content-type": "application/json" },
//     body: JSON.stringify({ data }),
//   });
// }

const Home = () => {
  const [data, setData] = useState([]);
  const submittingStatus = useRef(false);

  // useEffect(() => {
  //   if (!submittingStatus) {
  //     return;
  //   }
  //   fetchSetData(data).then((data) => (submittingStatus.current = false));
  // }, [data]);

  // useEffect(() => {
  //   fetchData(setData);
  // }, []);

  return (
    <div>
      <Edit add={setData} submittingStatus={submittingStatus} />
      <hr />
      <List
        listData={data}
        deleteData={setData}
        submittingStatus={submittingStatus}
      />
    </div>
  );
};

export default Home;

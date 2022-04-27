import { useEffect, useState } from "react";
import axios from "../../api/axios";

const INFO_URL = "/info";

const Info = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState({});
  const personalDetails = localStorage.getItem("personalDetails");

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axios.get(INFO_URL, {
          headers: {
            Authorization: "Bearer 1111-2222-3333-4444",
            "Content-Type": "application/json",
          },
        });

        console.log(response);
        setTableData(JSON.stringify(response));
        setIsLoading(false);
      } catch (err) {}
    };

    getInfo();
  }, []);

  return (
    <div>
      <h3>Personal Details:</h3>
      <p>{personalDetails}</p>
      <h3>Table Data:</h3>
      {isLoading ? <p>Loading...</p> : <p>{tableData}</p>}
    </div>
  );
};

export default Info;

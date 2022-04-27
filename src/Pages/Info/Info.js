import { useEffect, useState, useContext, Fragment } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import Table from "../../components/Table/Table";

const INFO_URL = "/info";

const Info = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState({});
  const personalDetails = localStorage.getItem("personalDetails");
  const { auth } = useContext(AuthContext);

  const token = auth.token || localStorage.getItem("token");
  console.log("FROM INFO PAGE:", token);

  // Add condition if logged out

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axios.get(INFO_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log(response);
        setTableData(response?.data);
        setIsLoading(false);
      } catch (err) {}
    };

    getInfo();
  }, [token]);

  return (
    <Fragment>
      <h3>Personal Details:</h3>
      <p>{personalDetails}</p>
      <h3>Table Data:</h3>
      {isLoading ? <p>Loading...</p> : <Table tableData={tableData} />}
    </Fragment>
  );
};

export default Info;

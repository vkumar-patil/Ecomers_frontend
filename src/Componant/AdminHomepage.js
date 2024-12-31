import React from "react";
import { Link } from "react-router-dom";
function AdminHomepage() {
  return (
    <div>
      <Link to={"/Adminfom"}>fom Submit</Link>
      <h2>welcome to Admin Page</h2>
    </div>
  );
}

export default AdminHomepage;

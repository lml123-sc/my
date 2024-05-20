import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { connect } from "dva";

const Home = (props) => {
  console.log("==props==", props);
  return (
    <div>
      this is Home
      <br />
      <Link to={"/about"}>
        <Button type={"primary"}>to about</Button>
      </Link>
      <br></br>
      <Link to={"/counter"}>
        <Button type={"primary"}>to counter</Button>
      </Link>
    </div>
  );
};

export default (Home);

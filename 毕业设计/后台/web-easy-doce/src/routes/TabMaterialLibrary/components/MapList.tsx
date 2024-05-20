import React, { useState } from "react";
import SearchTree from "../../../components/SearchTree";

interface MapListProps {}

const MapList = (props) => {
  const {} = props;
  const [expandPath, setExpandPath] = useState([]);
  return (
    <div>
      <SearchTree
        treeConfig={10}
        expandPath={expandPath}
        // getRootDirectory={this.getRootDirectory}
      />
    </div>
  );
};

export default MapList;

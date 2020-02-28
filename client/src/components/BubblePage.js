import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = props => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/colors`)
      .then(res => {
        console.log("This is your console log:", res);
        setColorList(res);
      })
      .catch(err => {
        console.log("Is calling this colored racist?:", err);
      });
  });

  return (
    <>
      {/* <ColorList colors={colorList} updateColors={setColorList} /> */}
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

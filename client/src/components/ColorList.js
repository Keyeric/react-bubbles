import React, { useState } from "react";
// import axios from "axios";
import { useHistory } from "react-router-dom";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = (props, { colors, updateColors }) => {
  //console.log("This is what your colors is:", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const history = useHistory();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    axiosWithAuth()
      // think about where will you get the id from...
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(response => {
        // where is is saved right now?
        console.log("API Colors:", response.data);
        setColorToEdit(response.data);
        setEditing(false);
        history.push(`/temp`);
        history.goBack();
      })
      .catch(error => {
        console.log("Your put request broke:", error);
      });
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`, colorToEdit)
      .then(res => {
        //console.log("We're deleting stuff!", res);
        setColorToEdit(res);
        history.push(`/temp`);
        history.goBack();
      });
  };
  //For Add Functionality
  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post("/api/colors", colorToEdit)
      .then(res => {
        console.log("Submit", res);
        setColorToEdit(res);
        history.push(`/temp`);
        history.goBack();
      })
      .catch(err => {
        console.log("Aint no new color round these parts boy", err);
      });
  };
  //End Add Funcionality

  return (
    <div className="colors-wrap">
      <p>colors</p>

      <ul>
        {props.colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>

      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* Add Form */}
      <div className="NewJunk">
        <form onSubmit={handleSubmit}>
          <label>
            New Color:
            <input
              type="text"
              name="color"
              placeholder="Add Color"
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
            />
          </label>
          <label>
            New Hex Code:
            <input
              type="text"
              name="hex"
              placeholder="Hex Code Here"
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
            />
          </label>
          <button>New Color GO!</button>
        </form>
      </div>
      {/* End Add Form */}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;

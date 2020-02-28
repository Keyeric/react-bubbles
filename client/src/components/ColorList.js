import React, { useState } from "react";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = (props, { colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const match = useRouteMatch();
  const history = useHistory();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    axios
      // think about where will you get the id from...
      .put(`http://localhost:5000/api/colors/${colors.id}`, colors)
      .then(response => {
        // where is is saved right now?
        console.log(response.data);
        setEditing(false);
        history.push(`/protected`);
      })
      .catch(error => {
        console.log("Your put request broke:", error);
      });
  };

  const deleteColor = color => {
    axios
      .delete(`http://localhost:5000/api/colors/${match.params.id}`)
      .then(res => {
        console.log(res);
        setColorToEdit(null);
        props.setUpdate(!props.update);
        history.push("/protected");
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
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
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;

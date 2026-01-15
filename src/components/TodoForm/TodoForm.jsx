import { useState } from "react";
import Styles from "./todoForm.module.css";
import { Plus } from "lucide-react";

const TodoForm = ({ onAgregarNota }) => {
  const [textNote, setTextNote] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (textNote === "") {
      console.log("No se puede agregar nota vacias");
      return;
    }

    const newNote = {
      text: textNote,
      completed: false,
    };
    fetch("http://localhost:3000/notas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json)
      .then((data) => {
        onAgregarNota(data);
        setTextNote("");
      });
  };

  return (
    <div className={Styles.formContainer}>
      <h2>TodoForm</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="nota"
          value={textNote}
          onChange={(event) => setTextNote(event.target.value)}
        />
        <button type="submit">
          <Plus size={16} />
          Crear nota
        </button>
      </form>
    </div>
  );
};
export default TodoForm;

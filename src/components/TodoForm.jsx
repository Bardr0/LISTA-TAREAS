import { useState } from "react";

const TodoForm = () => {
  const [textNote, setTextNote] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault()
  };


  return (
    <div>
      <h2>TodoForm</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" id="nota" value={textNote} onChange={(event) => setTextNote(event.target.value)} />
        <button type="submit">Crear nota</button>
      </form>
    </div>
  );
};
export default TodoForm;

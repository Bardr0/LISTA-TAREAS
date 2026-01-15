import { useState } from "react";
import "./index.css";
import TodoApp from "./components/TodoApp";

function App() {
  //const notas = [
  //  { id: crypto.randomUUID(), text: "soy la nota 1" },
  //  { id: crypto.randomUUID(), text: "soy la nota 2" },
  //  { id: crypto.randomUUID(), text: "soy la nota 3" },
  //];

 //const titulosApp= {
 //  tituloApp: "Soy Todo App",
 //  subtituloApp : "Soy subtitulo App"
 //}
 // {...titulosApp}

  return (
    //usamos frangment cuando no queremos que un div guarde los componentes ,
    //el fragment es lo que queda cuando borras el "div"
    <section className="containerTodoApp">
      <TodoApp />
    </section>
  );
}

export default App;

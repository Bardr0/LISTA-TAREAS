import { useState, useEffect } from "react";
import Styles from "./todoApp.module.css";
import TodoForm from "./TodoForm/TodoForm";
import EditNoteForm from "./EditNoteForm/EditNoteForm";
import { Pointer, SquarePen, Trash } from "lucide-react";

function TodoApp() {
  const [notas, setNotas] = useState([]);
  const [notaEditandoId, setNotaEditandoId] = useState(null);

  //lo primero que recibe es una funcion y su segundo valor es un array de argumentos(si lo dejas como array vacio se llamara cada vez que se ejecute el componente)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/notas");

        if (!response.ok) {
          throw new Error(`Error http: ${response.status}`);
        }

        const data = await response.json();
        setNotas(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const agregarNota = (nuevaNota) => {
    setNotas([...notas, nuevaNota]);
  };

  const eliminarNota = (id) => {
    setNotas(notas.filter((nota) => nota.id != id));
    fetch(`http://localhost:3000/notas/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al eliminar la nota: ${response.status}`);
        }
        console.log("Nota eliminada");
      })
      .catch((error) => console.error(error));
  };

  const actualizarNota = (notaActualizada) => {
    setNotas(
      notas.map((nota) => {
        return nota.id === notaActualizada.id ? notaActualizada : nota;
      })
    );
  };

  //(props) | (propsComponente)
  //{notas}
  //const {notas}= props
  //map = retorno array

  //<button onClick={() => MostrarNotas()}>Mostrar notal por consola</button> = <button onClick={MostrarNotas}>Mostrar notal por consola</button>
  //con la primera forma nos permite meter mas codigo antes de llamar a
  return (
    <>
      <h1 className={Styles.titulo}>Notas</h1>
      <TodoForm onAgregarNota={agregarNota} />
      <ul className={Styles.noteList}>
        {notas.map((nota) => (
          <li className={Styles.noteItem} key={nota.id}>
            <span>
              {nota.text}
              {nota.completed ? "✅" : "❌"}
            </span>
            <div className={Styles.iconsContainer}>
              <SquarePen cursor="Pointer"  onClick={()=>setNotaEditandoId(nota.id)} size={26} />
              <Trash
                cursor="Pointer"
                onClick={() => eliminarNota(nota.id)}
                size={26}
              />
            </div>
            {
              notaEditandoId == nota.id && (
                <EditNoteForm 
                nota = {nota}
                onEditNota={actualizarNota}
                onCancelar = {()=> setNotaEditandoId(null)}
                />
              )
            }
          </li>
        ))}
      </ul>
    </>
  );
}
export default TodoApp;

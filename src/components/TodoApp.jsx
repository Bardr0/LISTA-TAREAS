import { useState, useEffect } from "react";
import Styles from "./todoApp.module.css";
import TodoForm from "./TodoForm/TodoForm";
import {SquarePen,  Trash} from "lucide-react"

function TodoApp() {
  const [notas, setNotas] = useState([]);

//lo primero que recibe es una funcion y su segundo valor es un array de argumentos(si lo dejas como array vacio se llamara cada vez que se ejecute el componente)
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/notas" )

        if(!response.ok){
          throw new Error(`Error http: ${response.status}`)
        }

        const data = await response.json();
        setNotas(data);  
      } catch (error) {
        console.log(error);
        
      }
    };
    fetchData();
  }, []);

  const agregarNota =  (nuevaNota) => {
    setNotas([...notas, nuevaNota])
  }
 

  //(props) | (propsComponente)
  //{notas}
  //const {notas}= props
  //map = retorno array

  //<button onClick={() => MostrarNotas()}>Mostrar notal por consola</button> = <button onClick={MostrarNotas}>Mostrar notal por consola</button>
  //con la primera forma nos permite meter mas codigo antes de llamar a
  return (
    <>
      <h1 className={Styles.titulo}>Notas</h1>
      <TodoForm onAgregarNota={agregarNota}/>
      <ul className={Styles.noteList}>
        {notas.map((nota) => (
          <li className={Styles.noteItem} key={nota.id}>
            <span>
              {nota.text}{nota.completed ? "✅" : "❌"}
            </span>
            <div className={Styles.iconsContainer}>
              <SquarePen size={16} />
              <Trash size={16} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
export default TodoApp;

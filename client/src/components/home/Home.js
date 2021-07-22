import React, { useState, useEffect } from "react";
import {getDogs} from "../../actions"
import { useDispatch, useSelector } from "react-redux";
import style from "./Home.module.css"
import { Link } from "react-router-dom";




export default function Home(){
  const dogs = useSelector((state) => state.dogsLoaded)
  const filter = useSelector((state) => state.filter)
  const url = "https://i.pinimg.com/564x/61/7e/63/617e63bea91121a61722cef2ebf96e49.jpg"
  
  const dispatch = useDispatch();
  useEffect( () =>{
    dispatch(getDogs())
  },[]
  ) 
   filter?.map((e) =>{
     if(e.id.length > 4){
       e.image = {url}
       e.temperament= ""
       for(let i = 0; i<e.temperaments.length; i++){
        e.temperament += e.temperaments[i].name.toString() + ", "
       }
    }
  })

  console.log(dogs)
  
  //paginacion
  const [currentPage, setCurrentPage] = useState(1); // sera la pagina donde estamos posicionados
  const [itemsPerPage, setitemsPerPage]= useState(8);

  const [pageNumberLimit, setpageNumberLimit] = useState(10)
  const [maxPageNumberLimit, setmaxPageNumberLimit]= useState(10);
  const [minPageNumberLimit, setminPageNumberLimit]= useState(0);
  

  const handleClick = (event) =>{
     setCurrentPage(Number(event.target.id));
  }

  const pages = []; //cantidad de paginas que vamos a tener
    
    for (let i = 1; i <= Math.ceil(filter?.length / itemsPerPage); i++) { //math.ceil redondea para arriba
        pages.push(i);
    }
    const indexOfLastItem = currentPage * itemsPerPage; //indica cual es la ultima pagina
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; 
    const currentItems = filter?.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = pages.map(number => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={currentPage === number ? style.active : null}
                >
                    {number}
                </li>
            )
        } else {
            return null;
        }

    }) // se fija en que pagina esta posicionado para renderizar el 


    const handleNext = () => {
      setCurrentPage(currentPage + 1);

      if (currentPage + 1 > maxPageNumberLimit) {
          setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
      }
  }

  const handlePrev = () => {
      setCurrentPage(currentPage - 1);

      if ((currentPage - 1) % pageNumberLimit === 0) {
          setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit - pageNumberLimit)
      }
  }


  
  function renderDogs(dog) {
      return(<div className = {style.direccion}> 
         {dog?.map((perrito) => {
         return (
             <div className= {style.Card}>
             <Link to = {`/home/${perrito.id}`} className = {style.link}>
              <h3> {perrito.name} </h3>
              <img className={style.IMG} src={perrito.image.url} />
              <h4>{perrito.temperament}</h4>
           </Link>
            </div>
           ); 
          })
        }
      </div> )
     
  }

  

  return (
    <div className = {style.body}>
            <div>
             <li className = {style.pageNumbers}>
                    <li>
                        <button onClick={handlePrev}
                            disabled={currentPage === pages[0] ? true : false}>
                            ⬅
                        </button>
                    </li>
                    {renderPageNumbers}
                    <li>
                        <button onClick={handleNext}
                            disabled={currentPage === pages[pages.length - 1] ? true : false}>
                            ➡
                        </button>
                    </li>
                </li>
         </div>

     {renderDogs(currentItems)}
     </div>
    )
}

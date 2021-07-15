import React, { useState, useEffect } from "react";
import {getDogs} from "../../actions"
import { useDispatch, useSelector } from "react-redux";
import style from "./Home.module.css"




export default function Home(){
  const dogs = useSelector((state) => state.dogsLoaded)
  const filter = useSelector((state) => state.filter)
  const url = "https://i.pinimg.com/564x/61/7e/63/617e63bea91121a61722cef2ebf96e49.jpg"
  
  const dispatch = useDispatch();
  useEffect( () =>{
    dispatch(getDogs())
  },[]
  ) 
  console.log(dogs)
   dogs?.map((e) =>{
     if(e.id.length > 4){
       e.image = {url}
       e.temperament= ""
       for(let i = 0; i<e.temperaments.length; i++){
        e.temperament += e.temperaments[i].name.toString() + ", "
       }
    }
  })
  
  //paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage]= useState(8);

  const [pageNumberLimit, setpageNumberLimit] = useState(10)
  const [maxPageNumberLimit, setmaxPageNumberLimit]= useState(10);
  const [minPageNumberLimit, setminPageNumberLimit]= useState(0);
  

  const handleClick = (event) =>{
     setCurrentPage(Number(event.target.id));
  }

  const pages = [];
    
    
    for (let i = 1; i <= Math.ceil(dogs?.length / itemsPerPage); i++) {
        pages.push(i);
    }
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dogs?.slice(indexOfFirstItem, indexOfLastItem);

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

    })


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
              <h3> {perrito.name} </h3>
              <img className={style.IMG} src={perrito.image.url} />
              <h4>{perrito.temperament}</h4>
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

     {filter?.length > 0 ?renderDogs(filter):renderDogs(currentItems)}
     </div>
    )
}

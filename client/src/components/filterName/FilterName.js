import React, {useState} from "react";
import { useSelector } from "react-redux";
import style from "../home/Home.module.css";

export default function FilterName() {
  const dogs = useSelector((state) => state.dogLoaded);
  const url = "https://i.pinimg.com/564x/61/7e/63/617e63bea91121a61722cef2ebf96e49.jpg"


  dogs.map((e) =>{
    if(!e.image || e.id.length > 4){
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
  //fin paginacion


 

  return (
    <div className = {style.body}>
      <li className = {style.pageNumbers}>
        <li><button onClick={handlePrev}>⬅</button></li> 
            {renderPageNumbers} 
        <li><button onClick={handleNext}>➡</button></li> 
      </li>  
      <div className = {style.direccion}>
        {currentItems?.map((e) => {
          return (
            <div className = {style.Card}>
              <h3> {e.name} </h3>
              <img className={style.IMG} src={e.image.url}/> 
              <h4>{e.temperament}</h4> 
            </div>
          );
        })} 
      </div> 
    </div>
  );
}

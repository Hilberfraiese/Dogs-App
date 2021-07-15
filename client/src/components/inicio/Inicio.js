import React from "react";
import style from "./Inicio.module.css"
import {Link} from "react-router-dom";


function inicio(){
 return(
     <div class = {style.body}>
      <Link to = {`/home/`}> <button className={style.in}/></Link>
     </div>
 )
}



export default inicio;
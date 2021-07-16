import React, { useEffect, useState } from 'react'
import {filter, getHeavy, getLight, getTemp, getZA, getSource, getAZ } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux'
import estilo from "./orden.module.css"

function Orden() {

    const [selectedTemp, setSelectedTemp] = useState('')
    const [tempToFilterBy, setTempToFilterBy] = useState([])

    const dispatch = useDispatch()




    function orderDes(e) {
        e.preventDefault();
        dispatch(getZA())
    }

    function orderAsc(e) {
        e.preventDefault();
        dispatch(getAZ())
    }

    function orderLight(e) {
        e.preventDefault();
        dispatch(getLight())
    }

    function orderHeavy(e) {
        e.preventDefault();
        dispatch(getHeavy())
    }

    useEffect(() => {
        dispatch(getTemp())
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        setTempToFilterBy([...tempToFilterBy, selectedTemp]);
        handleClick()
    }

    function handleChange(e) {
        setSelectedTemp(e.target.value)
    }

    function handleClick() {
        let filtered = []

        dogs?.forEach((b) => {
            if (b.id.length) {
                b.temperaments.map(t =>
                    t.name === selectedTemp ? filtered.push(b) : null
                )
            } else {
                console.log('holaaaa', b.temperament)
                if (b.temperament?.includes(selectedTemp)) {
                    filtered.push(b)
                } else {
                    console.log('nada')
                }

            console.log(filtered)
                
             

            
        }})

        dispatch(filter(filtered))
    }

    function handleSelect(e){
        if(e.target.value === 'null')
        { return alert("Please insert a valid value")}
        else{
         dispatch(getSource(e.target.value))
        }
    }


    const temp = useSelector(state => state.temps)
    console.log("aca los tempera")
    console.log(temp)
    const dogs = useSelector(state => state.dogsLoaded)



    return (
        <div className={estilo.container} >
            <div >
                <label className={estilo.label}>Order by: name</label>
                <br />

                <button className={estilo.button} onClick={(e) => orderAsc(e)}>A-Z</button>
                <button className={estilo.button} onClick={(e) => orderDes(e)}>Z-A</button>

            </div>



            <div  >
                <label className={estilo.label}>Order by: weight</label>
                <br />

                <button className={estilo.button2} onClick={(e) => orderLight(e)}>Weight - to +</button>
                <button className={estilo.button2} onClick={(e) => orderHeavy(e)}>Weight + to -</button>

            </div>


            <div  >
                <form onSubmit={handleSubmit} >
                    <label className={estilo.label}>Filter by temps </label><br />
                    <select className={estilo.select} onChange={handleChange} name="temperaments" value={selectedTemp} >
                        {temp?.map(t => {
                            return (
                                <option value={t.name}>{t.name}</option>
                            )
                        })}
                    </select>
                    
                    <button type="submit" className={estilo.button2} > Filter</button>
                </form>
            </div>

            

           <div>
               <form>
                   <label className={estilo.label}>Source</label>
                   <br />
                   <select className={estilo.select} onChange={handleSelect}>
                       <option value="null">Select</option>
                       <option value="DB">DB</option>
                       <option value="API">API</option>
                       <option value="ALL">ALL</option>
                   </select>
               </form>
           </div>

        </div>
    )
}

export default Orden
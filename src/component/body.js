import Myapp from "./myapp"
import {useState,useEffect} from 'react'

const Body=()=>{
    const [myname, setmyname]=useState('Tope')
    const [age, setage]=useState('30')
    return(
        <div>
            <Myapp
            name={myname}
            age={age}

            />
        </div>
    )
}  
export default Body
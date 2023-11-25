import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDroplet,faWind,faSun, faCloud, faCloudSun} from '@fortawesome/free-solid-svg-icons'
import { useEffect,useState } from 'react'
const Downpart=(props)=>{
    const[temp,setTemp]=useState('')
    const[day,setday]=useState('')
    const [weatherdata,setweatherdata]=useState('')
    const[icon, setIcon]=useState('')
    const[month,setmonth]=useState('')
    const[icontext,seticontext]=useState('');
    const dayarray=['Sun','Mon','Tue','Wed','Thur','Fri','Sat']
    const montharray=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
    const handledatafore=async()=>{
       
        const options = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
            params: {
              q: props.city,
              days: '3'
            },
            headers: {
              'X-RapidAPI-Key': '87bd68a168msh30aa9fcf5429bcep1e29b6jsnae9732ebf2d2',
              'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
          };
          
          try {
              const responsetwo = await axios.request(options);
              console.log(responsetwo.data);
              const mydata=responsetwo.data.forecast.forecastday
              setweatherdata(mydata)
              console.log(mydata)
              
          } catch (error) {
              console.error(error);
          }
    }
    useEffect(()=>{
        handledatafore()
    },[props.city])
    
    return(
        <div className="flex justify-evenly">
            {
                weatherdata.length<1?
                <div className='text-white text-xs'>No Record Yet</div>:
                    weatherdata.map((items,index)=>(
<div key={index} className='h-28 rounded-full w-16 border-2 border-slate-500 text-yellow-500 items-center flex justify-center'>
    <div>
    <img src={items.day.condition.icon} className='w-8 h-auto' />
    <div className='text-xs text-slate-400'>{dayarray[index+props.day]}</div>
    <div>{items.day.avgtemp_c}&deg;</div>
    </div>
   

</div>

                        

                    ))
             

            }

</div>

    )
}
export default Downpart
import './font-awesome-4.7.0/css/font-awesome.css'
import weathericon from './images/icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDroplet,faWind,faSun, faCloud, faCloudSun} from '@fortawesome/free-solid-svg-icons'
import Searchinput from './searchinput'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Downpart from './downpart'
const WeatherApp=()=>{
    const[viewsearch,setviewsearch]=useState(false)
    const [date,setdate]=useState('')
    const[country, setcountry]=useState('Nigeria')
    const[city, setcity]=useState('Akure')
    const[temp,setTemp]=useState('')
    const [humidity,sethumidity]=useState('')
    const [Wind,setWind]=useState('')
    const [uv,setuv]=useState('')
    const[day,setday]=useState('')
    const[dayindex,setdayindex]=useState('')
    const[icon, setIcon]=useState('')
    const[month,setmonth]=useState('')
    const[icontext,seticontext]=useState('');
    const dayarray=['Sun','Mon','Tue','Wed','Thur','Fri','Sat']
    const montharray=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
    const handleview=()=>{
        setviewsearch(!viewsearch)
    }
    const getdate=()=>{
        const day=new Date().getDay();
        setdayindex(day)
        let daystring=''
        for (let i = 0; i < dayarray.length; i++) {
            daystring = dayarray[day];
            
        }
        setday(daystring)
        const monthnew=new Date().getMonth();

        let monthstring=''
        for (let i = 0; i < montharray.length; i++) {
            monthstring = montharray[monthnew];
            
        }
        setmonth(monthstring)
        const datenew=new Date().getDate()
        setdate(datenew)
        console.log(monthnew)
    }
    useEffect(()=>{
        getdate()

    },[])
    const handlecountry=(country)=>{
        setcountry(country)
       

    }
    const handlecity=(city)=>{
        setcity(city)

    }
    const handlemyview=(myview)=>{
        setviewsearch(myview)
    }

    const handledata=async()=>{
        const options = {
            method: 'GET',
            url: `https://open-weather13.p.rapidapi.com/city/${city}`,
            headers: {
              'X-RapidAPI-Key': '87bd68a168msh30aa9fcf5429bcep1e29b6jsnae9732ebf2d2',
              'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
            }
          };
          try {
              const response = await axios.request(options);
              console.log(response.data);
              const weatherdata=response.data
             const f=JSON.parse(weatherdata.main.temp)

               const c=(f - 32) * (5/9);
              setTemp(c.toFixed(2))
              const h=weatherdata.main.humidity
              sethumidity(h)
              

          } catch (error) {
              console.error(error);
          }
          const optionstwo = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/current.json',
            params: {q: city},
            headers: {
              'X-RapidAPI-Key': '87bd68a168msh30aa9fcf5429bcep1e29b6jsnae9732ebf2d2',
              'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
          };
          
          try {
              const responsetwo = await axios.request(optionstwo);
              console.log(responsetwo.data);
              const uvnew=responsetwo.data.current.uv
              const iconnew=responsetwo.data.current.condition.icon
              const icontextnew=responsetwo.data.current.condition.text
              setIcon(iconnew)
              seticontext(icontextnew)
              setTemp(responsetwo.data.current.temp_c)
              sethumidity(responsetwo.data.current.humidity)
              setuv(uvnew)

              const wind=responsetwo.data.current.wind_kph
              setWind(wind)
          } catch (error) {
              console.error(error);
          }

    }
    useEffect(()=>{
        handledata()
 

    },[city])
  
    return(
        <div className="flex justify-center h-auto w-screen bg-slate-950 py-5 px-5">
            {viewsearch &&<div className='absolute top-10'>
                <Searchinput
                country={(mycountry)=>handlecountry(mycountry)}
                city={(mycity)=>handlecity(mycity)}
                view={(myview)=>handlemyview(myview)}
            />
            </div>}
            <div>
            <div className="flex justify-between w-screen px-5">
                <div><span className="fa fa-bars text-white"></span></div>
                <div className="text-yellow-500">{city}, {country}</div>
                <div  onClick={handleview} className=""><span className="fa fa-search text-white"></span></div>
            </div>
            <div className="text-white flex justify-center mt-7">
                <div>
                <div className="text-center">Today</div>
                <div className="text-center">{day}, {month} {date}.</div>
                </div>
            </div>
            <div className="flex justify-center mt-12">
                <div>
                <img src={icon} className="h-auto w-56" />
                <div className='text-xs text-slate-400 text-center'>{icontext}</div>

                </div>
                
            </div>
            <div className="flex justify-center mt-12">
                <div className="text-7xl font-extrabold text-yellow-500">{temp}&deg;</div>
            </div>
            <div className="flex justify-center mt-12 px-5">
                <div className="bg-slate-800 rounded-2xl h-32 w-full flex justify-evenly px-5 py-5">
                    <div className='text-white text-center'>
                        <FontAwesomeIcon icon={faWind} />
                        <div className="text-white text-lg">{Wind}km/h</div>
                    <div className=" text-slate-500 text-xs">Wind</div>

                    </div>
                    <div className='text-white text-center'>
                    <FontAwesomeIcon icon={faDroplet} />
                    <div className="text-white text-lg">{humidity}%</div>
                    <div className="text-slate-500 text-xs">Humidity</div>
                        
                    </div>
                    <div className='text-white text-center'>
                    <FontAwesomeIcon icon={faSun} />
                    <div className="text-white text-lg">{uv}</div>
                    <div className="text-slate-500 text-xs">UV</div>
                        
                    </div>
                

                </div>
            </div>
            <div className="mt-12 px-5">
              <Downpart
              city={city}
              day={dayindex}
              />
            </div>
     
           
            </div>
            


        </div>
        

    )
}
export default WeatherApp
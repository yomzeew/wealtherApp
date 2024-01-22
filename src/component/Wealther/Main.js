import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faDroplet, faTimesCircle, faWater, faWind } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import countrydata from './country&city.json.json'
import axios from 'axios'
const Main = () => {
    const [viewlist,setviewlist]=useState(false)
    const [city,setcity]=useState('Abuja')
    const [country,setcountry]=useState('Nigeria')
    const [icontext,seticontext]=useState('')
    const [temp,settemp]=useState('')
    const [wind,setwind]=useState('')
    const [humidity,sethumidity]=useState('')
    const [uv,setuv]=useState('')
    const [icon ,seticon]=useState('')
    const [mydate,setmydate]=useState(new Date().getTime())
    const [getvalue, setgetvalue]=useState('')
    const [data,setdata]=useState(countrydata)
    const [forecastdata,setforecastdata]=useState([])
    const dayString=['Sun','Mon','Tue','Wed','Thur','Fri','Sat']
    
    const datedays=(value)=>{

        const dayStringarray=['Sun','Mon','Tue','Wed','Thur','Fri','Sat']
    
        const day=new Date(value).getDay()
        const dayString=dayStringarray[day]
        const date=new Date(value).getDate()
    
        const newdate=date<10?'0'+date:date
        console.log(newdate)
        const month=new Date(value).getMonth()
        const MonthStringarray=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
    
        const Monthstring=MonthStringarray[month]
    
        const yearnew=new Date(value).getFullYear()
    
        return dayString+' '+newdate+' '+Monthstring+' '+yearnew
     
        
    
    
       }
    const handleview = () => {
        setviewlist(!viewlist)


    }
    const fetchdata=()=>{
        console.log(countrydata)

    }
    useEffect(()=>{
        fetchdata()

    },[])
   const handleselect=(value ,valuetwo)=>{
    setcity(valuetwo)
    setcountry(value)

   }
   const fetchall=async()=>{
const options = {
  method: 'GET',
  url: 'https://weatherapi-com.p.rapidapi.com/current.json',
  params: {q: city},
  headers: {
    'X-RapidAPI-Key': '87bd68a168msh30aa9fcf5429bcep1e29b6jsnae9732ebf2d2',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
    const datares=response.data.current
    const icontexts=datares.condition.text
    const temps=datares.temp_c
    const winds=datares.wind_kph
    const humiditys=datares.humidity
    const uvs=datares.uv
    const imgs=datares.condition.icon
    console.log(icontexts)
    seticontext(icontexts)
    setwind(winds)
    sethumidity(humiditys)
    setuv(uvs)
    seticon(imgs)
    settemp(temps)


} catch (error) {
	console.error(error);
}
   }
   useEffect(()=>{
    fetchall()
    
    
    
   },[city,country])

   const handlevalue=(e)=>{
    const value=e.target.value
    setgetvalue(value) 
    
   }
   const handleshowcountry=()=>{
    
    
    const getarraycountry=countrydata.filter((item)=>{
        const city=item.city||''
        const country=item.country || ''
        return(
            city.toLowerCase().includes(getvalue.toLowerCase()) ||
            country.toLowerCase().includes(getvalue.toLowerCase())
            

        )
    })
   
    console.log(getarraycountry)
    setdata(getarraycountry)
   }
   useEffect(()=>{
    handleshowcountry()

   },[getvalue])

   const fetchforeall=async()=>{
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        params: {
          q: city,
          days: '3'
        },
        headers: {
          'X-RapidAPI-Key': '87bd68a168msh30aa9fcf5429bcep1e29b6jsnae9732ebf2d2',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data.forecast.forecastday);
          setforecastdata(response.data.forecast.forecastday)
      } catch (error) {
          console.error(error);
      }
      

   }
   useEffect(()=>{
    fetchforeall()

   },[city])


   



    return (
        <div className="w-screen h-full bg-slate-950">
            {viewlist &&<div className='absolute top-20 w-full flex justify-center'>
            <div className='absolute md:w-96 w-72 flex justify-end text-lg text-orange-200'>
                       <div onClick={()=>setviewlist(false)}><FontAwesomeIcon size="2x" icon={faTimesCircle} /></div> 
                    </div>
                <div className='md:w-96 w-72 bg-slate-900 rounded-2xl h-96 px-3 overflow-y-scroll py-5'>
                    <div className="flex justify-center z-50">
                        <input onChange={handlevalue} className="h-8 outline-0 border rounded-lg w-72"/>

                    </div>
                   
                    {data.length>0 &&data.map((item,index)=>(
                    <div className='text-slate-200 text-xl text-center border-b border-slate-300 mt-3'>
                        <span onClick={()=>handleselect(item.country,item.city)} className='cursor-pointer'>{item.country} | {item.city}</span>
                    </div>))}

                </div>

            </div>}

            <div className=' px-5 py-5'>
                <div className="flex justify-between">
                    <div className="text-white"><i className="fa fa-location-arrow text-white"></i> {city} | {country}</div>
                    <div><i onClick={handleview} className="fa fa-bars cursor-pointer text-white"></i></div>
                </div>
                <div className="bg-gradient-to-t from-slate-900 to-slate-800 h-auto rounded-3xl border border-slate-50 mt-5 shadow-2xl shadow-black py-5">
                    <div>
                        <div className='flex justify-center mt-5'>
                            <img className="object-contain w-52 h-auto" src={icon} />
                        </div>
                        <div className='flex justify-center'>
                            <span className="text-white text-9xl font-bold">
                                {temp}&deg;
                            </span>


                        </div>
                        <div className='flex justify-center'>
                            <span className='text-slate-200 text-2xl'>{icontext}</span>
                        </div>
                        <div className='flex justify-center'>
                            <span className='text-slate-500 text-xs'>{datedays(mydate)}</span>
                        </div>
                        <div className='flex justify-evenly mt-5'>
                            <div className='text-center'>
                                <div><FontAwesomeIcon size={30} icon={faWind} color='orange' /></div>
                                <div className='text-slate-100 text-sm'>{wind}</div>
                                <div className='text-slate-100 text-xs'>Wind</div>
                            </div>
                            <div className='text-center'>
                                <div><FontAwesomeIcon size={30} icon={faWater} color="white" /></div>
                                <div className='text-slate-100 text-sm'>{uv}</div>
                                <div className='text-slate-100 text-xs'>UV</div>
                            </div>
                            <div className='text-center'>
                                <div><FontAwesomeIcon size={30} icon={faDroplet} color="skyblue" /></div>
                                <div className='text-slate-100 text-sm'>{humidity}</div>
                                <div className='text-slate-100 text-xs'>Humidity</div>
                            </div>
                        </div>

                    </div>

                </div>


            </div>
            <div className='w-full'>
                <div className='flex justify-evenly py-5'>
                   {forecastdata.length>0 &&forecastdata.map((item,index)=>( 
                    <div className="from-black to-cyan-200 bg-gradient-to-t w-16 h-28 rounded-3xl flex justify-center items-center">
                        <div className='text-center text-white'>
                            <div>
                                <img className='w-10 h-auto object-contain' src={item.day.condition.icon} />
                            </div>
                            <div className='text-xs'>
                                {item.day.avgtemp_c}&deg;
                            </div>
                            <div className='text-xs'>
                               { dayString[new Date(item.date_epoch *1000).getDay()]}
                            </div>

                        </div>


                    </div>))}
                    
                   
                </div>

            </div>
        </div>
    )
}
export default Main
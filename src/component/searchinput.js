import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Cities from "/node_modules/flag-icons/country.json";
import { useEffect, useState } from "react";

const Searchinput=(props)=>{
    const[cityname,setcityname]=useState(Cities)
    const [search,setsearch]=useState('')
    const [country,setcountry]=useState('')
    const [view,setview]=useState(true)


    const handlesearch=(e)=>{
        const value=e.target.value
        setsearch(value)
       
    }
    const handleclick=(city,country)=>{
        const mycity=city||search
        const mycountry=country||''
        setsearch(mycity)
        setcountry(mycountry)
        props.country(mycountry)
        props.view(!view)
        props.city(mycity)
        setview(!view)
        
        return


    }
    const displayhandle=()=>{
        setview(false)
        props.view(false)
        console.log(cityname)


    }
    useEffect(() => {
        if (search) { // Check if search is defined and not empty
            const filteredCities = Cities.filter((item) => {
                const capital = item.capital || ''; // Ensure capital is defined
                const name = item.name || ''; // Ensure name is defined
            
                return (
                  capital.toLowerCase().includes(search.toLowerCase()) || 
                  name.toLowerCase().includes(search.toLowerCase())
                );
              });
          setcityname(filteredCities);
        } else {
          // Handle the case where the search input is empty, e.g., show all cities
          setcityname(Cities);
        }
      }, [search]);
      
      

    return(
        <div>
            {view &&
        <div className="w-80 h-auto bg-slate-950 px-5 py-7 rounded-2xl ">
            <div className="text-yellow-500 text-3xl text-right w-full   ">
                <div onClick={displayhandle}><FontAwesomeIcon icon={faTimes}  /></div>
            </div>
           <div className="flex justify-center mt-7 px-4">
           <input
           value={search}
           onChange={(e)=>handlesearch(e)} 
           placeholder="Search for City"
           className="h-12 rounded-2xl bg-slate-300 px-3" />
           <span className="text-black -ml-8 pt-3"><FontAwesomeIcon icon={faSearch} /></span>
            </div> 
            <div className="border-2 border-slate-400 rounded-2xl mt-12 h-96 px-5 overflow-y-scroll">
                {
                    cityname.map((items,index)=>(
                        <div onClick={()=>handleclick(items.capital,items.name)} key={index} className="border-yellow-500 border-b-2 text-slate-300 text-center pt-5 text-xl">{items.name}</div>

                    ))
                }

            </div>
        </div>
}
        </div>
    )
}
export default Searchinput
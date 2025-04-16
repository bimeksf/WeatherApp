
import React, {  useState ,useEffect,useRef} from 'react';
import { Icon } from "@iconify/react";
import { motion , AnimatePresence } from "framer-motion";

import Switch from './components/Switch';
import SearchBar from './components/SearchBar';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import ForecastList from './components/ForecastList';
import ForecastCard from './components/ForecastCard';

export default function App() {
  const [location , setLocation] = useState("")
  const [inputText , setInputText] = useState("")
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [darkMode, setDarkMode] = useState(false);

const [suggestions , setSuggestions ] = useState([])


  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const apiXkey = import.meta.env.VITE_RAPID_KEY
const apiXHost = import.meta.env.VITE_RAPID_HOST

  const inputFocus = useRef(null)


  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    inputFocus.current?.focus();
  }, [darkMode]);

  function handleChange(e){
    setInputText(e.target.value)
    fetchCities(e.target.value)


  }

  function toggleDarkMode(){
    setDarkMode(prev=>!prev)


  }


  function handleForm(e){

    e.preventDefault()
    setError(null)
    setLoading(true)
    setWeatherData(null)

    if (!inputText.trim()) {
      setError('Please enter a location.');
      return;
    }
    
    const formattedLocation = inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();
    setLocation(formattedLocation)

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${formattedLocation}&appid=${apiKey}&units=metric`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    }).then(data => { 
      
      
      setWeatherData(data)
  fetchCities()

      
      setLoading(false)})
      .catch(error => {
        
        let errorText = "Something went wrong.";
  if (error.message.includes("404")) {
    errorText = "Location not found. Try again.";
  }
  setError(errorText);
  setLoading(false);
        
        
      }
      
      
    )
  }


  async function fetchCities(query){
    
if(!query) return 

    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiXkey,
        'x-rapidapi-host': apiXHost
      }
    };
    
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.data);
      setSuggestions(result.data  || []);
    } catch (error) {
      console.error(error);
    }

  }



  const list = suggestions && suggestions.length > 0 ? (
    suggestions.map((item) => (
      <li key={item.id}>
        {item.city}, {item.country}
      </li>
    ))
  ) : (
    <li className="text-gray-400 italic p-2">No results found</li>
  )


  
  const dailyForecasts = weatherData ? weatherData.list.filter(item => item.dt_txt.includes("12:00:00")) : []
  const dayName =weatherData ? new Date(weatherData.list[0].dt_txt).toLocaleDateString('en-EN', { weekday: 'long' }) : null;

  return (
    <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:0.7, ease:"easeOut"}}

     className="min-h-screen bg-[#CDCFFF] flex items-center  flex-col text-[#4F51E6] dark:bg-gray-900 dark:text-white">




<Switch toggleDarkMode={toggleDarkMode}/> 




<SearchBar   handleForm={handleForm} handleChange={handleChange} inputText={inputText} inputFocus={inputFocus}  />

    {loading && <Loader/>} 
    {error && !loading && <ErrorMessage message={error} />} 


{/* list */}
{suggestions && list} 


    <AnimatePresence mode="wait">
{ weatherData &&  (

    <>
        <CurrentWeatherCard weatherData={weatherData} dayName={dayName}/>


            <motion.div
               initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay:   0.5, duration: 0.4, ease: "easeOut" }}
            
 className='rounded-full flex items-center gap-10 p-8 
  bg-[#EEEDFF] text-[#4F51E6] dark:bg-gray-800 dark:text-white shadow-md'
             
             
             >



              <div className='flex flex-col items-center gap-1 '>
            <Icon icon="material-symbols:blood-pressure" width="24" height="24" />
              <p>pressure</p>
            <p className='font-bold'>{weatherData.list[0].main.pressure}hPa</p>
              </div>

              <div className='flex flex-col items-center gap-1'>
                
              <Icon icon="material-symbols:humidity-percentage" width="24" height="24" />
              <p>Humidity</p>
            <p className='font-bold'>{weatherData.list[0].main.humidity}%</p>
              </div>

              <div className='flex flex-col items-center gap-1'>
              <Icon icon="material-symbols:wind-power-rounded" width="24" height="24" />
              <p>wind speed</p>
            <p className='font-bold'>{weatherData.list[0].wind.speed}km/h</p>
              </div>





            </motion.div>




            <p className="font-bold text-xl mb-8 mt-10 self-start ml-10 
  text-[#4F51E6] dark:text-white sm:self-center sm:mr-120" >




  5 Day Forecast
</p>

<ForecastList
              dailyForecasts={dailyForecasts}
              location={location}
            />


    </>

      )}
</AnimatePresence>



    </motion.div>
  );
}

  
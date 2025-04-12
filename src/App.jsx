
import React, {  useState } from 'react';


export default function App() {
  const [location , setLocation] = useState("")
  const [inputText , setInputText] = useState("")
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;




  function handleChange(e){
    setInputText(e.target.value)


  }
  function handleForm(e){

    e.preventDefault()

    setError(null)
    setLoading(true)

    const formattedLocation = inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();
    setLocation(formattedLocation)

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${formattedLocation}&appid=${apiKey}&units=metric`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    }).then(data => { 
      
      
      setWeatherData(data)
      console.log(data)
      
      
      setLoading(false)})
    .catch(error => {setError("Error fetching data:", error.message)
    setLoading(false)

   
    }




  
  )
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-300 flex items-center  flex-col">
      <h1 className="text-3xl font-bold  text-white">Weather App ☀️</h1>

    <form onSubmit={handleForm}>
      
      <input type="text" className='outline-2 outline-white p-2 ' onChange={handleChange} value={inputText} placeholder='Location' />
      <button type='submit' className='bg-sky-800 p-4 text-white cursor-pointer rounded-md mx-2'>Add</button>
    </form>

    {loading && <p className="text-white">Loading...</p>} 
    {error && <p className="text-white">{error} </p>} 


{weatherData && (
        <div className="text-white flex flex-col">
          <div className='flex '>
            <p>{weatherData.city.name}, {weatherData.city.country}</p>
            <p>{weatherData.list[0].main.temp}°C</p>
            <p className=''>{weatherData.list[0].weather[0].description}</p>
          </div>

          <img className='' src={`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}.png`}      alt="weather icon"  />
        </div>
      )}



    </div>
  );
}

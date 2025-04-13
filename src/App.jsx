
import React, {  useState } from 'react';
import { Icon } from "@iconify/react";

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
  
  const dailyForecasts = weatherData ? weatherData.list.filter(item => item.dt_txt.includes("12:00:00")) : []
  const dayName =weatherData ? new Date(weatherData.list[0].dt_txt).toLocaleDateString('en-EN', { weekday: 'long' }) : null;

  return (
    <div className="min-h-screen bg-[#CDCFFF] flex items-center  flex-col text-[#4F51E6]">

    <form onSubmit={handleForm} className='flex mt-10'>

    <div className='flex items-center'>
      <Icon icon="material-symbols:add-location-alt-rounded" width="30" height="30" />
        <input type="text"
      className="border-b-2 border-b-black focus:border-b-white focus:border-b-4 p-2 outline-0"
        onChange={handleChange} value={inputText} placeholder='Location' />
    </div>




      <button type='submit' className='bg-sky-800 p-2 text-white cursor-pointer rounded-md mx-2'><Icon icon="material-symbols:add-2-rounded" width="24" height="24" /></button>
    </form>

    {loading && <p className="text-white">Loading...</p>} 
    {error && <p className="text-white">{error} </p>} 


{weatherData && (

    <>
        <div className="text-white flex items-center m-10 ">
          <div className='flex flex-col gap-2 justify-center text-center text-[#4F51E6] '>
            <p className='text-sm'>{dayName}, {weatherData.city.name}, {weatherData.city.country} </p>
            <p className='text-8xl font-bold  relative'>{weatherData.list[0].main.temp}°C</p>
            <p className='text-xl '>{weatherData.list[0].weather[0].main}</p>
          </div>

          <img   className=" left-83 top-43  h-45 w-45 absolute z-0   opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]  animate-glow filter " src={`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}.png`}      alt="weather icon"  />
        </div>


            <div className='bg-[#EEEDFF] rounded-full flex items-center gap-10 p-8 text-[#4F51E6] '>
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

            </div>

            <p className="text-[#4F51E6] font-bold text-xl mb-8 mt-10 self-start ml-10">
  5 Day Forecast
</p>





                <div className='flex justify-center items-center gap-4 '>




                  {
                    
                    weatherData && dailyForecasts.map(card => {
                    const dayName = new Date(card.dt_txt).toLocaleDateString('en-EN', { weekday: 'long' });
                  
                    return (
                      <div key={card.dt}  className='bg-[#4F51E6] rounded-md p-4 flex flex-col justify-center items-center w-25 text-white'>
                        <p className=''>{dayName}</p>
                        <img src={`http://openweathermap.org/img/wn/${card.weather[0].icon}.png`} alt="weather icon" />
                        <p className='font-bold'>{card.main.temp}°C</p>
                      </div>
                    );
                  })
                  
                }


                </div>


    </>

      )}



    </div>
  );
}

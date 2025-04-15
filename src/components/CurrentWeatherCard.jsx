import React from 'react';
import { motion } from 'framer-motion';

export default function CurrentWeatherCard({ weatherData, dayName }) {
  const current = weatherData.list[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-white flex items-center m-10"
    >
      <div className="flex flex-col gap-2 justify-center text-center text-[#4F51E6] dark:text-white">
        <p className="text-sm">
          {dayName}, {weatherData.city.name}, {weatherData.city.country}
        </p>
        <motion.p
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-8xl font-bold relative"
        >
          {current.main.temp}°C
        </motion.p>
        <p className="text-xl">{current.weather[0].main}</p>
      </div>

      <motion.img
        className="left-83 top-43 h-45 w-45 absolute z-0 sm:left-210 sm:top-60 opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        src={`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`}
        alt="weather icon"
      />
    </motion.div>
  );
}

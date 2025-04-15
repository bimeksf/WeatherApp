import React from 'react';
import { motion } from 'framer-motion';

export default function ForecastCard({ card, index }) {
  const dayName = new Date(card.dt_txt).toLocaleDateString('en-EN', {
    weekday: 'long',
  });

  return (
    <motion.div
      key={card.dt}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.4, ease: 'easeOut' }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      className="bg-[#4F51E6] rounded-md p-4 flex flex-col justify-center items-center w-25 text-white"
    >
      <p>{dayName}</p>
      <img
        src={`http://openweathermap.org/img/wn/${card.weather[0].icon}.png`}
        alt="weather icon"
      />
      <p className="font-bold">{card.main.temp}°C</p>
    </motion.div>
  );
}

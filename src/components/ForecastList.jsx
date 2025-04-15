import React from 'react';
import { motion } from 'framer-motion';
import ForecastCard from './ForecastCard';

export default function ForecastList({ dailyForecasts, location }) {
  return (
    <motion.div
      key={location}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex justify-center items-center gap-4"
    >
      {dailyForecasts.map((card, index) => (
        <ForecastCard key={card.dt} card={card} index={index} />
      ))}
    </motion.div>
  );  
}

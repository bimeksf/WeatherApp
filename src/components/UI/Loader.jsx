import { motion , AnimatePresence } from "framer-motion";
import React from 'react';

export default function Loader(){

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center text-center mt-20"
      >
        <p className="text-[#4F51E6] text-lg font-semibold">Fetching weather data...</p>
      </motion.div>



    )




}
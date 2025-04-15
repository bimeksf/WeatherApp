import { motion , AnimatePresence } from "framer-motion";
import React, {  useState } from 'react';

export default function ErrorMessage ({message}){

    return (
        <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center text-center mt-20"
      >
        <p className="text-red-600 text-lg font-bold">{message}</p>
      </motion.div>


    )



}
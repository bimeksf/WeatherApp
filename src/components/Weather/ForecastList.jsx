import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ForecastCard from "./ForecastCard";

export default function ForecastList({ dailyForecasts, location }) {
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);

  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const updateConstraints = () => {
      if (wrapperRef.current && innerRef.current) {
        const wrapperWidth = wrapperRef.current.offsetWidth;
        const innerWidth = innerRef.current.scrollWidth;

        setIsMobile(window.innerWidth < 768);

        if (innerWidth > wrapperWidth) {
          setConstraints({
            right: 0,
            left: wrapperWidth - innerWidth,
          });
        } else {
          setConstraints({ left: 0, right: 0 });
        }
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);

    return () => window.removeEventListener("resize", updateConstraints);
  }, [dailyForecasts]);

  return (
    <motion.div
      key={location}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2 }}
      className="w-full overflow-hidden"
      ref={wrapperRef}
    >
      <motion.div
        drag="x"
        dragElastic={0.1}
        dragTransition={{
          power: 0.2,
          timeConstant: 200,
          modifyTarget: (target) => target,
        }}
        dragConstraints={constraints}
        className={`flex gap-4 px-4 py-2 ${
          isMobile
            ? "cursor-grab active:cursor-grabbing"
            : "justify-center flex-wrap"
        }`}
        ref={innerRef}
      >
        {dailyForecasts.map((card, index) => (
          <ForecastCard key={card.dt} card={card} index={index} />
        ))}
      </motion.div>
    </motion.div>
  );
}

import React from 'react';
import { motion } from "framer-motion";

const AnimatedText = ({ text, styling, type }) => {

  const words = text.split("/");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <>
    {type ? (
      <motion.h1 variants={container} initial='hidden' whileInView='visible' viewport={{ once: true, amount: 0.5 }} className={styling}>
      {words.map((word,index) => (
          <motion.span variants={child} key={index}>{word}<br/></motion.span>
      ))}
      </motion.h1>
    ) : (
      <motion.h2 variants={container} initial='hidden' whileInView='visible' viewport={{ once: true, amount: 0.5 }} className={styling}>
      {words.map((word,index) => (
          <motion.span variants={child} key={index}>{word}<br/></motion.span>
      ))}
      </motion.h2>
    )}
    </>
  )
}

export default AnimatedText
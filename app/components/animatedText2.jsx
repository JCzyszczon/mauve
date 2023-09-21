import React from 'react';
import { motion } from "framer-motion";

const AnimatedText2 = ({ text, styling, state, anDelay }) => {

  const words = text.split(" ");
  let textDelay;

  if(!anDelay) {
    textDelay = 0.02;
  } else {
    textDelay = anDelay;
  }
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: textDelay * i, },
    }),
    exit: { opacity: 0 },
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
    <motion.h2 variants={container} initial='hidden' whileInView='visible' exit='exit' viewport={{ once: state, amount: 0.5 }} className={styling}>
    {words.map((word,index) => (
        <motion.span variants={child} key={index} className='mr-[8px]'>{word}</motion.span>
    ))}
    </motion.h2>
  )
}

export default AnimatedText2;
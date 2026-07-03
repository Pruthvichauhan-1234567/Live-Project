import React from 'react';
import { Sun, Cloud, CloudRain, CloudSun, CloudLightning, Wind } from 'lucide-react';
import { motion } from 'framer-motion';

const WeatherIcon = ({ icon, className = 'w-10 h-10', animated = true }) => {
  const iconMap = {
    'sun': {
      component: Sun,
      color: 'text-amber-500',
      animate: {
        rotate: 360
      },
      transition: {
        repeat: Infinity,
        duration: 15,
        ease: "linear"
      }
    },
    'cloud-sun': {
      component: CloudSun,
      color: 'text-sky-400 dark:text-sky-300',
      animate: {
        y: [0, -4, 0]
      },
      transition: {
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut"
      }
    },
    'cloud': {
      component: Cloud,
      color: 'text-gray-400 dark:text-gray-300',
      animate: {
        y: [0, -3, 0],
        x: [0, 2, 0]
      },
      transition: {
        repeat: Infinity,
        duration: 5,
        ease: "easeInOut"
      }
    },
    'cloud-rain': {
      component: CloudRain,
      color: 'text-blue-400 dark:text-blue-300',
      animate: {
        y: [0, -2, 0]
      },
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }
    },
    'cloud-lightning': {
      component: CloudLightning,
      color: 'text-yellow-500',
      animate: {
        scale: [1, 1.05, 1],
        filter: ['drop-shadow(0 0 0px rgba(234,179,8,0))', 'drop-shadow(0 0 8px rgba(234,179,8,0.5))', 'drop-shadow(0 0 0px rgba(234,179,8,0))']
      },
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      }
    },
    'wind': {
      component: Wind,
      color: 'text-teal-400 dark:text-teal-300',
      animate: {
        x: [0, 4, 0]
      },
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }
    }
  };

  const selected = iconMap[icon] || iconMap['cloud'];
  const IconComponent = selected.component;

  if (!animated) {
    return <IconComponent className={`${selected.color} ${className}`} />;
  }

  return (
    <motion.div
      animate={selected.animate}
      transition={selected.transition}
      className="inline-block"
    >
      <IconComponent className={`${selected.color} ${className}`} />
    </motion.div>
  );
};

export default WeatherIcon;

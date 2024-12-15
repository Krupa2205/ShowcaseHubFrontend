import { motion } from 'framer-motion';

const Card = () => {
  return (
    <motion.div
      className="bg-emerald-300 rounded-xl shadow-lg p-6"
      whileHover={{ scale: 1.05 }}  // Animation on hover
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-2xl font-bold">FullStack Web Devloper's</h3>
      <p className="text-gray-600 mt-2">Syntaxsquad</p>
    </motion.div>
  );
};

export default Card;

import React from "react"
import loadingIcon from "../../images/loading.svg"
import { translateIn } from "./animations"
import { motion, AnimatePresence } from "framer-motion"

const Loading = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={translateIn.animate}
        exit={translateIn.exit}
        style={translateIn.styles}
        className="loading-container "
      >
        <div className="loading-container__inner">
          <img className="loading-image" src={loadingIcon} alt="" />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Loading

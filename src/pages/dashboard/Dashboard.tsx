import { FC } from "react";
import { GrInfo } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard: FC = () => {
    return (
        <motion.div className="flex justify-center items-center h-screen no-select"  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.5,}}>
            <div className="flex flex-row justify-center items-center">
                <GrInfo className="text-2xl" />
                <p className="flex m-2">You're not supposed to be here! We're still working on it.</p>
            </div>
        </motion.div>
    );
}

export default Dashboard;
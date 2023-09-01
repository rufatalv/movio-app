"use client";
import { motion } from "framer-motion";

export default function Loading() {
  const object = {
    name: "Gunay",
    age: 29,
    occupation: "Developer",
  };

  return (
    <motion.div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        alignItems: "center",
        top: 0,
        left: 0,
        backgroundBlendMode: "screen",
        backgroundColor: "#ffffff8f",
        zIndex: 999,
        width: "100%",
        height: "100vh",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div>
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "4px solid #f7f7f7",
            borderTop: "4px solid #333",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}></div>
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </motion.div>
  );
}

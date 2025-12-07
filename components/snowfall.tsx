"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function Snowfall() {
    const [snowflakes, setSnowflakes] = useState<{ id: number; x: number; delay: number; duration: number }[]>([])

    useEffect(() => {
        const isMobile = window.innerWidth < 768
        const count = isMobile ? 20 : 50 // Menos copos en móvil para mejor rendimiento

        const newSnowflakes = Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // Posición horizontal aleatoria (0-100vh)
            delay: Math.random() * 5, // Retraso inicial aleatorio
            duration: Math.random() * 10 + 10, // Duración de caída entre 10s y 20s
        }))
        setSnowflakes(newSnowflakes)
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
            {snowflakes.map((flake) => (
                <motion.div
                    key={flake.id}
                    initial={{ y: -20, x: `${flake.x}vw`, opacity: 0 }}
                    animate={{
                        y: "110vh",
                        x: [`${flake.x}vw`, `${flake.x + (Math.random() * 10 - 5)}vw`, `${flake.x}vw`], // Oscilación lateral suave
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: flake.duration,
                        repeat: Infinity,
                        delay: flake.delay,
                        ease: "linear",
                    }}
                    className="absolute text-white text-opacity-80 select-none"
                    style={{
                        fontSize: `${Math.random() * 10 + 10}px`,
                        filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))",
                    }}
                >
                    ❄
                </motion.div>
            ))}
        </div>
    )
}

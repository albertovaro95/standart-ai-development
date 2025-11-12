import { useState, useEffect } from 'react'
import './CountdownTimer.css'

const CountdownTimer = ({ targetDate = '2024-11-30T14:00:00+01:00' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true
        })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false
      })
    }

    // Calcular inmediatamente
    calculateTimeLeft()

    // Actualizar cada segundo
    const interval = setInterval(calculateTimeLeft, 1000)

    // Cleanup
    return () => clearInterval(interval)
  }, [targetDate])

  if (timeLeft.isExpired) {
    return (
      <div className="countdown-expired">
        <h2>¡Ya estamos aquí!</h2>
      </div>
    )
  }

  return (
    <div className="countdown-timer" role="timer" aria-live="polite">
      <div className="countdown-item">
        <span className="countdown-number">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="countdown-label">Días</span>
      </div>
      <div className="countdown-separator">:</div>
      <div className="countdown-item">
        <span className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="countdown-label">Horas</span>
      </div>
      <div className="countdown-separator">:</div>
      <div className="countdown-item">
        <span className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="countdown-label">Minutos</span>
      </div>
      <div className="countdown-separator">:</div>
      <div className="countdown-item">
        <span className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="countdown-label">Segundos</span>
      </div>
    </div>
  )
}

export default CountdownTimer


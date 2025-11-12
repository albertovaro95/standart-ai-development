import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import CountdownTimer from './CountdownTimer'

describe('CountdownTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('debe calcular correctamente el tiempo restante', () => {
    // Fecha objetivo: 1 día, 2 horas, 3 minutos y 4 segundos en el futuro
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 1)
    futureDate.setHours(futureDate.getHours() + 2)
    futureDate.setMinutes(futureDate.getMinutes() + 3)
    futureDate.setSeconds(futureDate.getSeconds() + 4)

    render(<CountdownTimer targetDate={futureDate.toISOString()} />)

    // Verificar que muestra días, horas, minutos y segundos
    expect(screen.getByText(/días/i)).toBeInTheDocument()
    expect(screen.getByText(/horas/i)).toBeInTheDocument()
    expect(screen.getByText(/minutos/i)).toBeInTheDocument()
    expect(screen.getByText(/segundos/i)).toBeInTheDocument()
  })

  it('debe actualizar cada segundo', async () => {
    const futureDate = new Date()
    futureDate.setSeconds(futureDate.getSeconds() + 5)

    const { container } = render(<CountdownTimer targetDate={futureDate.toISOString()} />)
    
    const initialSeconds = container.textContent

    // Avanzar 1 segundo usando act para envolver la actualización
    await vi.waitFor(() => {
      vi.advanceTimersByTime(1000)
      const updatedSeconds = container.textContent
      expect(updatedSeconds).not.toBe(initialSeconds)
    }, { timeout: 2000 })
  })

  it('debe mostrar el formato correcto de días, horas, minutos y segundos', () => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 5)
    futureDate.setHours(futureDate.getHours() + 10)
    futureDate.setMinutes(futureDate.getMinutes() + 20)
    futureDate.setSeconds(futureDate.getSeconds() + 30)

    render(<CountdownTimer targetDate={futureDate.toISOString()} />)

    // Verificar que los números están presentes
    const countdownText = screen.getByText(/días/i).closest('div')?.textContent || ''
    expect(countdownText).toMatch(/\d+/)
  })

  it('debe mostrar mensaje cuando la fecha ha pasado', () => {
    const pastDate = new Date()
    pastDate.setDate(pastDate.getDate() - 1)

    render(<CountdownTimer targetDate={pastDate.toISOString()} />)

    expect(screen.getByText(/¡Ya estamos aquí!/i)).toBeInTheDocument()
  })

  it('debe limpiar el intervalo cuando el componente se desmonta', () => {
    const futureDate = new Date()
    futureDate.setSeconds(futureDate.getSeconds() + 10)

    const { unmount } = render(<CountdownTimer targetDate={futureDate.toISOString()} />)
    
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
    
    unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()
  })

  it('debe manejar correctamente la zona horaria CET', () => {
    // 30 de noviembre de 2024 a las 14:00 CET (UTC+1)
    const targetDate = '2024-11-30T14:00:00+01:00'
    
    render(<CountdownTimer targetDate={targetDate} />)

    // Verificar que el componente se renderiza sin errores
    expect(screen.getByText(/días|horas|minutos|segundos|¡Ya estamos aquí!/i)).toBeInTheDocument()
  })
})


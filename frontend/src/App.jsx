import { useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:8000/api/leads'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    // Acepta números, espacios, guiones, paréntesis y el símbolo +
    const phoneRegex = /^[\d\s\-\+\(\)]{9,20}$/
    return phoneRegex.test(phone)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    setErrorMessage('')
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'El email no tiene un formato válido'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'El teléfono debe tener entre 9 y 20 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Error al enviar el formulario')
      }

      const data = await response.json()
      setIsSuccess(true)
      setFormData({ name: '', email: '', phone: '' })
      
      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (error) {
      setErrorMessage(error.message || 'Error al enviar el formulario. Por favor, intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="landing-page">
      <div className="container">
        <header className="header">
          <h1 className="title">🚀 El Futuro Está Por Llegar</h1>
          <p className="subtitle">
            Sé el primero en enterarte cuando lancemos nuestra revolucionaria plataforma.
            <br />
            <strong>Únete a la lista de espera y forma parte de algo grande.</strong>
          </p>
        </header>

        <div className="content">
          {isSuccess ? (
            <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>¡Gracias por unirte!</h2>
            <p>Te hemos añadido a nuestra lista de espera. Te notificaremos tan pronto como tengamos novedades.</p>
          </div>
          ) : (
            <form className="lead-form" onSubmit={handleSubmit}>
              <h2 className="form-title">Reserva tu lugar</h2>
              <p className="form-subtitle">Completa el formulario y sé parte de la revolución</p>

              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}

              <div className="form-group">
                <label htmlFor="name">Nombre completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej: Juan Pérez"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ej: juan@ejemplo.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ej: +34 600 123 456"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>

              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Quiero estar informado'}
              </button>

              <p className="form-footer">
                Al enviar este formulario, aceptas recibir información sobre nuestro lanzamiento.
              </p>
            </form>
          )}
        </div>

        <footer className="footer">
          <p>© 2024 AI Standart. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  )
}

export default App

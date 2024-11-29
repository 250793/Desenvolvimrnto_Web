import LogoBrand from '../assets/logo-reduced-white.png'

export function Logo({ className = 'h1 mt-3 mb-4 pb-3' }) {
  return (
    <p className={`${className} text-center text-primary`}>
      <img src={LogoBrand} alt="Company Logo" style={{ width: 90 }} />
    </p>
  )
}

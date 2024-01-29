'use client'

interface ButtonProps {
  label: string
  type: 'submit' | 'button' | 'reset'
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ label, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="primary-button p-2 rounded text-semibold w-60 bg-[#3D709A] text-white hover:text-white hover:font-bold"
      type={type}
    >
      {label}
    </button>
  )
}

export default Button

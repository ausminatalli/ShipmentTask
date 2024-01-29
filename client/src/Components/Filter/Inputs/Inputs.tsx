'use client'

interface InputProps {
  title: string
  type: 'text' | 'email' | 'number'
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  smallText?: boolean
  responsive?: boolean
  value?: string | number
  name?: string
}

const Inputs: React.FC<InputProps> = ({
  title,
  type,
  placeholder,
  onChange,
  smallText,
  responsive,
  value,
  name,
}) => {
  return (
    <>
      <label>
        {title}
        <input
          className={` w-40 border-2 rounded-md p-1 focus:border-blue-500 focus:outline-none
           ${responsive && 'max-[850px]:ml-[100px]'} 
           ${responsive && smallText ? 'max-[850px]:ml-[123px]' : ''}
            ${smallText ? 'ml-[86px]' : 'ml-16'}`}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        ></input>
      </label>
    </>
  )
}

export default Inputs

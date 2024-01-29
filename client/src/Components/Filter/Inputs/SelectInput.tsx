'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Select from 'react-select'

interface SelectInputProps<T> {
  label: string
  smallText?: boolean
  mid?: boolean
  options: T[]
  prefix?: any
  prefixId?: any
  responsive?: boolean
  onSelectValueChange?: (selectedValue: any) => void
  instanceId: string
  reset?: boolean
  setReset: Dispatch<SetStateAction<boolean>>
  customClass?: string
}

interface Option {
  value: any
  label: string
}

const SelectInput: React.FC<SelectInputProps<any>> = ({
  label,
  smallText,
  mid,
  options,
  prefix,
  prefixId,
  responsive,
  onSelectValueChange,
  instanceId,
  reset,
  setReset,
  customClass,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  // const [key, setKey] = useState(0)
  const option = options.map((item) => ({
    value: item[prefixId],
    label: item[prefix],
  }))

  const handleSelectChange = (selectedOption: Option | null) => {
    setSelectedOption(selectedOption)
    onSelectValueChange?.(selectedOption?.value)

  }

  useEffect(() => {
    if (reset) {
      setSelectedOption(null)
      setReset(false)

      // setKey((prevKey) => prevKey + 1)
    }
  }, [reset, setReset])

  useEffect(() => {}, [setSelectedOption])
  return (
    <div className={`w-50 flex`}>
      <label
        className={`mt-2 ${smallText ? 'mr-[110px]' : 'mr-5'}
        ${responsive ? 'max-[850px]:mr-[62px]' : ''}
        ${customClass}
        ${mid ? 'mr-[98px]' : 'mr-5'}`}
      >
        {label}:
      </label>
      <Select
        isClearable
        instanceId={instanceId}
        value={selectedOption}
        onChange={(option) => handleSelectChange(option)}
        options={option}
        isSearchable
        placeholder="Search..."
        classNames={{
          control: () => `w-40 border-2 `,
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
      />
    </div>
  )
}

export default SelectInput

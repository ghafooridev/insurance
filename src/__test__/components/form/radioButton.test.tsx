import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import RadioButton from '@/components/form/radioButton'
import { UseFormRegister } from 'react-hook-form'
import { FormFieldInterface } from '@/interfaces'

const mockRegister: UseFormRegister<any> = jest.fn()

describe('RadioButton Component', () => {
  const field: FormFieldInterface = {
    id: 'preferences',
    label: 'Preferences',
    options: ['Option 1', 'Option 2'],
    type: 'radio'
  }

  it('should render radio buttons with labels', () => {
    render(<RadioButton field={field} register={mockRegister} />)

    expect(screen.getByText(/Preferences/i)).toBeInTheDocument()

    expect(screen.getByLabelText(/Option 1/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Option 2/i)).toBeInTheDocument()
  })

  it('should call register with correct field id', () => {
    render(<RadioButton field={field} register={mockRegister} />)

    expect(mockRegister).toHaveBeenCalledWith(field.id)
  })

  it('should have the first option selected by default', () => {
    render(<RadioButton field={field} register={mockRegister} />)

    const option1 = screen.getByLabelText(/Option 1/i)
    expect(option1).toBeChecked()

    const option2 = screen.getByLabelText(/Option 2/i)
    expect(option2).not.toBeChecked()
  })

  it('should allow selecting a radio button', () => {
    render(<RadioButton field={field} register={mockRegister} />)

    const option1 = screen.getByLabelText(/Option 1/i)
    const option2 = screen.getByLabelText(/Option 2/i)

    fireEvent.click(option2)

    expect(option2).toBeChecked()
    expect(option1).not.toBeChecked()
  })
})

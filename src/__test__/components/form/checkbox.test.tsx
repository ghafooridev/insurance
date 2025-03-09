import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import CheckBox from '../../../components/form/checkbox'
import { UseFormRegister } from 'react-hook-form'
import { FormFieldInterface } from '@/interfaces'

const mockRegister: UseFormRegister<any> = jest.fn()

describe('CheckBox Component', () => {
  const field: FormFieldInterface = {
    id: 'preferences',
    label: 'Preferences',
    options: ['Option 1', 'Option 2'],
    type: 'checkbox'
  }

  it('should render checkboxes with labels', () => {
    render(<CheckBox field={field} register={mockRegister} />)

    expect(screen.getByText(/Preferences/i)).toBeInTheDocument()

    expect(screen.getByLabelText(/Option 1/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Option 2/i)).toBeInTheDocument()
  })

  it('should call register with correct field id', () => {
    render(<CheckBox field={field} register={mockRegister} />)

    expect(mockRegister).toHaveBeenCalledWith(field.id)
  })

  it('should trigger checkbox selection on click', () => {
    render(<CheckBox field={field} register={mockRegister} />)

    const option1Checkbox = screen.getByLabelText(/Option 1/i)
    const option2Checkbox = screen.getByLabelText(/Option 2/i)

    fireEvent.click(option1Checkbox)
    fireEvent.click(option2Checkbox)

    expect(option1Checkbox).toBeChecked()
    expect(option2Checkbox).toBeChecked()
  })
})

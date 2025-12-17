import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PasswordInput } from '../../components/password-input'

describe('PasswordInput', () => {
  it('renders with password type by default', () => {
    render(<PasswordInput />)
    const input = document.querySelector('input')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('toggles visibility when button is clicked', () => {
    render(<PasswordInput />)
    const input = document.querySelector('input')
    const toggleButton = screen.getByRole('button')

    // Initially password
    expect(input).toHaveAttribute('type', 'password')

    // Click to show
    fireEvent.click(toggleButton)
    expect(input).toHaveAttribute('type', 'text')

    // Click to hide again
    fireEvent.click(toggleButton)
    expect(input).toHaveAttribute('type', 'password')
  })

  it('shows "Show password" text when password is hidden', () => {
    render(<PasswordInput />)
    expect(screen.getByText('Show password')).toBeInTheDocument()
  })

  it('shows "Hide password" text when password is visible', () => {
    render(<PasswordInput />)
    const toggleButton = screen.getByRole('button')

    fireEvent.click(toggleButton)
    expect(screen.getByText('Hide password')).toBeInTheDocument()
  })

  it('accepts and displays value', () => {
    render(<PasswordInput defaultValue="secret123" />)
    expect(screen.getByDisplayValue('secret123')).toBeInTheDocument()
  })

  it('handles onChange events', () => {
    const handleChange = vi.fn()
    render(<PasswordInput onChange={handleChange} />)

    const input = document.querySelector('input')!
    fireEvent.change(input, { target: { value: 'newpassword' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(<PasswordInput className="custom-class" />)
    const input = document.querySelector('input')
    expect(input).toHaveClass('custom-class')
  })

  it('can be disabled', () => {
    render(<PasswordInput disabled />)
    const input = document.querySelector('input')
    const toggleButton = screen.getByRole('button')

    expect(input).toBeDisabled()
    expect(toggleButton).toBeDisabled()
  })

  it('shows EyeOffIcon when disabled regardless of showPassword state', () => {
    render(<PasswordInput disabled />)
    // When disabled, should show EyeOffIcon (aria-hidden="true")
    const icon = document.querySelector('[aria-hidden="true"]')
    expect(icon).toBeInTheDocument()
  })

  it('forwards ref to input element', () => {
    const ref = { current: null as HTMLInputElement | null }
    render(<PasswordInput ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('has hide-password-toggle class for native toggle hiding', () => {
    render(<PasswordInput />)
    const input = document.querySelector('input')
    expect(input).toHaveClass('hide-password-toggle')
  })

  it('toggle button has correct styling', () => {
    render(<PasswordInput />)
    const toggleButton = screen.getByRole('button')

    expect(toggleButton).toHaveClass('absolute')
    expect(toggleButton).toHaveClass('right-0')
    expect(toggleButton).toHaveClass('hover:bg-transparent')
  })

  it('supports name attribute', () => {
    render(<PasswordInput name="password" />)
    const input = document.querySelector('input')
    expect(input).toHaveAttribute('name', 'password')
  })

  it('supports placeholder', () => {
    render(<PasswordInput placeholder="Enter password" />)
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument()
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button, buttonVariants } from '../../components/button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies default variant classes', () => {
    render(<Button>Default</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-primary')
  })

  it('applies destructive variant classes', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-destructive')
  })

  it('applies outline variant classes', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('border')
    expect(button).toHaveClass('bg-background')
  })

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-secondary')
  })

  it('applies ghost variant classes', () => {
    render(<Button variant="ghost">Ghost</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('hover:bg-accent')
  })

  it('applies link variant classes', () => {
    render(<Button variant="link">Link</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('text-primary')
    expect(button).toHaveClass('underline-offset-4')
  })

  it('applies size sm classes', () => {
    render(<Button size="sm">Small</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-9')
    expect(button).toHaveClass('px-3')
  })

  it('applies size lg classes', () => {
    render(<Button size="lg">Large</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-11')
    expect(button).toHaveClass('px-8')
  })

  it('applies size icon classes', () => {
    render(<Button size="icon">Icon</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-10')
    expect(button).toHaveClass('w-10')
  })

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:pointer-events-none')
    expect(button).toHaveClass('disabled:opacity-50')
  })

  it('renders as child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    const link = screen.getByRole('link', { name: /link button/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  it('accepts custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('renders icon on the left when iconPlacement is left', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>
    render(
      <Button icon={TestIcon} iconPlacement="left">
        With Icon
      </Button>
    )
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('renders icon on the right when iconPlacement is right', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>
    render(
      <Button icon={TestIcon} iconPlacement="right">
        With Icon
      </Button>
    )
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('applies shine effect classes', () => {
    render(<Button effect="shine">Shine</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('overflow-hidden')
  })

  it('applies ringHover effect classes', () => {
    render(<Button effect="ringHover">Ring Hover</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('transition-all')
    expect(button).toHaveClass('duration-300')
  })

  it('forwards ref to button element', () => {
    const ref = { current: null as HTMLButtonElement | null }
    render(<Button ref={ref}>Ref Test</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})

describe('buttonVariants', () => {
  it('returns base classes by default', () => {
    const classes = buttonVariants()
    expect(classes).toContain('inline-flex')
    expect(classes).toContain('items-center')
    expect(classes).toContain('rounded-md')
  })

  it('returns correct classes for different variants', () => {
    expect(buttonVariants({ variant: 'destructive' })).toContain('bg-destructive')
    expect(buttonVariants({ variant: 'outline' })).toContain('border')
    expect(buttonVariants({ variant: 'secondary' })).toContain('bg-secondary')
    expect(buttonVariants({ variant: 'ghost' })).toContain('hover:bg-accent')
    expect(buttonVariants({ variant: 'link' })).toContain('text-primary')
  })

  it('returns correct classes for different sizes', () => {
    expect(buttonVariants({ size: 'sm' })).toContain('h-9')
    expect(buttonVariants({ size: 'lg' })).toContain('h-11')
    expect(buttonVariants({ size: 'icon' })).toContain('w-10')
  })
})

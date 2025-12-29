import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/core/button'  // Using @ alias
import { describe, it, expect, vi } from 'vitest'


describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders primary variant by default', () => {
    render(<Button>Primary</Button>)
    const button = screen.getByText('Primary')
    expect(button).toHaveClass('bg-primary')
  })

  it('renders secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByText('Secondary')
    expect(button).toHaveClass('bg-secondary')
  })

  it('renders outline variant', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByText('Outline')
    expect(button).toHaveClass('border')
  })

  it('renders ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>)
    const button = screen.getByText('Ghost')
    expect(button).toHaveClass('hover:bg-accent')
  })

  it('renders destructive variant', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByText('Delete')
    expect(button).toHaveClass('bg-destructive')
  })

  it('renders different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByText('Small')).toHaveClass('h-8')

    rerender(<Button size="default">Default</Button>)
    expect(screen.getByText('Default')).toHaveClass('h-10')

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByText('Large')).toHaveClass('h-11')
  })

  it('disables button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByText('Disabled')
    expect(button).toBeDisabled()
  })

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>)
    const button = screen.getByText('Loading')
    expect(button).toBeDisabled()
    expect(button.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('renders with left icon', () => {
    render(<Button leftIcon={<span data-testid="left-icon">👈</span>}>With Icon</Button>)
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
  })

  it('renders with right icon', () => {
    render(<Button rightIcon={<span data-testid="right-icon">👉</span>}>With Icon</Button>)
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    expect(screen.getByText('Custom')).toHaveClass('custom-class')
  })
})
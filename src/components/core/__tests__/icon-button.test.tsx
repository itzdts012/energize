import { render, screen, fireEvent } from '@testing-library/react'
import { IconButton } from '../icon-button'
import { describe, it, expect, vi } from 'vitest'
import { Plus, Trash2 } from 'lucide-react'

describe('IconButton', () => {
  it('renders correctly with icon', () => {
    render(
      <IconButton 
        icon={<Plus data-testid="plus-icon" />} 
        ariaLabel="Add item"
      />
    )
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument()
  })

  it('renders with correct aria-label for accessibility', () => {
    render(
      <IconButton 
        icon={<Plus />} 
        ariaLabel="Add new task"
      />
    )
    const button = screen.getByRole('button', { name: 'Add new task' })
    expect(button).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(
      <IconButton 
        icon={<Plus />} 
        ariaLabel="Add item"
        onClick={handleClick}
      />
    )
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders primary variant by default', () => {
    render(<IconButton icon={<Plus />} ariaLabel="Add" />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-primary')
  })

  it('renders secondary variant', () => {
    render(
      <IconButton 
        variant="secondary" 
        icon={<Plus />} 
        ariaLabel="Add"
      />
    )
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-secondary')
  })

  it('renders outline variant', () => {
    render(
      <IconButton 
        variant="outline" 
        icon={<Plus />} 
        ariaLabel="Add"
      />
    )
    const button = screen.getByRole('button')
    expect(button).toHaveClass('border')
  })

  it('renders ghost variant', () => {
    render(
      <IconButton 
        variant="ghost" 
        icon={<Plus />} 
        ariaLabel="Add"
      />
    )
    const button = screen.getByRole('button')
    expect(button).toHaveClass('hover:bg-accent')
  })

  it('renders destructive variant', () => {
    render(
      <IconButton 
        variant="destructive" 
        icon={<Trash2 />} 
        ariaLabel="Delete"
      />
    )
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-destructive')
  })

  it('renders different sizes', () => {
    const { rerender } = render(
      <IconButton size="sm" icon={<Plus />} ariaLabel="Add" />
    )
    let button = screen.getByRole('button')
    expect(button).toHaveClass('h-8', 'w-8')

    rerender(<IconButton size="default" icon={<Plus />} ariaLabel="Add" />)
    button = screen.getByRole('button')
    expect(button).toHaveClass('h-10', 'w-10')

    rerender(<IconButton size="lg" icon={<Plus />} ariaLabel="Add" />)
    button = screen.getByRole('button')
    expect(button).toHaveClass('h-12', 'w-12')

    rerender(<IconButton size="xl" icon={<Plus />} ariaLabel="Add" />)
    button = screen.getByRole('button')
    expect(button).toHaveClass('h-14', 'w-14')
  })

  it('renders square shape by default', () => {
    render(<IconButton icon={<Plus />} ariaLabel="Add" />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('rounded-md')
  })

  it('renders circle shape', () => {
    render(
      <IconButton 
        shape="circle" 
        icon={<Plus />} 
        ariaLabel="Add"
      />
    )
    const button = screen.getByRole('button')
    expect(button).toHaveClass('rounded-full')
  })

  it('disables button when disabled prop is true', () => {
    render(
      <IconButton 
        disabled 
        icon={<Plus />} 
        ariaLabel="Add"
      />
    )
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('shows loading state', () => {
    render(
      <IconButton 
        loading 
        icon={<Plus />} 
        ariaLabel="Add"
      />
    )
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <IconButton 
        className="custom-class" 
        icon={<Plus />} 
        ariaLabel="Add"
      />
    )
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })
})
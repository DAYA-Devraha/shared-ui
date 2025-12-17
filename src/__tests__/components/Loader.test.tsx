import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Loader } from '../../components/loader'

// Mock gsap
vi.mock('gsap', () => ({
  gsap: {
    context: vi.fn((callback, ref) => {
      callback()
      return { revert: vi.fn() }
    }),
    fromTo: vi.fn(),
  },
}))

describe('Loader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loader container', () => {
    render(<Loader />)
    const container = document.querySelector('.flex.min-h-\\[50vh\\]')
    expect(container).toBeInTheDocument()
  })

  it('renders three dots', () => {
    render(<Loader />)
    const dots = document.querySelectorAll('.dot')
    expect(dots).toHaveLength(3)
  })

  it('dots have correct styling classes', () => {
    render(<Loader />)
    const dots = document.querySelectorAll('.dot')

    dots.forEach((dot) => {
      expect(dot).toHaveClass('h-4')
      expect(dot).toHaveClass('w-4')
      expect(dot).toHaveClass('rounded-full')
    })
  })

  it('first and third dots have primary color', () => {
    render(<Loader />)
    const dots = document.querySelectorAll('.dot')

    expect(dots[0]).toHaveClass('bg-primary')
    expect(dots[2]).toHaveClass('bg-primary')
  })

  it('middle dot has secondary color', () => {
    render(<Loader />)
    const dots = document.querySelectorAll('.dot')

    expect(dots[1]).toHaveClass('bg-secondary')
  })

  it('initializes gsap animation on mount', async () => {
    const { gsap } = await import('gsap')
    render(<Loader />)

    expect(gsap.context).toHaveBeenCalled()
    expect(gsap.fromTo).toHaveBeenCalledWith(
      '.dot',
      { scale: 0.8, opacity: 0.5 },
      expect.objectContaining({
        scale: 1.2,
        opacity: 1,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        duration: 0.6,
      })
    )
  })

  it('cleans up gsap context on unmount', async () => {
    const revertMock = vi.fn()
    const { gsap } = await import('gsap')
    vi.mocked(gsap.context).mockReturnValue({ revert: revertMock } as unknown as ReturnType<typeof gsap.context>)

    const { unmount } = render(<Loader />)
    unmount()

    expect(revertMock).toHaveBeenCalled()
  })
})

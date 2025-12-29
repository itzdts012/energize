import { ButtonGroup } from '@/components/core/button-group'
import { Button } from '@/components/core/button'
import { IconButton } from '@/components/core/icon-button'
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered,
  Code,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  SkipForward,
  ThumbsUp,
  ThumbsDown,
  Flag
} from 'lucide-react'

export default function ButtonGroupDemo() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">ButtonGroup Component</h1>
        <p className="text-muted-foreground">
          Group related buttons together for better organization
        </p>
      </div>

      {/* Basic Horizontal */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Horizontal Group</h2>
        <ButtonGroup>
          <Button variant="outline">Left</Button>
          <Button variant="outline">Middle</Button>
          <Button variant="outline">Right</Button>
        </ButtonGroup>
      </section>

      {/* Vertical Orientation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Vertical Orientation</h2>
        <ButtonGroup orientation="vertical">
          <Button variant="outline">Top</Button>
          <Button variant="outline">Middle</Button>
          <Button variant="outline">Bottom</Button>
        </ButtonGroup>
      </section>

      {/* Separated Buttons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Separated Buttons</h2>
        <ButtonGroup attached={false}>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </section>

      {/* Different Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Different Variants</h2>
        <div className="space-y-3">
          <ButtonGroup>
            <Button variant="primary">Primary</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="primary">Primary</Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button variant="secondary">Secondary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="secondary">Secondary</Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button variant="outline">Outline</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="outline">Outline</Button>
          </ButtonGroup>
        </div>
      </section>

      {/* Icon Buttons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Icon Button Groups</h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Text Formatting</p>
            <ButtonGroup>
              <IconButton 
                variant="outline"
                icon={<Bold className="h-4 w-4" />} 
                ariaLabel="Bold"
              />
              <IconButton 
                variant="outline"
                icon={<Italic className="h-4 w-4" />} 
                ariaLabel="Italic"
              />
              <IconButton 
                variant="outline"
                icon={<Underline className="h-4 w-4" />} 
                ariaLabel="Underline"
              />
            </ButtonGroup>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Text Alignment</p>
            <ButtonGroup>
              <IconButton 
                variant="outline"
                icon={<AlignLeft className="h-4 w-4" />} 
                ariaLabel="Align left"
              />
              <IconButton 
                variant="outline"
                icon={<AlignCenter className="h-4 w-4" />} 
                ariaLabel="Align center"
              />
              <IconButton 
                variant="outline"
                icon={<AlignRight className="h-4 w-4" />} 
                ariaLabel="Align right"
              />
            </ButtonGroup>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">List Options</p>
            <ButtonGroup>
              <IconButton 
                variant="outline"
                icon={<List className="h-4 w-4" />} 
                ariaLabel="Bullet list"
              />
              <IconButton 
                variant="outline"
                icon={<ListOrdered className="h-4 w-4" />} 
                ariaLabel="Numbered list"
              />
              <IconButton 
                variant="outline"
                icon={<Code className="h-4 w-4" />} 
                ariaLabel="Code block"
              />
            </ButtonGroup>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Navigation Controls</h2>
        <ButtonGroup>
          <IconButton 
            variant="outline"
            icon={<ChevronLeft className="h-4 w-4" />} 
            ariaLabel="Previous"
          />
          <Button variant="outline">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <IconButton 
            variant="outline"
            icon={<ChevronRight className="h-4 w-4" />} 
            ariaLabel="Next"
          />
        </ButtonGroup>
      </section>

      {/* Media Controls */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Media Controls</h2>
        <ButtonGroup>
          <IconButton 
            variant="secondary"
            icon={<ChevronLeft className="h-4 w-4" />} 
            ariaLabel="Previous track"
          />
          <IconButton 
            variant="secondary"
            icon={<Play className="h-4 w-4" />} 
            ariaLabel="Play"
          />
          <IconButton 
            variant="secondary"
            icon={<Pause className="h-4 w-4" />} 
            ariaLabel="Pause"
          />
          <IconButton 
            variant="secondary"
            icon={<SkipForward className="h-4 w-4" />} 
            ariaLabel="Next track"
          />
        </ButtonGroup>
      </section>

      {/* Real-world Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Real-world Examples</h2>

        {/* Task View Switcher */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Task View Switcher</p>
          <ButtonGroup>
            <Button variant="outline">List</Button>
            <Button variant="outline">Board</Button>
            <Button variant="outline">Calendar</Button>
            <Button variant="outline">Timeline</Button>
          </ButtonGroup>
        </div>

        {/* Time Period Selector */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Time Period Selector</p>
          <ButtonGroup>
            <Button variant="outline" size="sm">Day</Button>
            <Button variant="outline" size="sm">Week</Button>
            <Button variant="outline" size="sm">Month</Button>
            <Button variant="outline" size="sm">Year</Button>
          </ButtonGroup>
        </div>

        {/* Priority Filter */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Priority Filter</p>
          <ButtonGroup>
            <Button variant="outline" size="sm">All</Button>
            <Button variant="outline" size="sm">High</Button>
            <Button variant="outline" size="sm">Medium</Button>
            <Button variant="outline" size="sm">Low</Button>
          </ButtonGroup>
        </div>

        {/* Feedback Actions */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Feedback Actions</p>
          <ButtonGroup attached={false}>
            <IconButton 
              variant="outline"
              icon={<ThumbsUp className="h-4 w-4" />} 
              ariaLabel="Like"
            />
            <IconButton 
              variant="outline"
              icon={<ThumbsDown className="h-4 w-4" />} 
              ariaLabel="Dislike"
            />
            <IconButton 
              variant="outline"
              icon={<Flag className="h-4 w-4" />} 
              ariaLabel="Report"
            />
          </ButtonGroup>
        </div>
      </section>

      {/* With Active State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">With Active State</h2>
        <p className="text-sm text-muted-foreground">
          Use different variants to show active state
        </p>
        <ButtonGroup>
          <Button variant="primary">Active</Button>
          <Button variant="outline">Inactive</Button>
          <Button variant="outline">Inactive</Button>
        </ButtonGroup>
      </section>

      {/* Vertical with Icons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Vertical with Mixed Content</h2>
        <ButtonGroup orientation="vertical">
          <Button variant="outline" className="justify-start">
            <Bold className="h-4 w-4 mr-2" />
            Bold Text
          </Button>
          <Button variant="outline" className="justify-start">
            <Italic className="h-4 w-4 mr-2" />
            Italic Text
          </Button>
          <Button variant="outline" className="justify-start">
            <Underline className="h-4 w-4 mr-2" />
            Underline Text
          </Button>
        </ButtonGroup>
      </section>
    </div>
  )
}
import { Button } from '@/components/core/button'
import { Plus, Trash2, Download, Send, Heart, Star } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
export default function ButtonDemo() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Button Component</h1>
        <p className="text-muted-foreground">
          A collection of button variants for the Energize app
        </p>
        <ThemeToggle />
      </div>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Plus className="h-4 w-4" /></Button>
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">With Icons</h2>
        <div className="flex flex-wrap gap-3">
          <Button leftIcon={<Plus className="h-4 w-4" />}>Add Task</Button>
          <Button variant="secondary" leftIcon={<Download className="h-4 w-4" />}>
            Download
          </Button>
          <Button variant="outline" rightIcon={<Send className="h-4 w-4" />}>
            Send
          </Button>
          <Button variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />}>
            Delete
          </Button>
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">States</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Normal</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Real-world examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Real-world Examples</h2>
        <div className="flex flex-wrap gap-3">
          <Button leftIcon={<Plus className="h-4 w-4" />}>Create New Task</Button>
          <Button variant="secondary" leftIcon={<Star className="h-4 w-4" />}>
            Add to Favorites
          </Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />}>
            Delete Forever
          </Button>
        </div>
      </section>

      {/* Button Groups */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Button Groups</h2>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <Button variant="outline" className="rounded-r-none">Left</Button>
          <Button variant="outline" className="rounded-none border-l-0">Middle</Button>
          <Button variant="outline" className="rounded-l-none border-l-0">Right</Button>
        </div>
      </section>
    </div>
  )
}
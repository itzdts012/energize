import { IconButton } from '@/components/core/icon-button'
import { 
  Plus, 
  Trash2, 
  Edit, 
  Download, 
  Send, 
  Heart, 
  Star,
  Settings,
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Play,
  Pause,
  Volume2,
  Bell,
  Share2
} from 'lucide-react'

export default function IconButtonDemo() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">IconButton Component</h1>
        <p className="text-muted-foreground">
          Icon-only buttons for common actions in the Energize app
        </p>
      </div>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <IconButton 
            variant="primary" 
            icon={<Plus className="h-4 w-4" />} 
            ariaLabel="Add item"
          />
          <IconButton 
            variant="secondary" 
            icon={<Edit className="h-4 w-4" />} 
            ariaLabel="Edit"
          />
          <IconButton 
            variant="outline" 
            icon={<Download className="h-4 w-4" />} 
            ariaLabel="Download"
          />
          <IconButton 
            variant="ghost" 
            icon={<Settings className="h-4 w-4" />} 
            ariaLabel="Settings"
          />
          <IconButton 
            variant="destructive" 
            icon={<Trash2 className="h-4 w-4" />} 
            ariaLabel="Delete"
          />
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          <IconButton 
            size="sm" 
            icon={<Plus className="h-3 w-3" />} 
            ariaLabel="Add small"
          />
          <IconButton 
            size="default" 
            icon={<Plus className="h-4 w-4" />} 
            ariaLabel="Add default"
          />
          <IconButton 
            size="lg" 
            icon={<Plus className="h-5 w-5" />} 
            ariaLabel="Add large"
          />
          <IconButton 
            size="xl" 
            icon={<Plus className="h-6 w-6" />} 
            ariaLabel="Add extra large"
          />
        </div>
      </section>

      {/* Shapes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Shapes</h2>
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-col items-center gap-2">
            <IconButton 
              shape="square" 
              icon={<Plus className="h-4 w-4" />} 
              ariaLabel="Square button"
            />
            <span className="text-xs text-muted-foreground">Square</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <IconButton 
              shape="circle" 
              icon={<Plus className="h-4 w-4" />} 
              ariaLabel="Circle button"
            />
            <span className="text-xs text-muted-foreground">Circle</span>
          </div>
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">States</h2>
        <div className="flex flex-wrap gap-3">
          <IconButton 
            icon={<Plus className="h-4 w-4" />} 
            ariaLabel="Normal"
          />
          <IconButton 
            loading 
            icon={<Plus className="h-4 w-4" />} 
            ariaLabel="Loading"
          />
          <IconButton 
            disabled 
            icon={<Plus className="h-4 w-4" />} 
            ariaLabel="Disabled"
          />
        </div>
      </section>

      {/* Common Actions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Actions</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
          <div className="flex flex-col items-center gap-2">
            <IconButton 
              variant="ghost"
              icon={<Menu className="h-4 w-4" />} 
              ariaLabel="Menu"
            />
            <span className="text-xs text-muted-foreground">Menu</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <IconButton 
              variant="ghost"
              icon={<Search className="h-4 w-4" />} 
              ariaLabel="Search"
            />
            <span className="text-xs text-muted-foreground">Search</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <IconButton 
              variant="ghost"
              icon={<Bell className="h-4 w-4" />} 
              ariaLabel="Notifications"
            />
            <span className="text-xs text-muted-foreground">Notify</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <IconButton 
              variant="ghost"
              icon={<Settings className="h-4 w-4" />} 
              ariaLabel="Settings"
            />
            <span className="text-xs text-muted-foreground">Settings</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <IconButton 
              variant="outline"
              icon={<Edit className="h-4 w-4" />} 
              ariaLabel="Edit"
            />
            <span className="text-xs text-muted-foreground">Edit</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <IconButton 
              variant="destructive"
              icon={<Trash2 className="h-4 w-4" />} 
              ariaLabel="Delete"
            />
            <span className="text-xs text-muted-foreground">Delete</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <IconButton 
              variant="outline"
              icon={<Share2 className="h-4 w-4" />} 
              ariaLabel="Share"
            />
            <span className="text-xs text-muted-foreground">Share</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <IconButton 
              variant="outline"
              icon={<Download className="h-4 w-4" />} 
              ariaLabel="Download"
            />
            <span className="text-xs text-muted-foreground">Download</span>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Navigation</h2>
        <div className="flex gap-3">
          <IconButton 
            variant="outline"
            icon={<ChevronLeft className="h-4 w-4" />} 
            ariaLabel="Previous"
          />
          <IconButton 
            variant="outline"
            icon={<ChevronRight className="h-4 w-4" />} 
            ariaLabel="Next"
          />
          <IconButton 
            variant="outline"
            icon={<X className="h-4 w-4" />} 
            ariaLabel="Close"
          />
          <IconButton 
            variant="ghost"
            icon={<MoreVertical className="h-4 w-4" />} 
            ariaLabel="More options"
          />
        </div>
      </section>

      {/* Media Controls */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Media Controls</h2>
        <div className="flex gap-3">
          <IconButton 
            variant="secondary"
            shape="circle"
            icon={<Play className="h-4 w-4" />} 
            ariaLabel="Play"
          />
          <IconButton 
            variant="secondary"
            shape="circle"
            icon={<Pause className="h-4 w-4" />} 
            ariaLabel="Pause"
          />
          <IconButton 
            variant="ghost"
            shape="circle"
            icon={<Volume2 className="h-4 w-4" />} 
            ariaLabel="Volume"
          />
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Real-world Examples</h2>

        {/* Task Card Actions */}
        <div className="border rounded-lg p-4 max-w-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Complete project proposal</h3>
            <div className="flex gap-1">
              <IconButton 
                variant="ghost"
                size="sm"
                icon={<Star className="h-3 w-3" />} 
                ariaLabel="Add to favorites"
              />
              <IconButton 
                variant="ghost"
                size="sm"
                icon={<Edit className="h-3 w-3" />} 
                ariaLabel="Edit task"
              />
              <IconButton 
                variant="ghost"
                size="sm"
                icon={<Trash2 className="h-3 w-3" />} 
                ariaLabel="Delete task"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Due tomorrow</p>
        </div>

        {/* Floating Action Button */}
        <div className="relative h-32 border rounded-lg bg-muted/20">
          <IconButton 
            size="lg"
            shape="circle"
            className="absolute bottom-4 right-4 shadow-lg"
            icon={<Plus className="h-5 w-5" />} 
            ariaLabel="Add new task"
          />
          <p className="absolute top-4 left-4 text-sm text-muted-foreground">
            Floating Action Button (FAB)
          </p>
        </div>
      </section>
    </div>
  )
}
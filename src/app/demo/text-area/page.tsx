"use client"

import { Textarea } from '@/components/core/text-area'
import { useState } from 'react'
import { Button } from '@/components/core/button'
import { ThemeToggle } from '@/components/theme-toggle'

export default function TextareaDemo() {
  const [noteValue, setNoteValue] = useState("")
  const [bioValue, setBioValue] = useState("")
  const [feedbackValue, setFeedbackValue] = useState("")
  const [autoResizeValue, setAutoResizeValue] = useState("")

  return (
    <div className="container mx-auto p-8 space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Textarea Component</h1>
          <p className="text-muted-foreground">
            Multi-line text input with character count and auto-resize
          </p>
        </div>
        <ThemeToggle />
      </div>

      {/* Basic Textareas */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Textareas</h2>
        <div className="grid gap-4 max-w-md">
          <Textarea placeholder="Enter your text here..." />
          <Textarea 
            placeholder="With label" 
            label="Description"
          />
          <Textarea 
            placeholder="With helper text" 
            label="Bio"
            helperText="Tell us a little about yourself."
          />
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sizes</h2>
        <div className="grid gap-4 max-w-md">
          <Textarea 
            textareaSize="sm"
            placeholder="Small textarea" 
            label="Small"
          />
          <Textarea 
            textareaSize="default"
            placeholder="Default textarea" 
            label="Default"
          />
          <Textarea 
            textareaSize="lg"
            placeholder="Large textarea" 
            label="Large"
          />
        </div>
      </section>

      {/* Character Count */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Character Count</h2>
        <div className="grid gap-4 max-w-md">
          <Textarea 
            placeholder="Type something..." 
            label="Without Limit"
            showCount
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
          />
          <Textarea 
            placeholder="Max 100 characters" 
            label="With Limit"
            showCount
            maxLength={100}
            helperText="Keep it short and sweet"
          />
          <Textarea 
            placeholder="Max 280 characters" 
            label="Tweet"
            showCount
            maxLength={280}
            helperText="Share your thoughts"
            value={feedbackValue}
            onChange={(e) => setFeedbackValue(e.target.value)}
          />
        </div>
      </section>

      {/* Auto-resize */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Auto-resize</h2>
        <div className="grid gap-4 max-w-md">
          <Textarea 
            placeholder="Start typing and watch it grow..." 
            label="Auto-growing Textarea"
            autoResize
            showCount
            value={autoResizeValue}
            onChange={(e) => setAutoResizeValue(e.target.value)}
            helperText="This textarea expands as you type"
          />
        </div>
      </section>

      {/* Validation States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Validation States</h2>
        <div className="grid gap-4 max-w-md">
          <Textarea 
            placeholder="Normal state" 
            label="Normal"
          />
          <Textarea 
            placeholder="Error state" 
            label="Comment"
            value="This comment is inappropriate"
            error="This content violates our community guidelines"
          />
          <Textarea 
            placeholder="Success state" 
            label="Review"
            variant="success"
            value="Great product! Highly recommended."
            helperText="Thank you for your feedback!"
          />
        </div>
      </section>

      {/* Disabled State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Disabled State</h2>
        <div className="grid gap-4 max-w-md">
          <Textarea 
            placeholder="Disabled textarea" 
            label="Disabled"
            disabled
          />
          <Textarea 
            value="Cannot edit this content"
            label="Read-only"
            disabled
          />
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Real-world Examples</h2>

        {/* Note Taking */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Quick Note</h3>
          <Textarea 
            placeholder="Write your note here..." 
            label="Note"
            showCount
            maxLength={500}
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
            textareaSize="lg"
          />
          <Button className="w-full">Save Note</Button>
        </div>

        {/* Social Media Post */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Create Post</h3>
          <Textarea 
            placeholder="What's on your mind?" 
            label="Post Content"
            showCount
            maxLength={280}
            autoResize
            helperText="Share your thoughts with the world"
          />
          <Button className="w-full">Post</Button>
        </div>

        {/* Bio / About */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Profile Bio</h3>
          <Textarea 
            placeholder="Tell us about yourself..." 
            label="Bio"
            showCount
            maxLength={200}
            value={bioValue}
            onChange={(e) => setBioValue(e.target.value)}
            helperText="This will be shown on your profile"
            textareaSize="lg"
          />
          <Button className="w-full">Update Bio</Button>
        </div>

        {/* Feedback Form */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Send Feedback</h3>
          <Textarea 
            placeholder="What can we improve?" 
            label="Your Feedback"
            showCount
            maxLength={1000}
            textareaSize="lg"
            helperText="We read every piece of feedback"
          />
          <Button className="w-full">Submit Feedback</Button>
        </div>

        {/* Comment Section */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Leave a Comment</h3>
          <Textarea 
            placeholder="Share your thoughts..." 
            label="Comment"
            showCount
            maxLength={500}
            autoResize
          />
          <Button className="w-full">Post Comment</Button>
        </div>

        {/* Journal Entry */}
        <div className="max-w-2xl border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Journal Entry</h3>
          <Textarea 
            placeholder="Dear diary..." 
            label="Today's Entry"
            showCount
            textareaSize="lg"
            className="min-h-[300px]"
            helperText="Write freely without limits"
          />
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">Save Draft</Button>
            <Button className="flex-1">Save Entry</Button>
          </div>
        </div>

        {/* Task Description */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Task Details</h3>
          <Textarea 
            placeholder="Describe the task..." 
            label="Description"
            showCount
            maxLength={500}
            autoResize
            helperText="Provide clear instructions"
          />
          <Button className="w-full">Create Task</Button>
        </div>

        {/* Product Review */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Write a Review</h3>
          <Textarea 
            placeholder="Share your experience..." 
            label="Review"
            showCount
            maxLength={1000}
            textareaSize="lg"
            helperText="Help others make informed decisions"
          />
          <Button className="w-full">Submit Review</Button>
        </div>
      </section>
    </div>
  )
}
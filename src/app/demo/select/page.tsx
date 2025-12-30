"use client"

import { Select, type SelectOption } from '@/components/core/select'
import { useState } from 'react'
import { Button } from '@/components/core/button'
import { ThemeToggle } from '@/components/theme-toggle'

// Sample data
const countries: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
  { value: 'in', label: 'India' },
  { value: 'br', label: 'Brazil' },
]

const categories: SelectOption[] = [
  { value: 'tech', label: 'Technology' },
  { value: 'design', label: 'Design' },
  { value: 'business', label: 'Business' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'finance', label: 'Finance' },
]

const priorities: SelectOption[] = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' },
  { value: 'urgent', label: 'Urgent' },
]

const fruits: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'mango', label: 'Mango' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'watermelon', label: 'Watermelon' },
]

const languages: SelectOption[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ar', label: 'Arabic' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ru', label: 'Russian' },
  { value: 'hi', label: 'Hindi' },
]

export default function SelectDemo() {
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPriority, setSelectedPriority] = useState("medium")

  return (
    <div className="container mx-auto p-8 space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Select Component</h1>
          <p className="text-muted-foreground">
            Dropdown select with search and multi-select support
          </p>
        </div>
        <ThemeToggle />
      </div>

      {/* Basic Select */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Select</h2>
        <div className="grid gap-4 max-w-md">
          <Select 
            options={categories}
            placeholder="Select a category"
          />
          <Select 
            options={categories}
            placeholder="With label"
            label="Category"
          />
          <Select 
            options={categories}
            placeholder="With helper text"
            label="Category"
            helperText="Choose a category for your content"
          />
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sizes</h2>
        <div className="grid gap-4 max-w-md">
          <Select 
            options={categories}
            selectSize="sm"
            placeholder="Small select"
            label="Small"
          />
          <Select 
            options={categories}
            selectSize="default"
            placeholder="Default select"
            label="Default"
          />
          <Select 
            options={categories}
            selectSize="lg"
            placeholder="Large select"
            label="Large"
          />
        </div>
      </section>

      {/* With Search */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Searchable Select</h2>
        <div className="grid gap-4 max-w-md">
          <Select 
            options={countries}
            placeholder="Search countries..."
            label="Country"
            searchable
            helperText="Type to search"
          />
          <Select 
            options={languages}
            placeholder="Search languages..."
            label="Preferred Language"
            searchable
          />
        </div>
      </section>

      {/* Multi-select */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Multi-select</h2>
        <div className="grid gap-4 max-w-md">
          <Select 
            options={categories}
            placeholder="Select categories"
            label="Categories"
            multiple
            value={selectedCategories}
            onChange={(value) => setSelectedCategories(value as string[])}
          />
          <Select 
            options={fruits}
            placeholder="Select fruits"
            label="Favorite Fruits"
            multiple
            searchable
            helperText="Select multiple options"
          />
        </div>
      </section>

      {/* Clearable */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Clearable Select</h2>
        <div className="grid gap-4 max-w-md">
          <Select 
            options={countries}
            placeholder="Select country"
            label="Country"
            clearable
            value={selectedCountry}
            onChange={(value) => setSelectedCountry(value as string)}
          />
          <p className="text-sm text-muted-foreground">
            Selected: {selectedCountry || "None"}
          </p>
        </div>
      </section>

      {/* Controlled Select */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Controlled Select</h2>
        <div className="grid gap-4 max-w-md">
          <Select 
            options={priorities}
            placeholder="Select priority"
            label="Task Priority"
            value={selectedPriority}
            onChange={(value) => setSelectedPriority(value as string)}
          />
          <p className="text-sm text-muted-foreground">
            Current priority: <strong>{selectedPriority}</strong>
          </p>
          <div className="flex gap-2">
            <Button 
              size="sm"
              variant="outline"
              onClick={() => setSelectedPriority('low')}
            >
              Set Low
            </Button>
            <Button 
              size="sm"
              variant="outline"
              onClick={() => setSelectedPriority('high')}
            >
              Set High
            </Button>
          </div>
        </div>
      </section>

      {/* Validation States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Validation States</h2>
        <div className="grid gap-4 max-w-md">
          <Select 
            options={categories}
            placeholder="Normal state"
            label="Normal"
          />
          <Select 
            options={categories}
            placeholder="Select category"
            label="Category"
            error="Please select a valid category"
          />
          <Select 
            options={categories}
            placeholder="Success state"
            label="Category"
            variant="success"
            value="tech"
            helperText="Selection confirmed!"
          />
        </div>
      </section>

      {/* Disabled State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Disabled State</h2>
        <div className="grid gap-4 max-w-md">
          <Select 
            options={categories}
            placeholder="Disabled select"
            label="Disabled"
            disabled
          />
          <Select 
            options={categories}
            value="tech"
            label="Disabled with value"
            disabled
          />
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Real-world Examples</h2>

        {/* User Profile Form */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">User Profile</h3>
          <Select 
            options={countries}
            placeholder="Select your country"
            label="Country"
            searchable
            clearable
          />
          <Select 
            options={languages}
            placeholder="Select language"
            label="Preferred Language"
            searchable
            defaultValue="en"
          />
          <Button className="w-full">Save Profile</Button>
        </div>

        {/* Task Creation */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Create Task</h3>
          <Select 
            options={priorities}
            placeholder="Select priority"
            label="Priority"
            defaultValue="medium"
          />
          <Select 
            options={categories}
            placeholder="Select categories"
            label="Categories"
            multiple
            searchable
            helperText="Add relevant tags"
          />
          <Button className="w-full">Create Task</Button>
        </div>

        {/* Filter Panel */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Filter Content</h3>
          <Select 
            options={categories}
            placeholder="All categories"
            label="Category"
            clearable
          />
          <Select 
            options={countries}
            placeholder="All countries"
            label="Country"
            searchable
            clearable
          />
          <Select 
            options={languages}
            placeholder="Any language"
            label="Language"
            multiple
            searchable
          />
          <Button className="w-full">Apply Filters</Button>
        </div>

        {/* Settings */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">App Settings</h3>
          <Select 
            options={languages}
            placeholder="Select language"
            label="Display Language"
            defaultValue="en"
            helperText="Choose your preferred language"
          />
          <Select 
            options={[
              { value: 'system', label: 'System Default' },
              { value: 'light', label: 'Light Mode' },
              { value: 'dark', label: 'Dark Mode' },
            ]}
            placeholder="Select theme"
            label="Theme"
            defaultValue="system"
          />
          <Button className="w-full">Save Settings</Button>
        </div>

        {/* Job Application */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Job Application</h3>
          <Select 
            options={[
              { value: 'fulltime', label: 'Full-time' },
              { value: 'parttime', label: 'Part-time' },
              { value: 'contract', label: 'Contract' },
              { value: 'internship', label: 'Internship' },
            ]}
            placeholder="Select employment type"
            label="Employment Type"
          />
          <Select 
            options={categories}
            placeholder="Select your skills"
            label="Skills"
            multiple
            searchable
            helperText="Select all that apply"
          />
          <Select 
            options={[
              { value: 'entry', label: 'Entry Level' },
              { value: 'mid', label: 'Mid Level' },
              { value: 'senior', label: 'Senior Level' },
              { value: 'lead', label: 'Lead' },
            ]}
            placeholder="Select experience level"
            label="Experience Level"
          />
          <Button className="w-full">Submit Application</Button>
        </div>

        {/* E-commerce Filter */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Product Filters</h3>
          <Select 
            options={[
              { value: 'electronics', label: 'Electronics' },
              { value: 'clothing', label: 'Clothing' },
              { value: 'books', label: 'Books' },
              { value: 'home', label: 'Home & Garden' },
              { value: 'sports', label: 'Sports' },
            ]}
            placeholder="All categories"
            label="Category"
            multiple
            searchable
          />
          <Select 
            options={[
              { value: 'low-high', label: 'Price: Low to High' },
              { value: 'high-low', label: 'Price: High to Low' },
              { value: 'newest', label: 'Newest First' },
              { value: 'popular', label: 'Most Popular' },
            ]}
            placeholder="Sort by"
            label="Sort"
            defaultValue="popular"
          />
          <Button className="w-full">Apply Filters</Button>
        </div>
      </section>
    </div>
  )
}

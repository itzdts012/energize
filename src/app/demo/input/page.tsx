"use client"
import { Input } from '@/components/core/input'
import { useState } from 'react'
import { 
  Search, 
  Mail, 
  Lock, 
  User, 
  Phone,
  DollarSign,
  Calendar,
  Clock,
  MapPin,
  Link as LinkIcon,
  AtSign,
  Hash
} from 'lucide-react'
import { Button } from '@/components/core/button'

export default function InputDemo() {
  const [searchValue, setSearchValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [nameValue, setNameValue] = useState("")
  const [phoneValue, setPhoneValue] = useState("")

  return (
    <div className="container mx-auto p-8 space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-2">Input Component</h1>
        <p className="text-muted-foreground">
          Flexible input component with icons, validation, and states
        </p>
      </div>

      {/* Basic Inputs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Inputs</h2>
        <div className="grid gap-4 max-w-md">
          <Input placeholder="Default input" />
          <Input placeholder="With label" label="Full Name" />
          <Input 
            placeholder="With helper text" 
            label="Email"
            helperText="We'll never share your email with anyone else."
          />
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sizes</h2>
        <div className="grid gap-4 max-w-md">
          <Input inputSize="sm" placeholder="Small input" label="Small" />
          <Input inputSize="default" placeholder="Default input" label="Default" />
          <Input inputSize="lg" placeholder="Large input" label="Large" />
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">With Icons</h2>
        <div className="grid gap-4 max-w-md">
          <Input 
            placeholder="Search..." 
            label="Search"
            leftIcon={<Search className="h-4 w-4" />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            clearable
            onClear={() => setSearchValue("")}
          />
          <Input 
            type="email"
            placeholder="your@email.com" 
            label="Email Address"
            leftIcon={<Mail className="h-4 w-4" />}
          />
          <Input 
            placeholder="John Doe" 
            label="Username"
            leftIcon={<User className="h-4 w-4" />}
          />
          <Input 
            type="tel"
            placeholder="(555) 123-4567" 
            label="Phone Number"
            leftIcon={<Phone className="h-4 w-4" />}
          />
        </div>
      </section>

      {/* Password Input */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Password Input</h2>
        <div className="grid gap-4 max-w-md">
          <Input 
            type="password"
            placeholder="Enter password" 
            label="Password"
            leftIcon={<Lock className="h-4 w-4" />}
            showPasswordToggle
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <Input 
            type="password"
            placeholder="Without toggle" 
            label="Password (No Toggle)"
            leftIcon={<Lock className="h-4 w-4" />}
          />
        </div>
      </section>

      {/* Validation States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Validation States</h2>
        <div className="grid gap-4 max-w-md">
          <Input 
            placeholder="Normal state" 
            label="Normal"
          />
          <Input 
            placeholder="Error state" 
            label="Email"
            value="invalid-email"
            error="Please enter a valid email address"
          />
          <Input 
            placeholder="Success state" 
            label="Username"
            variant="success"
            value="johndoe"
            helperText="Username is available!"
          />
        </div>
      </section>

      {/* Clearable Input */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Clearable Input</h2>
        <div className="grid gap-4 max-w-md">
          <Input 
            placeholder="Start typing..." 
            label="Task Name"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            clearable
            onClear={() => setNameValue("")}
          />
        </div>
      </section>

      {/* Different Input Types */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Input Types</h2>
        <div className="grid gap-4 max-w-md">
          <Input 
            type="text"
            placeholder="Text input" 
            label="Text"
          />
          <Input 
            type="email"
            placeholder="email@example.com" 
            label="Email"
            leftIcon={<AtSign className="h-4 w-4" />}
          />
          <Input 
            type="number"
            placeholder="0" 
            label="Number"
            leftIcon={<Hash className="h-4 w-4" />}
          />
          <Input 
            type="tel"
            placeholder="123-456-7890" 
            label="Telephone"
            leftIcon={<Phone className="h-4 w-4" />}
          />
          <Input 
            type="url"
            placeholder="https://example.com" 
            label="URL"
            leftIcon={<LinkIcon className="h-4 w-4" />}
          />
          <Input 
            type="date"
            label="Date"
            leftIcon={<Calendar className="h-4 w-4" />}
          />
          <Input 
            type="time"
            label="Time"
            leftIcon={<Clock className="h-4 w-4" />}
          />
        </div>
      </section>

      {/* Disabled State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Disabled State</h2>
        <div className="grid gap-4 max-w-md">
          <Input 
            placeholder="Disabled input" 
            label="Disabled"
            disabled
          />
          <Input 
            placeholder="Disabled with value" 
            label="Disabled with Value"
            value="Cannot edit this"
            disabled
          />
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Real-world Examples</h2>

        {/* Login Form */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Login Form</h3>
          <Input 
            type="email"
            placeholder="your@email.com" 
            label="Email"
            leftIcon={<Mail className="h-4 w-4" />}
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <Input 
            type="password"
            placeholder="Enter your password" 
            label="Password"
            leftIcon={<Lock className="h-4 w-4" />}
            showPasswordToggle
          />
          <Button className="w-full">Sign In</Button>
        </div>

        {/* Task Creation Form */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Create New Task</h3>
          <Input 
            placeholder="Task name" 
            label="Task Name"
            clearable
          />
          <Input 
            type="date"
            label="Due Date"
            leftIcon={<Calendar className="h-4 w-4" />}
          />
          <Input 
            type="time"
            label="Time"
            leftIcon={<Clock className="h-4 w-4" />}
          />
          <Input 
            placeholder="Add location" 
            label="Location (Optional)"
            leftIcon={<MapPin className="h-4 w-4" />}
          />
          <Button className="w-full">Create Task</Button>
        </div>

        {/* Expense Entry */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Log Expense</h3>
          <Input 
            type="number"
            placeholder="0.00" 
            label="Amount"
            leftIcon={<DollarSign className="h-4 w-4" />}
          />
          <Input 
            placeholder="e.g., Groceries, Gas, Coffee" 
            label="Description"
          />
          <Input 
            type="date"
            label="Date"
            leftIcon={<Calendar className="h-4 w-4" />}
          />
          <Button className="w-full">Add Expense</Button>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl">
          <h3 className="text-lg font-semibold mb-4">Global Search</h3>
          <Input 
            inputSize="lg"
            placeholder="Search tasks, events, notes..." 
            leftIcon={<Search className="h-5 w-5" />}
            clearable
          />
        </div>
      </section>

      {/* Form with Validation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Form with Validation</h2>
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Sign Up</h3>
          <Input 
            placeholder="John Doe" 
            label="Full Name"
            leftIcon={<User className="h-4 w-4" />}
          />
          <Input 
            type="email"
            placeholder="your@email.com" 
            label="Email"
            leftIcon={<Mail className="h-4 w-4" />}
            error="This email is already taken"
          />
          <Input 
            type="password"
            placeholder="Min 8 characters" 
            label="Password"
            leftIcon={<Lock className="h-4 w-4" />}
            showPasswordToggle
            helperText="Must contain at least 8 characters"
          />
          <Input 
            type="password"
            placeholder="Re-enter password" 
            label="Confirm Password"
            leftIcon={<Lock className="h-4 w-4" />}
            showPasswordToggle
            variant="success"
            helperText="Passwords match!"
          />
          <Button className="w-full">Create Account</Button>
        </div>
      </section>
    </div>
  )
}
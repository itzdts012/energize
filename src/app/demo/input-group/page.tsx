"use client"

import { InputGroup } from '@/components/core/input-group'
import { useState } from 'react'
import { 
  DollarSign, 
  Percent,
  AtSign,
  Search,
  Link as LinkIcon,
  Globe,
  Tag,
  Hash,
  CreditCard,
  Calendar,
  Clock
} from 'lucide-react'
import { Button } from '@/components/core/button'
import { ThemeToggle } from '@/components/theme-toggle'
export default function InputGroupDemo() {
  const [priceValue, setPriceValue] = useState("")
  const [urlValue, setUrlValue] = useState("")
  const [emailValue, setEmailValue] = useState("")

  return (
    <div className="container mx-auto p-8 space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-2">InputGroup Component</h1>
        <p className="text-muted-foreground">
          Input with prefix/suffix text or icons for better context
        </p>
        <ThemeToggle />
      </div>

      {/* Text Prefix */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Text Prefix (Left Addon)</h2>
        <div className="grid gap-4 max-w-md">
          <InputGroup 
            leftAddon="https://"
            placeholder="example.com" 
            label="Website URL"
          />
          <InputGroup 
            leftAddon="@"
            placeholder="username" 
            label="Twitter Handle"
          />
          <InputGroup 
            leftAddon="$"
            type="number"
            placeholder="0.00" 
            label="Price"
          />
        </div>
      </section>

      {/* Text Suffix */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Text Suffix (Right Addon)</h2>
        <div className="grid gap-4 max-w-md">
          <InputGroup 
            rightAddon=".com"
            placeholder="mywebsite" 
            label="Domain Name"
          />
          <InputGroup 
            rightAddon="kg"
            type="number"
            placeholder="0" 
            label="Weight"
          />
          <InputGroup 
            rightAddon="%"
            type="number"
            placeholder="0" 
            label="Discount"
          />
          <InputGroup 
            rightAddon="USD"
            type="number"
            placeholder="0.00" 
            label="Amount"
          />
        </div>
      </section>

      {/* Icon Prefix */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Icon Prefix (Left Icon)</h2>
        <div className="grid gap-4 max-w-md">
          <InputGroup 
            leftIcon={<DollarSign className="h-4 w-4" />}
            type="number"
            placeholder="0.00" 
            label="Budget"
          />
          <InputGroup 
            leftIcon={<AtSign className="h-4 w-4" />}
            type="email"
            placeholder="your@email.com" 
            label="Email Address"
          />
          <InputGroup 
            leftIcon={<Search className="h-4 w-4" />}
            placeholder="Search..." 
            label="Search"
          />
          <InputGroup 
            leftIcon={<Hash className="h-4 w-4" />}
            placeholder="trending-topic" 
            label="Hashtag"
          />
        </div>
      </section>

      {/* Icon Suffix */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Icon Suffix (Right Icon)</h2>
        <div className="grid gap-4 max-w-md">
          <InputGroup 
            rightIcon={<Globe className="h-4 w-4" />}
            placeholder="example.com" 
            label="Website"
          />
          <InputGroup 
            rightIcon={<LinkIcon className="h-4 w-4" />}
            placeholder="https://..." 
            label="URL"
          />
          <InputGroup 
            rightIcon={<Tag className="h-4 w-4" />}
            placeholder="category-name" 
            label="Category"
          />
        </div>
      </section>

      {/* Both Prefix and Suffix */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Left Addon + Right Addon</h2>
        <div className="grid gap-4 max-w-md">
          <InputGroup 
            leftAddon="$"
            rightAddon="USD"
            type="number"
            placeholder="0.00" 
            label="Amount"
          />
          <InputGroup 
            leftAddon="https://"
            rightAddon=".com"
            placeholder="mysite" 
            label="Domain"
          />
          <InputGroup 
            leftIcon={<DollarSign className="h-4 w-4" />}
            rightAddon="per month"
            type="number"
            placeholder="0.00" 
            label="Monthly Budget"
          />
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sizes</h2>
        <div className="grid gap-4 max-w-md">
          <InputGroup 
            inputSize="sm"
            leftAddon="$"
            type="number"
            placeholder="0.00" 
            label="Small"
          />
          <InputGroup 
            inputSize="default"
            leftAddon="$"
            type="number"
            placeholder="0.00" 
            label="Default"
          />
          <InputGroup 
            inputSize="lg"
            leftAddon="$"
            type="number"
            placeholder="0.00" 
            label="Large"
          />
        </div>
      </section>

      {/* Validation States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Validation States</h2>
        <div className="grid gap-4 max-w-md">
          <InputGroup 
            leftAddon="https://"
            placeholder="example.com" 
            label="Normal"
          />
          <InputGroup 
            leftAddon="$"
            type="number"
            value="1000000"
            label="Amount"
            error="Amount exceeds maximum limit"
          />
          <InputGroup 
            leftIcon={<AtSign className="h-4 w-4" />}
            value="john.doe@example.com"
            label="Email"
            variant="success"
            helperText="Email is available!"
          />
        </div>
      </section>

      {/* Disabled State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Disabled State</h2>
        <div className="grid gap-4 max-w-md">
          <InputGroup 
            leftAddon="$"
            value="100.00"
            label="Disabled Input"
            disabled
          />
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Real-world Examples</h2>

        {/* Price/Budget Input */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Expense Entry</h3>
          <InputGroup 
            leftIcon={<DollarSign className="h-4 w-4" />}
            rightAddon="USD"
            type="number"
            placeholder="0.00" 
            label="Amount"
            value={priceValue}
            onChange={(e) => setPriceValue(e.target.value)}
          />
          <InputGroup 
            leftAddon="Category:"
            placeholder="e.g., Groceries, Gas" 
            label="Expense Category"
          />
          <InputGroup 
            leftIcon={<Calendar className="h-4 w-4" />}
            type="date"
            label="Date"
          />
          <Button className="w-full">Add Expense</Button>
        </div>

        {/* Social Media */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Social Media Links</h3>
          <InputGroup 
            leftAddon="twitter.com/"
            placeholder="username" 
            label="Twitter"
          />
          <InputGroup 
            leftAddon="github.com/"
            placeholder="username" 
            label="GitHub"
          />
          <InputGroup 
            leftAddon="linkedin.com/in/"
            placeholder="username" 
            label="LinkedIn"
          />
          <Button className="w-full">Save Profile</Button>
        </div>

        {/* Website/Domain */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Website Settings</h3>
          <InputGroup 
            leftAddon="https://"
            rightAddon=".com"
            placeholder="yoursite" 
            label="Domain Name"
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
            helperText="Your custom domain"
          />
          <InputGroup 
            leftIcon={<AtSign className="h-4 w-4" />}
            placeholder="admin@yoursite.com" 
            label="Admin Email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <Button className="w-full">Update Settings</Button>
        </div>

        {/* Payment Information */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Payment Details</h3>
          <InputGroup 
            leftIcon={<CreditCard className="h-4 w-4" />}
            placeholder="4242 4242 4242 4242" 
            label="Card Number"
          />
          <div className="grid grid-cols-2 gap-4">
            <InputGroup 
              leftIcon={<Calendar className="h-4 w-4" />}
              placeholder="MM/YY" 
              label="Expiry"
            />
            <InputGroup 
              leftAddon="CVV"
              placeholder="123" 
              label="Security Code"
              type="password"
            />
          </div>
          <Button className="w-full">Add Payment Method</Button>
        </div>

        {/* Discount/Percentage */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Create Discount Code</h3>
          <InputGroup 
            leftAddon="CODE:"
            placeholder="SUMMER2024" 
            label="Discount Code"
          />
          <InputGroup 
            leftIcon={<Percent className="h-4 w-4" />}
            rightAddon="%"
            type="number"
            placeholder="10" 
            label="Discount Percentage"
          />
          <InputGroup 
            leftIcon={<Clock className="h-4 w-4" />}
            type="date"
            label="Valid Until"
          />
          <Button className="w-full">Create Discount</Button>
        </div>

        {/* Currency Converter */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Currency Converter</h3>
          <InputGroup 
            leftAddon="$"
            rightAddon="USD"
            type="number"
            placeholder="0.00" 
            label="From"
          />
          <div className="text-center text-muted-foreground">↓</div>
          <InputGroup 
            leftAddon="€"
            rightAddon="EUR"
            type="number"
            placeholder="0.00" 
            label="To"
          />
          <Button className="w-full">Convert</Button>
        </div>
      </section>
    </div>
  )
}

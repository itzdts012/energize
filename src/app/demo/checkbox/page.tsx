"use client"

import { Checkbox, CheckboxGroup } from '@/components/core/checkbox'
import { useState } from 'react'
import { Button } from '@/components/core/button'
import { ThemeToggle } from '@/components/theme-toggle'

export default function CheckboxDemo() {
  const [termsChecked, setTermsChecked] = useState(false)
  const [notificationsChecked, setNotificationsChecked] = useState(true)
  const [allFeaturesChecked, setAllFeaturesChecked] = useState(false)
  const [validationChecked, setValidationChecked] = useState(false)


  // Basic states
  const [basicChecked1, setBasicChecked1] = useState(false)
  const [basicChecked2, setBasicChecked2] = useState(false)
  const [basicChecked3, setBasicChecked3] = useState(false)

  // Size states
  const [sizeSmall, setSizeSmall] = useState(false)
  const [sizeDefault, setSizeDefault] = useState(false)
  const [sizeLarge, setSizeLarge] = useState(false)

  // Variant states
  const [variantDefault, setVariantDefault] = useState(true)
  const [variantError, setVariantError] = useState(true)
  const [variantSuccess, setVariantSuccess] = useState(true)

  // State checkboxes
  const [stateUnchecked, setStateUnchecked] = useState(false)
  const [stateChecked, setStateChecked] = useState(true)
  const [stateIndeterminate, setStateIndeterminate] = useState(false)

  // Features group
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [pushNotifs, setPushNotifs] = useState(false)
  const [smsNotifs, setSmsNotifs] = useState(false)

  // Topics group
  const [topics, setTopics] = useState({
    tech: true,
    design: false,
    business: true,
    marketing: false,
  })

  // Settings
  const [newsletter, setNewsletter] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [twoFactor, setTwoFactor] = useState(true)

  // Tasks
  const [task1, setTask1] = useState(true)
  const [task2, setTask2] = useState(false)
  const [task3, setTask3] = useState(false)
  const [task4, setTask4] = useState(false)

  // Features
  const [darkMode, setDarkMode] = useState(false)
  const [aiAssistant, setAiAssistant] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  // Terms
  const [termsOfService, setTermsOfService] = useState(false)
  const [privacyPolicy, setPrivacyPolicy] = useState(false)
  const [marketingEmails, setMarketingEmails] = useState(false)

  // Permissions
  const [readAccess, setReadAccess] = useState(true)
  const [writeAccess, setWriteAccess] = useState(true)
  const [deleteAccess, setDeleteAccess] = useState(false)
  const [manageUsers, setManageUsers] = useState(false)

  const allTopicsChecked = Object.values(topics).every(Boolean)
  const someTopicsChecked = Object.values(topics).some(Boolean) && !allTopicsChecked

  const handleAllTopicsChange = (checked: boolean) => {
    setTopics({
      tech: checked,
      design: checked,
      business: checked,
      marketing: checked,
    })
  }

  return (
    <div className="container mx-auto p-8 space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Checkbox Component</h1>
          <p className="text-muted-foreground">
            Single and group checkboxes with labels and descriptions
          </p>
        </div>
        <ThemeToggle />
      </div>

      {/* Basic Checkboxes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Checkboxes</h2>
        <div className="grid gap-4 max-w-md">
          <Checkbox 
            checked={basicChecked1}
            onCheckedChange={setBasicChecked1}
          />
          <Checkbox 
            label="Accept terms and conditions"
            checked={basicChecked2}
            onCheckedChange={setBasicChecked2}
          />
          <Checkbox 
            label="Enable notifications"
            description="Get notified about important updates"
            checked={basicChecked3}
            onCheckedChange={setBasicChecked3}
          />
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sizes</h2>
        <div className="grid gap-4 max-w-md">
          <Checkbox 
            checkboxSize="sm"
            label="Small checkbox"
            checked={sizeSmall}
            onCheckedChange={setSizeSmall}
          />
          <Checkbox 
            checkboxSize="default"
            label="Default checkbox"
            checked={sizeDefault}
            onCheckedChange={setSizeDefault}
          />
          <Checkbox 
            checkboxSize="lg"
            label="Large checkbox"
            checked={sizeLarge}
            onCheckedChange={setSizeLarge}
          />
        </div>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Variants</h2>
        <div className="grid gap-4 max-w-md">
          <Checkbox 
            variant="default"
            checked={variantDefault}
            onCheckedChange={setVariantDefault}
            label="Default variant"
          />
          <Checkbox 
            variant="error"
            checked={variantError}
            onCheckedChange={setVariantError}
            label="Error variant"
          />
          <Checkbox 
            variant="success"
            checked={variantSuccess}
            onCheckedChange={setVariantSuccess}
            label="Success variant"
          />
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">States</h2>
        <div className="grid gap-4 max-w-md">
          <Checkbox 
            label="Unchecked"
            checked={stateUnchecked}
            onCheckedChange={setStateUnchecked}
          />
          <Checkbox 
            checked={stateChecked}
            onCheckedChange={setStateChecked}
            label="Checked"
          />
          <Checkbox 
            indeterminate
            checked={stateIndeterminate}
            onCheckedChange={setStateIndeterminate}
            label="Indeterminate"
          />
          <Checkbox disabled label="Disabled" />
          <Checkbox checked disabled label="Checked + Disabled" />
        </div>
      </section>

      {/* Controlled Checkbox */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Controlled Checkbox</h2>
        <div className="grid gap-4 max-w-md">
          <Checkbox 
            checked={termsChecked}
            onCheckedChange={setTermsChecked}
            label="I agree to the terms and conditions"
            description="You must agree to continue"
          />
          <p className="text-sm text-muted-foreground">
            Status: {termsChecked ? "Agreed ✓" : "Not agreed"}
          </p>
          <Button 
            onClick={() => setTermsChecked(!termsChecked)}
            variant="outline"
          >
            Toggle Agreement
          </Button>
        </div>
      </section>

      {/* Checkbox with Error */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Validation</h2>
        <div className="grid gap-4 max-w-md">
          <Checkbox 
            checked={validationChecked}
            onCheckedChange={setValidationChecked}
            label="I accept the terms and conditions"
            error="You must accept the terms to continue"
          />
        </div>
      </section>


      {/* Checkbox Group */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Checkbox Group</h2>
        <div className="max-w-md">
          <CheckboxGroup 
            label="Notification Preferences"
            description="Choose how you want to be notified"
          >
            <Checkbox 
              checked={emailNotifs}
              onCheckedChange={setEmailNotifs}
              label="Email notifications"
              description="Receive updates via email"
            />
            <Checkbox 
              checked={pushNotifs}
              onCheckedChange={setPushNotifs}
              label="Push notifications"
              description="Get push notifications on your device"
            />
            <Checkbox 
              checked={smsNotifs}
              onCheckedChange={setSmsNotifs}
              label="SMS notifications"
              description="Receive text messages"
            />
          </CheckboxGroup>
        </div>
      </section>

      {/* Select All Pattern */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Select All Pattern</h2>
        <div className="max-w-md">
          <CheckboxGroup 
            label="Interests"
            description="Select topics you're interested in"
          >
            <Checkbox 
              checked={allTopicsChecked}
              indeterminate={someTopicsChecked}
              onCheckedChange={handleAllTopicsChange}
              label="Select All"
            />
            <div className="border-t pt-2 space-y-2">
              <Checkbox 
                checked={topics.tech}
                onCheckedChange={(checked) => setTopics(prev => ({ ...prev, tech: checked }))}
                label="Technology"
              />
              <Checkbox 
                checked={topics.design}
                onCheckedChange={(checked) => setTopics(prev => ({ ...prev, design: checked }))}
                label="Design"
              />
              <Checkbox 
                checked={topics.business}
                onCheckedChange={(checked) => setTopics(prev => ({ ...prev, business: checked }))}
                label="Business"
              />
              <Checkbox 
                checked={topics.marketing}
                onCheckedChange={(checked) => setTopics(prev => ({ ...prev, marketing: checked }))}
                label="Marketing"
              />
            </div>
          </CheckboxGroup>
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Real-world Examples</h2>

        {/* Settings Form */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Account Settings</h3>
          <CheckboxGroup>
            <Checkbox 
              checked={notificationsChecked}
              onCheckedChange={setNotificationsChecked}
              label="Email notifications"
              description="Receive emails about your account activity"
            />
            <Checkbox 
              checked={newsletter}
              onCheckedChange={setNewsletter}
              label="Newsletter subscription"
              description="Get weekly updates and tips"
            />
            <Checkbox 
              checked={marketing}
              onCheckedChange={setMarketing}
              label="Marketing emails"
              description="Receive promotional content and offers"
            />
            <Checkbox 
              checked={twoFactor}
              onCheckedChange={setTwoFactor}
              label="Two-factor authentication"
              description="Add an extra layer of security"
              variant="success"
            />
          </CheckboxGroup>
          <Button className="w-full">Save Settings</Button>
        </div>

        {/* Task List */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Today's Tasks</h3>
          <CheckboxGroup>
            <Checkbox 
              checked={task1}
              onCheckedChange={setTask1}
              label="Review pull requests"
              description="Check team's code submissions"
            />
            <Checkbox 
              checked={task2}
              onCheckedChange={setTask2}
              label="Update documentation"
              description="Add new API endpoints"
            />
            <Checkbox 
              checked={task3}
              onCheckedChange={setTask3}
              label="Team meeting at 2 PM"
              description="Discuss Q1 roadmap"
            />
            <Checkbox 
              checked={task4}
              onCheckedChange={setTask4}
              label="Send weekly report"
              description="Due by end of day"
            />
          </CheckboxGroup>
        </div>

        {/* Feature Toggles */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Feature Flags</h3>
          <CheckboxGroup 
            label="Experimental Features"
            description="Enable beta features (may be unstable)"
          >
            <Checkbox 
              checked={darkMode}
              onCheckedChange={setDarkMode}
              label="Dark mode"
              description="Switch between light and dark themes"
            />
            <Checkbox 
              checked={aiAssistant}
              onCheckedChange={setAiAssistant}
              label="AI Assistant"
              description="Get intelligent suggestions"
            />
            <Checkbox 
              checked={analytics}
              onCheckedChange={setAnalytics}
              label="Advanced Analytics"
              description="View detailed performance metrics"
            />
          </CheckboxGroup>
          <Button className="w-full">Apply Changes</Button>
        </div>

        {/* Terms Agreement */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Sign Up</h3>
          <CheckboxGroup>
            <Checkbox 
              checked={termsOfService}
              onCheckedChange={setTermsOfService}
              label="I agree to the Terms of Service"
              description="Read our terms and conditions"
            />
            <Checkbox 
              checked={privacyPolicy}
              onCheckedChange={setPrivacyPolicy}
              label="I agree to the Privacy Policy"
              description="Learn how we protect your data"
            />
            <Checkbox 
              checked={marketingEmails}
              onCheckedChange={setMarketingEmails}
              label="I want to receive marketing emails"
              description="Optional - you can unsubscribe anytime"
            />
          </CheckboxGroup>
          <Button className="w-full">Create Account</Button>
        </div>

        {/* Permissions */}
        <div className="max-w-md border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">User Permissions</h3>
          <CheckboxGroup 
            label="Admin Access"
            description="Grant administrator privileges"
          >
            <Checkbox 
              checked={readAccess}
              onCheckedChange={setReadAccess}
              label="Read access"
              description="View all content"
            />
            <Checkbox 
              checked={writeAccess}
              onCheckedChange={setWriteAccess}
              label="Write access"
              description="Create and edit content"
            />
            <Checkbox 
              checked={deleteAccess}
              onCheckedChange={setDeleteAccess}
              label="Delete access"
              description="Remove content permanently"
            />
            <Checkbox 
              checked={manageUsers}
              onCheckedChange={setManageUsers}
              label="Manage users"
              description="Add, edit, and remove users"
            />
          </CheckboxGroup>
          <Button className="w-full">Update Permissions</Button>
        </div>
      </section>
    </div>
  )
}
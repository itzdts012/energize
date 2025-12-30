
export default function Page() {
  return (
  
        <div className="flex flex-1 flex-col gap-4 p-4">
          <h1 className="text-3xl font-bold">Energize Dashboard</h1>
          <p>Your life tracker app 🎉</p>
          
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-lg border p-4">
                <h3 className="font-semibold">Card {i}</h3>
                <p className="text-sm text-muted-foreground">
                  Test content
                </p>
              </div>
            ))}
          </div>
        </div>
      
  )
}

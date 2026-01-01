import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-8 max-w-md mx-auto">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Energize
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your complete life tracker
        </p>
        <div className="space-y-4">
          <Link 
            href="/month-view" 
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Open Calendar
          </Link>
          <Link 
            href="/api/events" 
            className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg text-sm"
          >
            Test API (Events)
          </Link>
        </div>
      </div>
    </div>
  );
}

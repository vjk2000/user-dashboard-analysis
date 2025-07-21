import { Provider } from 'react-redux';
import { store } from './app/store';
import { UserStats } from './features/users/UserStats';
import { UserTable } from './features/users/UserTable';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  📊 User Dashboard
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Welcome to your dashboard
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Dashboard Overview
            </h2>
            <p className="text-sm text-gray-600">
              Monitor and manage your users with real-time statistics and data.
            </p>
          </div>
          
          <UserStats />
          <UserTable />
        </main>

        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="text-center text-sm text-gray-500">
              © 2025 User Dashboard. Built with React, Redux Toolkit, and Tailwind CSS.
            </div>
          </div>
        </footer>
      </div>
    </Provider>
  );
}

export default App;
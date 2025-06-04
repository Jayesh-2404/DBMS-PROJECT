'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiDollarSign, FiList, FiLogIn, FiUserPlus, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-gray-200' : 'text-gray-800';
  const bgColor = isDark ? 'bg-gray-800' : 'bg-white';
  const hoverBgColor = isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100';
  const activeBgColor = isDark ? 'bg-gray-700' : 'bg-gray-100';
  const activeTextColor = isDark ? 'text-blue-400' : 'text-blue-600';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`${bgColor} shadow-md transition-colors duration-300 relative`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className={`flex items-center text-xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'} transition-colors`}
          >
            <FiDollarSign className="w-6 h-6 mr-2" />
            <span>PayApp</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {session?.user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/dashboard' ? activeTextColor : textColor
                  } ${hoverBgColor} transition-colors`}
                >
                  <FiHome className="w-5 h-5 mr-2" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  href="/payment" 
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/payment' ? activeTextColor : textColor
                  } ${hoverBgColor} transition-colors`}
                >
                  <FiDollarSign className="w-5 h-5 mr-2" />
                  <span>Payment</span>
                </Link>
                <Link 
                  href="/transaction" 
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/transaction' ? activeTextColor : textColor
                  } ${hoverBgColor} transition-colors`}
                >
                  <FiList className="w-5 h-5 mr-2" />
                  <span>Transactions</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                    isDark ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30' : 'bg-red-100 text-red-600 hover:bg-red-200'
                  } transition-colors`}
                >
                  <FiLogOut className="w-5 h-5 mr-2" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/login" 
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/auth/login' ? activeTextColor : textColor
                  } ${hoverBgColor} transition-colors`}
                >
                  <FiLogIn className="w-5 h-5 mr-2" />
                  <span>Login</span>
                </Link>
                <Link 
                  href="/auth/register" 
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors`}
                >
                  <FiUserPlus className="w-5 h-5 mr-2" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden ${bgColor} border-t ${borderColor}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {session?.user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/dashboard' ? activeTextColor : textColor
                  } ${hoverBgColor} transition-colors`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiHome className="w-5 h-5 mr-2" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  href="/payment" 
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/payment' ? activeTextColor : textColor
                  } ${hoverBgColor} transition-colors`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiDollarSign className="w-5 h-5 mr-2" />
                  <span>Payment</span>
                </Link>
                <Link 
                  href="/transaction" 
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/transaction' ? activeTextColor : textColor
                  } ${hoverBgColor} transition-colors`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiList className="w-5 h-5 mr-2" />
                  <span>Transactions</span>
                </Link>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: '/' });
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isDark ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30' : 'bg-red-100 text-red-600 hover:bg-red-200'
                  } transition-colors`}
                >
                  <FiLogOut className="w-5 h-5 mr-2" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/login" 
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/auth/login' ? activeTextColor : textColor
                  } ${hoverBgColor} transition-colors`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiLogIn className="w-5 h-5 mr-2" />
                  <span>Login</span>
                </Link>
                <Link 
                  href="/auth/register" 
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiUserPlus className="w-5 h-5 mr-2" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lock, User, LogOut, Menu, X } from 'lucide-react';
import { useDashboardUnlock } from '@/hooks/useUltravoxState';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from './AuthModal';
import toast from 'react-hot-toast';

export default function Navigation() {
  const pathname = usePathname();
  const { unlocked: isDashboardUnlocked, mounted: dashboardMounted } = useDashboardUnlock();
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  // Use safe defaults until mounted
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/career-map', label: 'Career Map' },
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: (dashboardMounted && isDashboardUnlocked) ? null : <Lock size={16} />,
      disabled: !dashboardMounted || !isDashboardUnlocked,
    },
  ];

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-primary-600">
              AMA Career
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.disabled ? '#' : link.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    link.disabled
                      ? 'text-gray-400 cursor-not-allowed'
                      : pathname === link.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                  onClick={link.disabled ? (e) => e.preventDefault() : undefined}
                  title={link.disabled ? (!dashboardMounted ? 'Loading...' : 'Complete onboarding to unlock') : undefined}
                >
                  {link.icon && <span>{link.icon}</span>}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Auth Button */}
            <div className="hidden md:flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    {user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-1 bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
                >
                  <User size={16} />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.disabled ? '#' : link.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      link.disabled
                        ? 'text-gray-400 cursor-not-allowed'
                        : pathname === link.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                    onClick={(e) => {
                      if (link.disabled) {
                        e.preventDefault();
                      } else {
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    title={link.disabled ? (!dashboardMounted ? 'Loading...' : 'Complete onboarding to unlock') : undefined}
                  >
                    {link.icon && <span>{link.icon}</span>}
                    <span>{link.label}</span>
                  </Link>
                ))}

                {/* Mobile Auth */}
                <div className="pt-4 border-t border-gray-200">
                  {user ? (
                    <div className="space-y-2">
                      <div className="px-3 py-2 text-sm text-gray-700">
                        {user.email}
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setShowAuthModal(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full bg-primary-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
                    >
                      <User size={16} />
                      <span>Sign In</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}

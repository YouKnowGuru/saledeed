import { Save, HelpCircle, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface HeaderProps {
  onSaveDraft: () => void;
  onHelp: () => void;
  showSave?: boolean;
}

export function Header({ onSaveDraft, onHelp, showSave = true }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-[250] px-6 py-4 bg-[#F4F6F8]/80 dark:bg-[#111216]/80 backdrop-blur-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <a 
          href="https://ourstore.tech" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-lg font-bold text-[#111216] dark:text-white hover:opacity-80 transition-opacity"
        >
          Our Store
        </a>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-white dark:bg-[#1a1a1a] border border-[#E5E7EB] dark:border-[#333] flex items-center justify-center hover:bg-[#F3F4F6] dark:hover:bg-[#222] transition-colors"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-[#111216]" />
            ) : (
              <Sun className="w-5 h-5 text-white" />
            )}
          </button>

          {showSave && (
            <button
              onClick={onSaveDraft}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#1a1a1a] border border-[#E5E7EB] dark:border-[#333] text-sm font-medium text-[#111216] dark:text-white hover:bg-[#F3F4F6] dark:hover:bg-[#222] transition-colors"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save draft</span>
            </button>
          )}
          
          <button
            onClick={onHelp}
            className="w-10 h-10 rounded-full bg-white dark:bg-[#1a1a1a] border border-[#E5E7EB] dark:border-[#333] flex items-center justify-center hover:bg-[#F3F4F6] dark:hover:bg-[#222] transition-colors"
          >
            <HelpCircle className="w-5 h-5 text-[#111216] dark:text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}

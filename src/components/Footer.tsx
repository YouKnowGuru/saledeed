import { Mail, Globe, Shield } from 'lucide-react';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-[#1a1a1a] border-t border-[#E5E7EB] dark:border-[#333]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-[#111216] dark:text-white mb-3">
              Our Store
            </h3>
            <p className="text-sm text-[#6B7280] dark:text-gray-400 leading-relaxed">
              A simple and secure tool for generating legally valid vehicle sale deeds in Bhutan. 
              Privacy-first, no data stored on servers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#111216] dark:text-white mb-3 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://ourstore.tech" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-[#6B7280] dark:text-gray-400 hover:text-[#111216] dark:hover:text-white transition-colors flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  ourstore.tech
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contact@ourstore.tech"
                  className="text-sm text-[#6B7280] dark:text-gray-400 hover:text-[#111216] dark:hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  contact@ourstore.tech
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-[#111216] dark:text-white mb-3 uppercase tracking-wide">
              Legal
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[#6B7280] dark:text-gray-400">
                  Governed by the laws of the Kingdom of Bhutan
                </span>
              </li>
              <li className="text-sm text-[#6B7280] dark:text-gray-400">
                For official use with RCSC/Department of Surface Transport
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#E5E7EB] dark:border-[#333] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6B7280] dark:text-gray-400">
            © {currentYear} Our Store. All rights reserved.
          </p>
          <p className="text-sm text-[#6B7280] dark:text-gray-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Privacy-first • No data leaves your device
          </p>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: ["About Us", "Careers", "Blog", "Press"],
    Product: ["Features", "Pricing", "App", "Security"],
    Resources: ["Documentation", "Community", "Help Center", "Contact"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-16 sm:mt-20 w-full">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-8 mb-8 sm:mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1 col-span-2 sm:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3 sm:mb-4">
              FitnessFreak
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-3">
              Transform your fitness journey with expert guidance and community
              support.
            </p>
            <div className="flex gap-2 sm:gap-4">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500 transition flex-shrink-0"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">
                {category}
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-cyan-400 transition text-xs sm:text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-lg sm:rounded-xl p-4 sm:p-8 border border-slate-700 mb-8 sm:mb-12">
          <div className="max-w-md">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2">
              Stay Updated
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
              Get the latest fitness tips and updates delivered to your inbox.
            </p>
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 bg-slate-800 border border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition"
              />
              <button className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition font-semibold flex-shrink-0">
                <Mail className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            &copy; {currentYear} FitnessFreak. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition"
            >
              Status
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition"
            >
              Sitemap
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

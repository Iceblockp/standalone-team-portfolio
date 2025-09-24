"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Twitter,
  Linkedin,
  Github,
  ArrowUp,
  Sparkles,
  Heart,
  Send,
} from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { IconButton, ModernButton } from "@/components/ui/modern-button";
import { ScrollReveal } from "@/components/animations/motion-components";
import { MinimalFloatingElements } from "@/components/ui/floating-elements";

const footerLinks = {
  services: [
    { label: "Web Development", href: "#solutions" },
    { label: "UI/UX Design", href: "#solutions" },
    { label: "Mobile Development", href: "#solutions" },
    { label: "Consulting", href: "#contact" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Process", href: "#process" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  resources: [
    // { label: "Blog", href: "#" },
    // { label: "Case Studies", href: "#projects" },
    { label: "Tech Stack", href: "#tech" },
    // { label: "Careers", href: "#" },
  ],
};

const contactInfo = {
  address:
    "No.Nga-4/89, 64th St 108 & 109 St, ChanMyathazi Township, Mandalay , Myanmar",
  phone: "+959 408 688 648 , +959 425 743 536, +959 797 961 628  ",
  email: "office@innobytex.com",
};

const socialLinks = [
  //   { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/105864548",
    label: "LinkedIn",
  },
  // { icon: Github, href: "https://github.com/Iceblockp", label: "GitHub" },
];

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-neutral-900 to-primary-950 text-white overflow-hidden">
      {/* Floating elements */}
      <MinimalFloatingElements colors="accent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Newsletter Section */}
        <ScrollReveal type="up">
          <div className="py-16 border-b border-white/10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-accent-cyan" />
                <Typography.Heading size="lg" className="text-white">
                  Stay Updated
                </Typography.Heading>
              </div>
              <Typography.Body
                size="lg"
                className="text-white/80 mb-8 max-w-2xl mx-auto"
              >
                Get the latest insights on digital innovation, design trends,
                and technology updates delivered to your inbox.
              </Typography.Body>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                />
                <ModernButton
                  variant="gradient"
                  icon={<Send className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Subscribe
                </ModernButton>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Link href="/" className="inline-block mb-6 group">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-2xl font-bold font-secondary">
                    INNO<span className="text-accent-orange">BYTEX</span>
                  </span>
                </div>
              </Link>

              <Typography.Body
                size="lg"
                className="text-white/80 mb-6 max-w-md"
              >
                We're a creative digital agency passionate about transforming
                ideas into exceptional digital experiences that drive business
                growth.
              </Typography.Body>

              {/* Contact Information */}
              <div className="space-y-4">
                <motion.div
                  className="flex items-start gap-3 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="h-5 w-5 text-accent-cyan mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <Typography.Body
                    size="sm"
                    className="text-white/70 group-hover:text-white/90 transition-colors duration-200"
                  >
                    {contactInfo.address}
                  </Typography.Body>
                </motion.div>

                <motion.a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-3 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone className="h-5 w-5 text-accent-green flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <Typography.Body
                    size="sm"
                    className="text-white/70 group-hover:text-white/90 transition-colors duration-200"
                  >
                    {contactInfo.phone}
                  </Typography.Body>
                </motion.a>

                <motion.a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className="h-5 w-5 text-accent-purple flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <Typography.Body
                    size="sm"
                    className="text-white/70 group-hover:text-white/90 transition-colors duration-200"
                  >
                    {contactInfo.email}
                  </Typography.Body>
                </motion.a>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Typography.Heading size="sm" className="text-white mb-6">
                Services
              </Typography.Heading>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-accent-cyan transition-colors duration-200 text-sm group flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-accent-cyan rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Typography.Heading size="sm" className="text-white mb-6">
                Company
              </Typography.Heading>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-accent-cyan transition-colors duration-200 text-sm group flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-accent-cyan rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Typography.Heading size="sm" className="text-white mb-6">
                Resources
              </Typography.Heading>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-accent-cyan transition-colors duration-200 text-sm group flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-accent-cyan rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Footer */}
        <motion.div
          className="py-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <span>&copy; 2025 INNOBYTEX. All rights reserved.</span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-1">
                  Made with <Heart className="w-3 h-3 text-red-400" /> in
                  Myanmar
                </span>
              </div>
              <div className="flex gap-6">
                <Link
                  href="/privacy"
                  className="hover:text-white/90 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-white/90 transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Social Links */}
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  >
                    <IconButton
                      icon={<social.icon className="h-4 w-4" />}
                      variant="ghost"
                      size="sm"
                      className="text-white/70 hover:text-accent-cyan hover:bg-white/10"
                      aria-label={social.label}
                      onClick={() => window.open(social.href, "_blank")}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Back to Top */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                <IconButton
                  icon={<ArrowUp className="h-4 w-4" />}
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-accent-cyan hover:bg-white/10"
                  onClick={scrollToTop}
                  aria-label="Back to top"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

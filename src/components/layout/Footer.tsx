'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Separator } from '@/components/ui/separator';
import { MapPin, Mail, Phone, Instagram, Facebook } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const { t, locale } = useLanguage();

  const quickLinks = [
    { label: t.nav.tours, href: '/tour-packages' },
    { label: t.nav.customizedTours, href: '/tour-packages' },
    { label: t.nav.communityTours, href: '/tours-cities' },
    { label: t.nav.about, href: '/about-us' },
    { label: t.nav.testimonials, href: '/testimonials' },
    { label: t.nav.contact, href: '/contact' },
  ];

  const moreLinks = [
    { label: t.nav.projects, href: '/projects-we-support' },
    { label: t.nav.faq, href: '/faq' },
    { label: t.footer.privacy, href: '#' },
    { label: t.footer.terms, href: '#' },
  ];

  return (
    <footer className="bg-[#0F0F0F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <div className="relative w-52 h-[100px] shrink-0">
                <Image src="/logo.png" alt="PeruTravelExpertsB" fill className="object-contain" sizes="208px" />
              </div>
            </Link>
            <p className="text-warm-gray text-sm leading-relaxed">
              {locale === 'es'
                ? 'Tu agencia de viajes boutique en Cusco. Experiencias VIP únicas e inolvidables.'
                : 'Your boutique travel agency in Cusco. Unique and unforgettable VIP experiences.'}
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-warm-gray hover:text-gold transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-warm-gray hover:text-gold transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-gold text-lg mb-4">
              {locale === 'es' ? 'Tours' : 'Tours'}
            </h4>
            <ul className="space-y-3">
              {quickLinks.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-warm-gray hover:text-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-playfair text-gold text-lg mb-4">
              {locale === 'es' ? 'Empresa' : 'Company'}
            </h4>
            <ul className="space-y-3">
              {quickLinks.slice(3).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-warm-gray hover:text-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
              {moreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-warm-gray hover:text-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-playfair text-gold text-lg mb-4">{t.contact.title}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-warm-gray text-sm">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span>+51 984 215 157</span>
              </li>
              <li className="flex items-center gap-2 text-warm-gray text-sm">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span>info@perutravelexpertsb.com</span>
              </li>
              <li className="flex items-start gap-2 text-warm-gray text-sm">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Cusco, Perú</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-gold/10" />

        {/* Bottom Footer */}
        <div className="py-4 pb-24 sm:pb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-warm-gray text-xs">
            © {new Date().getFullYear()} PeruTravelExpertsB. {t.footer.rights}
          </p>
          <p className="text-xs text-warm-gray">
            {t.footer.credit}{' '}
            <a href="https://www.fastpagepro.com" target="_blank" rel="noopener noreferrer" className="text-[#D4A843] hover:underline font-medium">
              fastpagepro.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

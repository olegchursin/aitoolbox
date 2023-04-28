import NextImage from '@/components/NextImage';
import ThemeSwitch from '@/components/ThemeSwitch';
import Link from 'next/link';

const links = [
  { href: '/featured', label: 'Featured' },
  { href: '/vault', label: 'Full List' }
];

const LOGO_SIZE = 48;

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white text-white dark:bg-gray-950">
      <div className="layout flex items-center justify-between py-4">
        <section className="flex items-center gap-4 font-bold">
          <Link href="/">
            <NextImage
              src="/favicon/android-chrome-512x512.png"
              alt="Logo"
              width={LOGO_SIZE}
              height={LOGO_SIZE}
            />
          </Link>
          <h3 className="bg-gradient-to-br from-teal-400 to-teal-600 bg-clip-text text-sm font-extrabold text-transparent lg:text-xl">
            AI Tools Vault
          </h3>
        </section>

        <nav>
          <ul className="flex items-center justify-between space-x-4">
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <a href={href} className="hover:text-gray-600">
                  {label}
                </a>
              </li>
            ))}
            <ThemeSwitch />
          </ul>
        </nav>
      </div>
    </header>
  );
}

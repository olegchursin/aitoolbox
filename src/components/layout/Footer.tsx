import { FC } from 'react';

const links = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

const Footer: FC = () => {
  return (
    <div className="layout flex h-12 items-center justify-between text-xs lg:text-base">
      <div>
        © {new Date().getFullYear()} by{' '}
        <a href="https://theodorusclarence.com?ref=tsnextstarter">
          Oleg Chursin
        </a>
      </div>
      <nav>
        <ul className="flex items-center justify-between space-x-4">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <a href={href} className="hover:text-gray-600">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Footer;

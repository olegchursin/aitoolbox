import Layout from '@/components/layout/Layout';

import Seo from '@/components/Seo';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle="Home" />

      <div className="flex h-2/4 max-h-[900px] w-full items-center justify-center bg-hero bg-cover bg-center">
        <Link href="/vault">
          <button
            type="button"
            className="mb-2 mr-2 rounded-lg bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-teal-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-teal-300 dark:shadow-lg dark:shadow-teal-800/80 dark:focus:ring-teal-800"
          >
            Enter the Vault
          </button>
        </Link>
      </div>

      <div className="text-layout-center py-12">
        <article className="prose prose-sm text-center dark:prose-invert md:prose-lg lg:prose-xl">
          <h1>
            Welcome to{' '}
            <span className="bg-gradient-to-br from-teal-400 to-teal-600 bg-clip-text font-extrabold text-transparent">
              AI Tools Vault
            </span>{' '}
            - the ultimate collection of AI tools
          </h1>
          <p>
            Browse through our searchable, filterable, and sortable collection
            to find the tool you need.
          </p>
        </article>

        <div>
          <Link href="/vault">
            <button
              type="button"
              className="mb-2 mr-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Featured tool
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

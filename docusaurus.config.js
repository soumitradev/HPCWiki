// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Sharanga',
  tagline:
    'The High Performance Computing Cluster at BITS Pilani - Hyderabad Campus',
  url: 'https://sharanga.hpc.bits-hyderabad.ac.in/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'sharanga-hpc', // Usually your GitHub org/user name.
  projectName: 'HPCWiki', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          breadcrumbs: false,
          sidebarCollapsible: false,
        },
      }),
    ],
  ],
  plugins: [],
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        indexBlog: false,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '',
        logo: {
          alt: 'Sharanga Logo',
          src: 'img/sharanga.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'misc_docs/configuration/configuration',
            position: 'right',
            label: 'Configuration',
          },
          {
            type: 'doc',
            docId: 'misc_docs/usage/usage',
            position: 'right',
            label: 'Usage Policy',
          },
          {
            type: 'doc',
            docId: 'misc_docs/software/software',
            position: 'right',
            label: 'Software',
          },
          {
            type: 'doc',
            docId: 'faq/faq',
            position: 'right',
            label: 'FAQs',
          },
          {
            type: 'doc',
            docId: 'misc_docs/contact/contact',
            position: 'right',
            label: 'Contact Us',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'BITS Pilani',
            items: [
              {
                label: 'Hyderabad Campus',
                to: 'https://www.bits-pilani.ac.in/hyderabad/',
                logo: {
                  alt: 'BITS Logo',
                  src: 'img/BITS_Pilani-Logo.svg',
                },
              },
            ],
          },
        ],
        logo: {
          alt: 'BITS Pilani',
          src: 'img/BITS_Pilani-Logo.svg',
          href: 'https://www.bits-pilani.ac.in/hyderabad/',
          width: 85,
          height: 85,
        },
        copyright: `Copyright © ${new Date().getFullYear()} Sharanga. All rights reserved. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;

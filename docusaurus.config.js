// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Sharanga',
  tagline: 'The High Performance Computing Cluster at BITS Pilani Hyderabad Campus',
  url: 'https://sharanga.hpc.bits-hyderabad.ac.in/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',
  organizationName: 'sharanga-hpc', // Usually your GitHub org/user name.
  projectName: 'HPCWiki', // Usually your repo name.

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
          breadcrumbs: true,
        },
      }),
      
    ],
  ],
    plugins: [
      [
        require.resolve("@cmfcmf/docusaurus-search-local"),
        {
          style: undefined,
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
        items:[
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
          }
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
                to: '#',
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
          width: 100,
          height: 100,
        },
        // copyright: `Copyright © ${new Date().getFullYear()}. Released publicly under CC-by-SA-NC-4.0. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
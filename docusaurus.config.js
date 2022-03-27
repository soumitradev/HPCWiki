// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Sharanga',
  tagline: 'A guide to High Performance Computing and Frequently Asked Questions',
  url: 'https://sharanga.hpc.bits-hyderabad.ac.in/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'sharanga-hpc', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
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
            docId: 'sharanga/sharanga',
            position: 'left',
            label: 'Docs',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'BITS Pilani Hyderabad Campus',
            items: [
              {
                label: 'BITS Pilani Hyderabad Campus, \n Hyderabad, Telangana - 500078',
                to: '/docs/sharanga/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'E-Mail',
                href: 'mailto:hpc@hyderabad.bits-pilani.ac.in',
              },
            ],
          },
          {
            title: 'Address',
            items: [
              {
                label: 'H009, \n Mathematics Department, \n BITS Pilani Hyderabad Campus, \n Hyderabad, Telangana - 500078',
                href: 'https://github.com/sharanga-hpc/HPCWiki',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()}. Released publicly under CC-by-SA. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;

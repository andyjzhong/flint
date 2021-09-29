import * as React from 'react'
import { BiDollarCircle } from 'react-icons/bi';

export const links = [
  {
    label: 'For Designers',
    href: '#',
  },
  {
    label: 'For Teams',
    href: '#',
  },
  {
    label: 'Resources',
    children: [
      {
        label: 'Get Help',
        description: 'Read our documentation and FAQs, or get in touch.',
        href: '#',
        icon: <BiDollarCircle />,
      },
      {
        label: 'Events & Meetups',
        description: 'Discover and join your local Sketch community.',
        href: '#',
        icon: <BiDollarCircle />,
      },
      {
        label: 'Extensions',
        description: 'Do even more with Assistants, plugins and integrations.',
        href: '#',
        icon: <BiDollarCircle />,
      },
      {
        label: 'Blog',
        description: 'Get updates, articles and insights from the team.',
        href: '#',
        icon: <BiDollarCircle />,
      },
    ],
  },
  {
    label: 'Pricing',
    href: '#',
  },
]

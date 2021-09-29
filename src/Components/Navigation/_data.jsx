import * as React from 'react'
import { BiDollarCircle } from 'react-icons/bi';

export const links = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    label: 'Actions',
    children: [
      {
        label: 'Transactions',
        description: 'Enter and view transaction data',
        href: 'transactions',
        icon: <BiDollarCircle />,
      },
      {
        label: 'Budgets',
        description: 'Track your expenses by category',
        href: 'budgets',
        icon: <BiDollarCircle />,
      },
    ],
  },
  {
    label: 'About',
    href: '/about',
  },
]

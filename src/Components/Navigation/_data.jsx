import * as React from 'react'
import { BiDollarCircle } from 'react-icons/bi';
import { FaChartPie } from 'react-icons/fa';

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
        icon: <FaChartPie />,
      },
    ],
  },
  {
    label: 'About',
    href: '/about',
  },
]

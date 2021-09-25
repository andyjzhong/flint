# Flint Personal Finance

## Overview
A personal finance application inspired by Mint to help track income and expense transactions. Users have the ability to manually enter income and expense transactions with categories and dates which will be used to display graphs and spending habits. Users will also be able to set budgets for specific expense categories to help track monthly spending and view trends.

#### Members
-   Andy Zhong
-   Jesse Watson

#### Timeframe: Sep 23 to Oct 4 (11 days)

## Tech Stack

-   MERN Stack: MongoDB, Express, React, NodeJS
-   Charting Library: [ChartJS](https://www.chartjs.org/) / [React ChartJS](http://reactchartjs.github.io/react-chartjs-2/#/)
-   [Chakra UI](https://chakra-ui.com/) React UI Framework
-   JWT User Authentication


## Wireframes
![Wireframe](https://i.imgur.com/otFgP6G.png)
![Wireframe](https://i.imgur.com/4cdojTv.png)


## User Stories

- As a User, I would like to manually enter a transaction so that I can keep track of my earnings and spending.
- As a User, I would like to edit and delete a transaction so that I can correct or remove any transactions I've previously added.
- As a User, I would like to see charts of my spending data so that I can understand where my money is going.
- As a User, I would like to be able to create my own account so that I can log in and only see my own transactions.
- As a user, I would like to set a budget for any major or minor category so that I can see the variance between my monthly budget and monthly spending.
- As a User, I would like to edit and delete a budget so that I can correct or remove any budgets I've previously set.
- As a User, I would like to see a navbar so that I can navigate to the Home, Dashboard, Transactions, Budgets, or About page.

## Stretch Goals

- Integrate with Plaid
- Create additional charts and tables based on data
- Add support for Upcoming Bills and Reminders
- Dark Mode

## Component Hierarchy

- **App**
    - Navigation
        - Links / Buttons
    - Home
        - Buttons
    - Dashboard
        - Charts
        - Table
        - Select View
    - Transactions
        - Table
        - Searchbar
        - Dropdowns
        - DatePicker
        - Modal
        - TextFields
        - Button
    - Budgets
        - Chart
        - Table
        - Modal
        - TextFields
        - Button
    - About


## Resource Models

- **Users**
    - firstName
    - lastName
    - email
    - password
    - isLoggedIn
    - **Transactions**
        - description
        - date
        - type
        - category
        - subcategory
        - amount
    - **Budgets**
        - category
        - subcategory
        - amount

## CRUD Actions

- Create Users, Read User Data, Update Password, Delete Account
- Create, Read, Update, and Delete Transactions
- Create, Read, Update, and Delete Budgets

## MVP

| Task                    | Screen        | Completed  |
| ----------------------- | ------------- | ---------- |
| Build Navbar w/ Routes  | Home          | Sep 25     |
| Set Up & HTML           | Home          | Sep 25     |
| Set Up & HTML           | Signup        | Sep 23     |
| Set Up & HTML           | Login         | Sep 23     |
| Set Up & HTML           | Dashboard     | Sep 25     |
| Set Up & HTML           | Transactions  | Sep 25     |
| Set Up & HTML           | Budgets       | Sep 25     |
| Connect to API & Render | About         | Sep 25     |

# Project Setup Guide

## Workspace Setup

1. Create a workspace named `development`.
2. In the Truffle Projects section, add `truffle-config.js` by clicking the **ADD PROJECT** button.

## Metamask Setup

1. **Download Metamask Extension:**
    - Visit [Metamask's website](https://metamask.io/) and download the extension for your browser.
2. **Create Wallet and Import Accounts:**
    - Create a wallet within Metamask and import accounts from Ganache.
3. **Add Network to Metamask:**
    - Network Details:
        - **Network Name**: Localhost 7575
        - **RPC URL**: http://localhost:7545
        - **Chain ID**: 1337
        - **Currency Symbol**: ETH

## Database Configuration

1. **MySQL Database Setup:**
    - Create a database named `voter_db`.
2. **Create Table `voters` in the Database:**
    - Run the following SQL query:
        ```sql
        CREATE TABLE voters (
            voter_id VARCHAR(36) PRIMARY KEY NOT NULL,
            role ENUM('admin', 'user') NOT NULL,
            password VARCHAR(255) NOT NULL
        );
        ```

## Installation and Setup

1. **Install Truffle Globally:**
    - Run the following command:
        ```bash
        npm install -g truffle
        ```
2. **Install Project Dependencies:**
    - Install required dependencies for the project:
        ```bash
        npm install
        pip install -r requirements.txt
        ```

## Compilation and Deployment

1. **Compile with Truffle:**
    - Access Truffle console and execute compile command:
        ```bash
        truffle console
        compile
        ```
2. **Bundle JavaScript for Browser:**
    - Run the following command to bundle JavaScript:
        ```bash
        browserify ./src/js/app.js -o ./src/dist/app.bundle.js
        ```
3. **Run Node.js Server:**
    - Start the Node.js server:
        ```bash
        node index.js
        ```
4. **Start Uvicorn Server:**
    - Navigate to the `DB` directory and start the Uvicorn server:
        ```bash
        cd DB
        uvicorn main:app --reload --host 127.0.0.1
        ```
5. **Migrate Truffle Contracts:**
    - Run the migration command to deploy contracts:
        ```bash
        truffle migrate
        ```

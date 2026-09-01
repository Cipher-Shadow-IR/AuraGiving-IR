# 🌟 AuraGiving • Decentralized Web3 Charity & Philanthropy DApp

![License](https://img.shields.io/badge/license-MIT-emerald)
![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.9-blue)
![React](https://img.shields.io/badge/React-18.2-cyan)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-teal)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.18-purple)

**AuraGiving** is a serene, luxury, and transparent decentralized application (DApp) designed to transform charitable giving on the Ethereum blockchain. By leveraging non-custodial smart contracts, AuraGiving routes **100% of all contributed ETH directly to the campaign creator's wallet** with zero platform cuts, instantaneous on-chain verification, and complete public auditability.

---

## ✨ Features & Highlights

- **🧭 Floating Leisure Navigation**: Real-time ETH balance tracker, wallet menu with 1-click address copy, explorer audit links, and live network badge (`🟢 Hardhat #31337`).
- **🚀 Cinematic Discovery & Metrics**: Dynamic platform statistics (Total ETH Donated, Active Causes, Global Donors, Verified On-Chain), Featured Cause spotlight, category filtering, instant debounce search, and sorting.
- **💖 Interactive Quick Donate & Confetti**: Donate instantly from campaign cards with preset ETH buttons (`0.02`, `0.05`, `0.1`, `0.25`, `0.5`, `1.0 ETH`), live impact estimation preview, and celebratory confetti.
- **💎 Immersive Story & Backer Leaderboard**: Dual-column campaign showcase with mission narrative, transparency callout, top champion ranking crowns (🥇 1st, 🥈 2nd, 🥉 3rd), and on-chain donor address history.
- **🎨 Real-Time Campaign Creator Studio**: Split-screen live preview that renders card updates in real-time, 1-click curated royalty-free image library, and deadline duration shortcuts.
- **👤 Philanthropist Dashboard**: Personal user metrics, created causes management (with owner deletion controls), backed causes history, and saved bookmarks.
- **🎓 Interactive Guided Onboarding Tutorial**: Step-by-step interactive walkthrough explaining Web3 philanthropy, wallet setup, smart contract execution, and blockchain transparency.
- **✨ Smooth Animations**: Powered by `framer-motion` for fluid entrance transitions, layout shifts, spring modals, and ambient glowing orbs.

---

## 🛠️ Architecture & Tech Stack

```
React v18 + Vite + Tailwind CSS + Framer Motion
                  │
                  ▼
         ethers.js v5 Provider
                  │
                  ▼
         CharityDonation.sol
    (Ethereum Solidity Smart Contract)
                  │
                  ▼
     Localhost:8545 / Sepolia Testnet
```

### Frontend
- **React 18** & **Vite**
- **Tailwind CSS** (Custom Glassmorphism, Aurora & Dark Palette)
- **Framer Motion** (Fluid Animations, Staggered Grid, Spring Modals)
- **Lucide React** (Modern Clean Icons)
- **Canvas Confetti** (Celebratory Donation Effects)

### Smart Contract & Blockchain
- **Solidity ^0.8.9** (`CharityDonation.sol`)
- **Hardhat** (Local EVM Node, Compilation & Deployment)
- **ethers.js v5** (Web3 Provider & Signer Management)

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- **Node.js v18+** installed
- **MetaMask** browser extension installed

### 2. Clone & Install Dependencies
```bash
git clone https://github.com/Cipher-Shadow-IR/auragiving-web3-charity-dapp.git
cd auragiving-web3-charity-dapp
```

Install smart contract dependencies:
```bash
cd charitydonation
npm install
```

Install frontend client dependencies:
```bash
cd ../client
npm install
```

---

### 3. Start Local Hardhat Node & Deploy

In **Terminal 1** (Start local EVM blockchain):
```bash
cd charitydonation
npx hardhat node
```
> Runs a local Ethereum node at `http://localhost:8545` with 20 pre-funded test accounts (10,000 ETH each).

In **Terminal 2** (Deploy the smart contract):
```bash
cd charitydonation
npx hardhat run scripts/deploy.js --network localhost
```
> Smart contract deploys to `0x5FbDB2315678afecb367f032d93F642f64180aa3`.

---

### 4. Start the Frontend

In **Terminal 3**:
```bash
cd client
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

### 5. Configure MetaMask for Localhost

1. Open **MetaMask** → Network Selector → **Add a Network Manually**.
2. Enter the following details:
   - **Network Name**: `Local Hardhat`
   - **RPC URL**: `http://localhost:8545`
   - **Chain ID**: `31337`
   - **Currency Symbol**: `ETH`
3. Click **Save**.
4. Import one of Hardhat's pre-funded private keys to test instant transactions:
   ```
   0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

---

## 📄 Smart Contract Functions

| Function | Type | Description |
| :--- | :--- | :--- |
| `createCampaign(...)` | `nonpayable` | Registers a new campaign with target, deadline, story, and image |
| `donateToCampaign(uint256 id)` | `payable` | Transfers ETH directly to campaign creator wallet and logs donation |
| `getCampaigns()` | `view` | Returns all active campaigns and metadata |
| `getDonators(uint256 id)` | `view` | Returns donor addresses and contributed amounts for leaderboard |
| `deleteCampaign(uint256 id)` | `nonpayable` | Allows campaign creator to delete their campaign from directory |

---

## 🛡️ License

This project is licensed under the MIT License.

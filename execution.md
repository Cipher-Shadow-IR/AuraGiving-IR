# Charity Donation DApp - Execution Roadmap

## Prerequisites

1. **Node.js v22+** — Already installed
2. **MetaMask** browser extension — Install from https://metamask.io
3. **Git** (for cloning)

---

## Step-by-Step Setup

### 1. Start the Hardhat Local Node

```bash
cd "Charity Donation Platform\Charity-Donation-Blockchain-System-main\charitydonation"
npm install
npx hardhat compile
npx hardhat node
```

> This runs a local Ethereum node at `http://localhost:8545`

### 2. Deploy the Smart Contract

Open a **new terminal**:

```bash
cd "Charity Donation Platform\Charity-Donation-Blockchain-System-main\charitydonation"
npx hardhat run scripts/deploy.js --network localhost
```

> Contract deploys to address: `0x5FbDB2315678afecb367f032d93F642f64180aa3`

### 3. Start the Frontend

Open another **new terminal**:

```bash
cd "Charity Donation Platform\Charity-Donation-Blockchain-System-main\client"
npm install
npm run dev
```

> App runs at `http://localhost:5173`

### 4. Configure MetaMask

1. Open MetaMask → Click the network dropdown (top-right) → **Add Network** → **Add a network manually**
2. Enter:

| Field         | Value                      |
|---------------|----------------------------|
| Network Name  | Local Hardhat              |
| RPC URL       | `http://localhost:8545`    |
| Chain ID      | `31337`                    |
| Currency Symbol | ETH                      |

3. Click **Save**

### 5. Import Test Wallet Accounts

Hardhat provides 20 pre-funded accounts (10,000 ETH each).

**Account 0 (Main testing wallet):**
```
Address:  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

**Account 1 (Second wallet for testing donations):**
```
Address:  0x70997970C51812dc3A010C7d01b50e0d17dc79C8
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```

To import: MetaMask → **Import Account** → Paste private key → Import

---

## Test Plan

### Test 1: Create a Charity Campaign
1. Connect wallet (click "Connect Wallet" top-right)
2. Click **"Create a charity"** button
3. Fill in:
   - Your Name: `Test User`
   - Charity Title: `Clean Water Fund`
   - Story: `Providing clean water to rural communities.`
   - Goal: `10` (ETH)
   - End Date: Select a future date
   - Image: `https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800`
4. Click **"Submit new charity"**
5. Confirm MetaMask transaction → Wait for confirmation
6. Verify campaign appears on the Dashboard

### Test 2: Donate to a Campaign
1. Click on the campaign card on the Dashboard
2. Enter donation amount: `0.5` (ETH)
3. Click **"Fund Campaign"**
4. Confirm MetaMask transaction
5. Verify "Raised" amount updates and your address appears in donators list

### Test 3: Switch Wallet & Donate Again
1. Switch to Account 2 in MetaMask
2. Click the same campaign → Fund with `1.0` ETH
3. Verify both donators now appear in the list

### Test 4: View Profile (My Campaigns)
1. Switch back to Account 0 (the creator)
2. Click the **Profile** icon (top-right)
3. Verify your created campaign appears under "All Campaigns"

### Test 5: Verify On-Chain Data
Open Hardhat console:
```bash
cd charitydonation
npx hardhat console --network localhost
```
```javascript
const c = await ethers.getContractAt("CharityDonation", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
const campaigns = await c.getCampaigns();
console.log("Total campaigns:", campaigns.length);
console.log("Collected:", ethers.utils.formatEther(campaigns[0].amountCollected), "ETH");
const [donators, donations] = await c.getDonators(0);
console.log("Donators:", donators.length);
```

---

## Quick Reference

| What                | Value                                       |
|---------------------|---------------------------------------------|
| Hardhat RPC         | `http://localhost:8545`                     |
| Frontend URL        | `http://localhost:5173`                     |
| Chain ID            | `31337`                                     |
| Contract Address    | `0x5FbDB2315678afecb367f032d93F642f64180aa3` |
| Contract ABI        | `client/src/config/abi.js`                  |
| Deploy Script       | `charitydonation/scripts/deploy.js`         |
| Smart Contract      | `charitydonation/contracts/Contract.sol`    |

---

## Architecture

```
React + Vite + Tailwind  →  ethers.js v5  →  CharityDonation.sol  →  Local Hardhat Node
      (Frontend)              (MetaMask)        (Solidity)              (localhost:8545)
```

## Contract Functions

| Function                    | Description                          |
|-----------------------------|--------------------------------------|
| `createCampaign()`          | Create a new charity campaign        |
| `donateToCampaign(id)`      | Donate ETH to a campaign (payable)   |
| `getCampaigns()`            | Get all campaigns                    |
| `getDonators(id)`           | Get donators + amounts for campaign  |
| `deleteCampaign(id)`        | Owner-only: delete own campaign      |
| `numberOfCampaigns()`       | Total campaign count                 |

---

## Troubleshooting

| Problem                          | Solution                                          |
|----------------------------------|---------------------------------------------------|
| "No wallet detected"            | Install MetaMask extension                        |
| "Invalid chain ID"              | Add localhost:8545 network in MetaMask            |
| Campaigns not loading           | Ensure Hardhat node is running on port 8545       |
| Transaction fails               | Check account has ETH (import Hardhat test key)   |
| Port 8545 already in use        | Kill existing node process first                  |
| Frontend shows no campaigns     | Re-deploy contract after restarting Hardhat node  |

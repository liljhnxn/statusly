# Statusly

> **Tagline:** Let people know what you're up to.

Statusly is a lightweight decentralized status board where users connect their MetaMask wallets and publish their current status for others to see on-chain.

Users can choose from predefined statuses, attach an optional short message (up to 100 characters), update their status at any time, or clear it.

---

## ⚡ Features

- **Decentralized & Serverless:** 100% on-chain state stored on the Botchain Testnet. No database, backend, or centralized API.
- **Predefined Statuses:**
  - 🟢 **Available**
  - 🔴 **Busy**
  - 🟣 **Studying**
  - 🎮 **Gaming**
  - ☕ **Away**
- **Wallet Connection:** Connect MetaMask with automatic Botchain Testnet network switching.
- **My Status Control:** Update, publish, or clear your active status with immediate UI feedback and transaction states.
- **Community Status Board:** Browse active statuses from all users, with dynamic time indicators ("just now", "5m ago"), shortened wallet addresses, and direct links to the block explorer.
- **Category Filtering & Search:** Filter by status type (with live count badges) and search by wallet address or message keyword.
- **Dark Charcoal & Muted Accents Design:** Modern aesthetic featuring charcoal tones, subtle purple and emerald accents, rounded cards, and smooth hover effects.

---

## 🛠️ Technology Stack

- **Frontend:** [Next.js](https://nextjs.org/) (App Router), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Web3 / Wallet Integration:** [wagmi](https://wagmi.sh/), [viem](https://viem.sh/), [MetaMask](https://metamask.io/)
- **Smart Contracts:** [Solidity](https://soliditylang.org/) `^0.8.20`, [Hardhat](https://hardhat.org/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🌐 Blockchain Configuration

- **Network Name:** Botchain Testnet
- **Chain ID:** `968`
- **RPC URL:** `https://rpc.bohr.life`
- **Block Explorer:** `https://scan.bohr.life`
- **Currency Symbol:** `BOHR`

---

## 📁 Project Structure

```text
Statusly/
├── contracts/
│   ├── contracts/
│   │   └── Statusly.sol         # Solidity smart contract
│   ├── scripts/
│   │   └── deploy.ts            # Botchain deployment script
│   ├── test/
│   │   └── Statusly.test.ts     # Smart contract test suite
│   ├── hardhat.config.ts        # Hardhat config with Botchain network
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js App Router (layout, page, globals)
│   │   ├── components/          # Header, MyStatus, StatusBoard, StatusCard, etc.
│   │   ├── config/              # wagmi, chain, and contract configuration
│   │   ├── types/               # TypeScript interfaces and StatusType enum
│   │   └── utils/               # Formatters (timeAgo, shortenAddress, styles)
│   ├── tailwind.config.ts
│   └── package.json
├── package.json                 # Root script runner
└── README.md
```

---

## 🚀 Quick Start

### 1. Prerequisites

- **Node.js** (v18+ recommended)
- **MetaMask** browser extension installed

### 2. Smart Contract Testing & Deployment

#### Run Tests
```bash
# From root
npm test

# Or directly in contracts folder
cd contracts
npx hardhat test
```

All 10 tests verify:
- Publishing and updating status
- Enforcing valid status types (0 to 4)
- Enforcing max 100 character message limit
- Clearing status and swap-and-pop array reordering
- Inactive user query returns

#### Deploy to Botchain Testnet
1. Create a `.env` file in the `contracts` folder:
   ```bash
   cp contracts/.env.example contracts/.env
   ```
2. Add your deployer wallet private key:
   ```env
   PRIVATE_KEY=your_private_key_without_0x_prefix
   ```
   *(Ensure your address has testnet BOHR for gas fees).*
3. Deploy to Botchain Testnet:
   ```bash
   npm run deploy:botchain
   ```
4. Copy the deployed contract address printed in the console.

---

### 3. Frontend Setup

1. Create a `.env.local` file inside `frontend`:
   ```bash
   cp frontend/.env.example frontend/.env.local
   ```
2. Set the deployed contract address:
   ```env
   NEXT_PUBLIC_STATUSLY_CONTRACT_ADDRESS=0xYourDeployedContractAddress
   ```
3. Start the Next.js development server:
   ```bash
   # From root
   npm run dev

   # Or in frontend folder
   cd frontend
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Security & Privacy Notice

Wallet addresses and status messages are published permanently and publicly on the blockchain. Users are advised never to post sensitive private information, passwords, or personally identifiable details.


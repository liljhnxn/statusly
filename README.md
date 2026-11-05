# Statusly

> **Tagline:** Let people know what you're up to.

Statusly is a lightweight decentralized status board where users connect their MetaMask wallets and publish their current status for others to see on-chain.

Users can choose from predefined statuses, attach an optional short message (up to 100 characters), update their status at any time, or clear it.

---

## ⚡ Features

- **Decentralized & Serverless:** 100% on-chain state stored on Botchain. No database, backend, or centralized API.
- **Predefined Statuses:**
  - 🟢 **Available**
  - 🔴 **Busy**
  - 🟣 **Studying**
  - 🎮 **Gaming**
  - ☕ **Away**
- **Wallet Connection:** Connect MetaMask with automatic Botchain Mainnet network switching.
- **My Status Control:** Update, publish, or clear your active status with immediate UI feedback and transaction states.
- **Community Status Board:** Browse active statuses from all users, with dynamic time indicators ("just now", "5m ago"), shortened wallet addresses, and direct links to the block explorer.
- **Category Filtering & Search:** Filter by status type (with live count badges) and search by wallet address or message keyword.
- **Dark Charcoal & Muted Accents Design:** Modern aesthetic featuring charcoal tones, subtle purple and emerald accents, rounded cards, and smooth hover effects.

---

## 🌐 Blockchain Configuration

### 🚀 Botchain Mainnet (Live)
- **Chain ID:** `677`
- **RPC URL:** `https://rpc.botchain.ai`
- **Block Explorer:** [https://scan.botchain.ai](https://scan.botchain.ai)
- **Currency Symbol:** `BOT`
- **Deployed & Verified Contract:** [`0x89f2A87d1686F90Cec2E46766a53630b94Fd41e7`](https://scan.botchain.ai/address/0x89f2A87d1686F90Cec2E46766a53630b94Fd41e7#code)

### 🧪 Botchain Testnet
- **Chain ID:** `968`
- **RPC URL:** `https://rpc.bohr.life`
- **Block Explorer:** [https://scan.bohr.life](https://scan.bohr.life)
- **Currency Symbol:** `BOHR`
- **Deployed & Verified Contract:** [`0xa7848700A7ed85Fa13c410d44e56E46e82545457`](https://scan.bohr.life/address/0xa7848700A7ed85Fa13c410d44e56E46e82545457#code)

---

## 🛠️ Technology Stack

- **Frontend:** [Next.js](https://nextjs.org/) (App Router), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Web3 / Wallet Integration:** [wagmi](https://wagmi.sh/), [viem](https://viem.sh/), [MetaMask](https://metamask.io/)
- **Smart Contracts:** [Solidity](https://soliditylang.org/) `^0.8.20`, [Hardhat](https://hardhat.org/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Quick Start

### 1. Smart Contract Testing & Deployment

#### Run Tests
```bash
npm test
```

#### Deploy to Botchain Mainnet
```bash
npm run deploy:mainnet
```

---

### 2. Frontend Setup

1. Check `.env.local` inside `frontend`:
   ```env
   NEXT_PUBLIC_STATUSLY_CONTRACT_ADDRESS=0x89f2A87d1686F90Cec2E46766a53630b94Fd41e7
   ```
2. Start the Next.js development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

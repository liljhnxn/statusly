# Statusly

> **Tagline:** Let people know what you're up to.

Statusly is a lightweight decentralized status board where users connect their MetaMask wallets and publish their current status for others to see on-chain.

Users can choose from predefined statuses, attach an optional short message (up to 100 characters), update their status at any time, or clear it.

---

## ⚡ Features

- **Decentralized & Serverless:** 100% on-chain state stored on BOT Chain. No database, backend, or centralized API.
- **Predefined Statuses:**
  - 🟢 **Available**
  - 🔴 **Busy**
  - 🟣 **Studying**
  - 🎮 **Gaming**
  - ☕ **Away**
- **Wallet Connection:** Connect MetaMask with automatic BOT Chain network switching.
- **My Status Control:** Update, publish, or clear your active status with immediate UI feedback and transaction states.
- **Community Status Board:** Browse active statuses from all users, with dynamic time indicators ("just now", "5m ago"), shortened wallet addresses, and direct links to the BOT Chain block explorer.
- **Category Filtering & Search:** Filter by status type (with live count badges) and search by wallet address or message keyword.
- **Dark Charcoal & Muted Accents Design:** Modern aesthetic featuring charcoal tones, subtle purple and emerald accents, rounded cards, and smooth hover effects.

---

## 🌐 Blockchain Configuration

- **Network Name:** BOT Chain
- **Chain ID:** `677`
- **RPC URL:** `https://rpc.botchain.ai`
- **Native Token:** `BOT`
- **Total Supply:** 150 Million
- **BOT Chain Website:** [https://botchain.ai](https://botchain.ai)
- **BOT Chain Explorer:** [https://scan.botchain.ai](https://scan.botchain.ai)
- **Deployed & Verified Contract Address:** [`0x89f2A87d1686F90Cec2E46766a53630b94Fd41e7`](https://scan.botchain.ai/address/0x89f2A87d1686F90Cec2E46766a53630b94Fd41e7#code)

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

#### Deploy to BOT Chain
```bash
npm run deploy
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

---

## 🔗 Official Ecosystem Links

- **BOT Chain Website:** [https://botchain.ai](https://botchain.ai)
- **BOT Chain Explorer:** [https://scan.botchain.ai](https://scan.botchain.ai)
- **Verified Contract:** [https://scan.botchain.ai/address/0x89f2A87d1686F90Cec2E46766a53630b94Fd41e7#code](https://scan.botchain.ai/address/0x89f2A87d1686F90Cec2E46766a53630b94Fd41e7#code)

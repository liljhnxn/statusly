# Statusly: Whitepaper & Pitch Deck

**Tagline:** Let people know what you're up to.  
**Network:** Botchain Mainnet (Chain ID: 677) & Botchain Testnet (Chain ID: 968)  
**Mainnet Contract Address:** `0x89f2A87d1686F90Cec2E46766a53630b94Fd41e7`  
**Mainnet Explorer:** [scan.botchain.ai](https://scan.botchain.ai/address/0x89f2A87d1686F90Cec2E46766a53630b94Fd41e7#code)  
**Repository:** [github.com/liljhnxn/statusly](https://github.com/liljhnxn/statusly)  
**Version:** 2.0 — Mainnet Release  

---

## Part 1: Statusly Whitepaper

### 1. Executive Summary

Statusly is a minimalist, decentralized status board built on the Botchain network. It allows users to connect their Web3 wallets and publish their current status and activity directly on-chain for the community to see in real time. 

By removing centralized databases, backend servers, and account registration requirements, Statusly introduces a lightweight, serverless standard for Web3 micro-presence. Every status update, message, and clear operation is an immutable, sovereign transaction executed directly by the user's wallet.

### 2. Problem Statement

1. **Centralized Presence Silos:** Modern communication platforms (Discord, Slack, Telegram) keep user status and presence confined to isolated silos owned by centralized entities.
2. **Web3 Identity Disconnect:** While crypto wallets represent sovereign on-chain identities and financial histories, they lack real-time context about what the user behind the address is currently doing or open to.
3. **Bloated Architectures:** Most Web3 social dApps overcomplicate by introducing premature tokens, token gates, invasive tracking, complex graph protocols, or heavy infrastructure.

### 3. The Statusly Solution

Statusly strips away all non-essential layers to deliver a pure, gas-efficient on-chain status board:

- **100% On-Chain State:** All status records are stored and fetched directly from the `Statusly.sol` smart contract.
- **Sovereign Micro-Presence:** Status updates are authenticated strictly by the caller’s signature (`msg.sender`).
- **Predefined Categorization:** Statuses fall into five core activities (`Available`, `Busy`, `Studying`, `Gaming`, `Away`), allowing instant filtering and clear community visibility.
- **Micro-Messaging:** Users can include an optional 100-character memo to explain their current context (e.g., "Auditing contracts", "AFK for dinner", "Playing CS2").
- **Single Active Status Model:** Users have at most one active status, keeping the board clean, real-time, and relevant.

### 4. Technical Architecture

```
┌────────────────────────────────────────────────────────┐
│                   Next.js Frontend                      │
│   (TypeScript, Tailwind CSS, Lucide Icons, Charcoal UI)│
└───────────────┬────────────────────────▲───────────────┘
                │                        │
       Write Transactions          Read Contract State
         (wagmi / viem)              (useReadContract)
                │                        │
                ▼                        │
┌────────────────────────────────────────┴───────────────┐
│              Botchain Testnet (Chain ID 968)           │
│                   RPC: https://rpc.bohr.life           │
│                                                        │
│           Statusly.sol (0xa78487...5457)               │
│   - mapping(address => StatusRecord)                   │
│   - address[] activeUsers (O(1) Swap-and-Pop)         │
│   - updateStatus(uint8 statusType, string message)     │
│   - clearStatus()                                      │
│   - getAllStatuses() -> StatusRecord[]                 │
└────────────────────────────────────────────────────────┘
```

#### Smart Contract Design Highlights (`Statusly.sol`)
- **$O(1)$ Swap-and-Pop User Indexing:** When a user clears their status, their address is removed from the active users list in constant gas time using swap-and-pop, guaranteeing that `getAllStatuses()` never iterates over inactive records or leaves holes.
- **Gas Conscious & Safe:** Input validation enforces valid status bounds (`uint8 <= 4`) and enforces message length limits (`bytes(message).length <= 100`).
- **Event-Driven:** Emits `StatusUpdated` and `StatusCleared` events for external indexers, analytics, and instant UI state synchronization.

---

## Part 2: Pitch Deck (Slide-by-Slide)

### Slide 1: Title & Tagline
- **Title:** Statusly
- **Tagline:** Let people know what you're up to.
- **Sub-tagline:** The decentralized micro-presence board on Botchain.
- **Live Contract:** `0xa7848700A7ed85Fa13c410d44e56E46e82545457`
- **Network:** Botchain Testnet (Chain ID: 968)

### Slide 2: The Problem
- Web3 identities (wallets) lack real-time context.
- Existing status tools are trapped in centralized platforms (Discord, Slack).
- Most Web3 social dApps are heavy, over-engineered, and force unnecessary tokens or databases.

### Slide 3: The Solution
- A single-click, decentralized status board.
- Connect MetaMask $\rightarrow$ select status $\rightarrow$ publish on-chain in seconds.
- Anyone on Botchain can see what fellow builders, gamers, and community members are doing.

### Slide 4: Key Features
- **5 Predefined Statuses:** Available, Busy, Studying, Gaming, Away.
- **Custom Short Note:** Optional message up to 100 characters.
- **Real-Time Community Board:** Dynamic timeago indicators, wallet address shortening, and direct block explorer inspection.
- **Fast Filters & Search:** Filter by status category or search specific wallet addresses.
- **One-Click Clear:** Clear status at any time to remove your address from the active board.

### Slide 5: Product Aesthetics
- **Dark Charcoal Design:** Designed with a modern `#0d0d12` charcoal background.
- **Muted Accents:** Glowing emerald green and muted purple accents.
- **Responsive & Minimal:** Fast load times, rounded cards, zero clutter.

### Slide 6: Technology Stack
- **Smart Contract:** Solidity `0.8.20`, Hardhat, PARIS EVM target.
- **Web3 Layer:** wagmi v2, viem, injected MetaMask connector.
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide React.
- **Network Integration:** Botchain Testnet (Chain ID 968, `https://rpc.bohr.life`).

### Slide 7: Security & Reliability
- 10 Comprehensive unit tests passing on Hardhat covering updates, boundaries, deletions, and event logs.
- Source code verified and readable on Botchain Blockscout Explorer.
- Zero centralized dependencies or server downtime vulnerabilities.

### Slide 8: Ecosystem & Community Impact
- Brings authentic, everyday on-chain transactions to Botchain.
- Demonstrates fast finality, low gas fees, and high usability on Botchain Testnet.
- Serves as a public status layer for DAOs, developer teams, and on-chain communities.

### Slide 9: Roadmap
- **Phase 1 (Completed):** Smart contract deployment, verification, Next.js frontend, and Botchain integration.
- **Phase 2:** Support for custom NFT avatars and Botchain Name Service (.bohr) resolution.
- **Phase 3:** Embeddable status badges (widgets) for personal GitHub readmes and Web3 portfolios.
- **Phase 4:** Botchain Mainnet deployment and ecosystem integration.

### Slide 10: Conclusion & Links
- **GitHub:** [https://github.com/liljhnxn/statusly](https://github.com/liljhnxn/statusly)
- **Explorer:** [https://scan.bohr.life/address/0xa7848700A7ed85Fa13c410d44e56E46e82545457#code](https://scan.bohr.life/address/0xa7848700A7ed85Fa13c410d44e56E46e82545457#code)
- **Contact / Team:** Statusly Core

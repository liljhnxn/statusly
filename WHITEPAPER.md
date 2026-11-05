# Statusly: Whitepaper & Pitch Deck

**Tagline:** Let people know what you're up to.  
**Network:** BOT Chain (Chain ID: 677)  
**Native Token:** BOT  
**Contract Address:** `0x89f2A87d1686F90Cec2E46766a53630b94Fd41e7`  
**Verified Source Code:** [BOT Chain Explorer](https://scan.botchain.ai/address/0x89f2A87d1686F90Cec2E46766a53630b94Fd41e7#code)  
**BOT Chain Website:** [https://botchain.ai](https://botchain.ai)  
**BOT Chain Explorer:** [https://scan.botchain.ai](https://scan.botchain.ai)  
**Repository:** [github.com/liljhnxn/statusly](https://github.com/liljhnxn/statusly)  
**Version:** 2.0 — Production Release  

---

## Part 1: Statusly Whitepaper

### 1. Executive Summary

Statusly is a minimalist, decentralized status board built on the BOT Chain network. It allows users to connect their Web3 wallets and publish their current status and activity directly on-chain for the community to see in real time. 

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
│                 BOT Chain (Chain ID 677)               │
│               RPC: https://rpc.botchain.ai             │
│                                                        │
│           Statusly.sol (0x89f2A8...41e7)               │
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
- **Sub-tagline:** The decentralized micro-presence board on BOT Chain.
- **Live Contract:** `0x89f2A87d1686F90Cec2E46766a53630b94Fd41e7`
- **Network:** BOT Chain (Chain ID: 677)
- **Ecosystem:** [https://botchain.ai](https://botchain.ai) | [https://scan.botchain.ai](https://scan.botchain.ai)

### Slide 2: The Problem
- Web3 identities (wallets) lack real-time context.
- Existing status tools are trapped in centralized platforms (Discord, Slack).
- Most Web3 social dApps are heavy, over-engineered, and force unnecessary tokens or databases.

### Slide 3: The Solution
- A single-click, decentralized status board.
- Connect MetaMask $\rightarrow$ select status $\rightarrow$ publish on-chain in seconds.
- Anyone on BOT Chain can see what fellow builders, gamers, and community members are doing.

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
- **Network Integration:** BOT Chain (Chain ID 677, `https://rpc.botchain.ai`).

### Slide 7: Security & Reliability
- 10 Comprehensive unit tests passing on Hardhat covering updates, boundaries, deletions, and event logs.
- Source code verified and readable on BOT Chain Explorer.
- Zero centralized dependencies or server downtime vulnerabilities.

### Slide 8: Ecosystem & Community Impact
- Brings authentic, everyday on-chain transactions to BOT Chain.
- Demonstrates fast finality, low gas fees, and high usability on BOT Chain.
- Serves as a public status layer for DAOs, developer teams, and on-chain communities.

### Slide 9: Roadmap
- **Phase 1 (Completed):** Smart contract deployment on BOT Chain, explorer verification, Next.js frontend, and ecosystem integration.
- **Phase 2:** Support for custom NFT avatars and BOT Chain Name Service resolution.
- **Phase 3:** Embeddable status badges (widgets) for personal GitHub readmes and Web3 portfolios.
- **Phase 4:** DAO & Community Spaces expansion.

### Slide 10: Conclusion & Links
- **BOT Chain Website:** [https://botchain.ai](https://botchain.ai)
- **BOT Chain Explorer:** [https://scan.botchain.ai](https://scan.botchain.ai)
- **Verified Contract:** [https://scan.botchain.ai/address/0x89f2A87d1686F90Cec2E46766a53630b94Fd41e7#code](https://scan.botchain.ai/address/0x89f2A87d1686F90Cec2E46766a53630b94Fd41e7#code)
- **GitHub:** [https://github.com/liljhnxn/statusly](https://github.com/liljhnxn/statusly)

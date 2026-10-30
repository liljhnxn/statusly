import { Abi } from "viem";

export const STATUSLY_ABI = [
  {
    type: "function",
    name: "updateStatus",
    stateMutability: "nonpayable",
    inputs: [
      { name: "statusType", type: "uint8" },
      { name: "message", type: "string" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "clearStatus",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "getStatus",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      {
        type: "tuple",
        name: "",
        components: [
          { name: "user", type: "address" },
          { name: "statusType", type: "uint8" },
          { name: "message", type: "string" },
          { name: "timestamp", type: "uint256" },
          { name: "isActive", type: "bool" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "getAllStatuses",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "tuple[]",
        name: "",
        components: [
          { name: "user", type: "address" },
          { name: "statusType", type: "uint8" },
          { name: "message", type: "string" },
          { name: "timestamp", type: "uint256" },
          { name: "isActive", type: "bool" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "totalActiveStatuses",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "event",
    name: "StatusUpdated",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "statusType", type: "uint8", indexed: false },
      { name: "message", type: "string", indexed: false },
      { name: "timestamp", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "StatusCleared",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "timestamp", type: "uint256", indexed: false },
    ],
  },
] as const satisfies Abi;

export const STATUSLY_CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_STATUSLY_CONTRACT_ADDRESS ||
  "0x0000000000000000000000000000000000000000") as `0x${string}`;


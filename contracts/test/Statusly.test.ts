import { expect } from "chai";
import { ethers } from "hardhat";
import { Statusly } from "../typechain-types";

describe("Statusly Smart Contract", function () {
  let statusly: Statusly;
  let owner: any;
  let user1: any;
  let user2: any;
  let user3: any;

  beforeEach(async function () {
    [owner, user1, user2, user3] = await ethers.getSigners();
    const StatuslyFactory = await ethers.getContractFactory("Statusly");
    statusly = await StatuslyFactory.deploy();
    await statusly.waitForDeployment();
  });

  describe("Status Updates", function () {
    it("should allow a user to publish a status and emit StatusUpdated event", async function () {
      const tx = await statusly.connect(user1).updateStatus(0, "Coding on Botchain");
      await expect(tx)
        .to.emit(statusly, "StatusUpdated")
        .withArgs(user1.address, 0, "Coding on Botchain", (val: any) => val > 0);

      const status = await statusly.getStatus(user1.address);
      expect(status.user).to.equal(user1.address);
      expect(status.statusType).to.equal(0); // Available
      expect(status.message).to.equal("Coding on Botchain");
      expect(status.isActive).to.equal(true);
      expect(status.timestamp).to.be.gt(0);
    });

    it("should update an existing status without creating duplicates in getAllStatuses", async function () {
      await statusly.connect(user1).updateStatus(0, "Initial status");
      await statusly.connect(user1).updateStatus(1, "Updated to Busy");

      const all = await statusly.getAllStatuses();
      expect(all.length).to.equal(1);
      expect(all[0].user).to.equal(user1.address);
      expect(all[0].statusType).to.equal(1);
      expect(all[0].message).to.equal("Updated to Busy");
    });

    it("should reject invalid status types (> 4)", async function () {
      await expect(
        statusly.connect(user1).updateStatus(5, "Invalid type")
      ).to.be.revertedWith("Invalid status type");
    });

    it("should reject messages longer than 100 characters", async function () {
      const longMessage = "a".repeat(101);
      await expect(
        statusly.connect(user1).updateStatus(0, longMessage)
      ).to.be.revertedWith("Message exceeds 100 characters");
    });

    it("should allow empty message", async function () {
      await expect(statusly.connect(user1).updateStatus(2, ""))
        .to.not.be.reverted;

      const status = await statusly.getStatus(user1.address);
      expect(status.message).to.equal("");
      expect(status.statusType).to.equal(2); // Studying
    });
  });

  describe("Status Clearing", function () {
    it("should allow a user to clear their active status and emit StatusCleared event", async function () {
      await statusly.connect(user1).updateStatus(3, "Playing games");
      expect((await statusly.getAllStatuses()).length).to.equal(1);

      const tx = await statusly.connect(user1).clearStatus();
      await expect(tx)
        .to.emit(statusly, "StatusCleared")
        .withArgs(user1.address, (val: any) => val > 0);

      const status = await statusly.getStatus(user1.address);
      expect(status.isActive).to.equal(false);

      const all = await statusly.getAllStatuses();
      expect(all.length).to.equal(0);
    });

    it("should revert if user attempts to clear when they have no active status", async function () {
      await expect(statusly.connect(user1).clearStatus()).to.be.revertedWith("No active status");
    });

    it("should handle swap-and-pop correctly when middle user clears status", async function () {
      await statusly.connect(user1).updateStatus(0, "User 1");
      await statusly.connect(user2).updateStatus(1, "User 2");
      await statusly.connect(user3).updateStatus(2, "User 3");

      expect((await statusly.getAllStatuses()).length).to.equal(3);

      // User 2 clears
      await statusly.connect(user2).clearStatus();

      const remaining = await statusly.getAllStatuses();
      expect(remaining.length).to.equal(2);

      const users = remaining.map((s) => s.user);
      expect(users).to.include(user1.address);
      expect(users).to.include(user3.address);
      expect(users).to.not.include(user2.address);

      // User 2 can set status again
      await statusly.connect(user2).updateStatus(4, "User 2 is back (Away)");
      const allAfter = await statusly.getAllStatuses();
      expect(allAfter.length).to.equal(3);
    });
  });

  describe("Retrieval", function () {
    it("should return empty inactive record for address with no status", async function () {
      const status = await statusly.getStatus(user1.address);
      expect(status.isActive).to.equal(false);
      expect(status.message).to.equal("");
    });

    it("should return all active statuses", async function () {
      await statusly.connect(user1).updateStatus(0, "User 1 Available");
      await statusly.connect(user2).updateStatus(3, "User 2 Gaming");

      const all = await statusly.getAllStatuses();
      expect(all.length).to.equal(2);
      expect(all[0].user).to.equal(user1.address);
      expect(all[1].user).to.equal(user2.address);
    });
  });
});


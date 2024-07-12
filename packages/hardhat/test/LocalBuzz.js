const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("LocalBuzz", function () {
  let LocalBuzz;
  let localbuzz;
  let TestERC20;
  let cUSDToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy test cUSDToken contract
    TestERC20 = await ethers.getContractFactory("TestERC20");
    cUSDToken = await TestERC20.deploy("cUSD Token", "cUSD");
    await cUSDToken.deployed();

    // Mint some cUSD tokens for testing
    await cUSDToken.mint(owner.address, ethers.utils.parseUnits("1000", 18));
    await cUSDToken.mint(addr1.address, ethers.utils.parseUnits("1000", 18));
    await cUSDToken.mint(addr2.address, ethers.utils.parseUnits("1000", 18));

    // Deploy the LocalBuzz contract
    LocalBuzz = await ethers.getContractFactory("LocalBuzz");
    localbuzz = await LocalBuzz.deploy(cUSDToken.address);
    await localbuzz.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await localbuzz.owner()).to.equal(owner.address);
    });

    it("Should set the right cUSDToken address", async function () {
      expect(await localbuzz.cUSDTokenAddress()).to.equal(cUSDToken.address);
    });
  });

  describe("Client Registration", function () {
    it("Should register a client", async function () {
      await localbuzz.connect(addr1).registerClient("username1", "email1");
      const client = await localbuzz.getClient(addr1.address);
      expect(client.username).to.equal("username1");
      expect(client.email).to.equal("email1");
    });

    it("Should not allow double registration as client", async function () {
      await localbuzz.connect(addr1).registerClient("username1", "email1");
      await expect(
        localbuzz.connect(addr1).registerClient("username1", "email1")
      ).to.be.revertedWith("Already registered");
    });
  });

  describe("Content Creator Registration", function () {
    it("Should register a content creator", async function () {
      await localbuzz.connect(addr1).registerContentCreator(
        "fullname1",
        "username1",
        "bio1",
        "instagram1",
        "facebook1",
        "linkedin1",
        "twitter1",
        "tiktok1",
        "email1"
      );
      const creator = await localbuzz.getContentCreator(addr1.address);
      expect(creator.username).to.equal("username1");
      expect(creator.email).to.equal("email1");
    });

    it("Should not allow double registration as creator", async function () {
      await localbuzz.connect(addr1).registerContentCreator(
        "fullname1",
        "username1",
        "bio1",
        "instagram1",
        "facebook1",
        "linkedin1",
        "twitter1",
        "tiktok1",
        "email1"
      );
      await expect(
        localbuzz.connect(addr1).registerContentCreator(
          "fullname1",
          "username1",
          "bio1",
          "instagram1",
          "facebook1",
          "linkedin1",
          "twitter1",
          "tiktok1",
          "email1"
        )
      ).to.be.revertedWith("Already registered");
    });
  });

  describe("Package Creation", function () {
    it("Should create a package", async function () {
      await localbuzz.connect(addr1).registerContentCreator(
        "fullname1",
        "username1",
        "bio1",
        "instagram1",
        "facebook1",
        "linkedin1",
        "twitter1",
        "tiktok1",
        "email1"
      );
      await localbuzz.connect(addr1).createPackage(
        "mediaType1",
        "platform1",
        "description1",
        10,
        ethers.utils.parseUnits("100", 18)
      );
      const package = await localbuzz.getPackage(0);
      expect(package.mediaType).to.equal("mediaType1");
      expect(package.platform).to.equal("platform1");
    });

    it("Should only allow creators to create packages", async function () {
      await expect(
        localbuzz.connect(addr1).createPackage(
          "mediaType1",
          "platform1",
          "description1",
          10,
          ethers.utils.parseUnits("100", 18)
        )
      ).to.be.revertedWith("Only Creator");
    });
  });

  describe("Package Purchase", function () {
    beforeEach(async function () {
      await localbuzz.connect(addr1).registerContentCreator(
        "fullname1",
        "username1",
        "bio1",
        "instagram1",
        "facebook1",
        "linkedin1",
        "twitter1",
        "tiktok1",
        "email1"
      );
      await localbuzz.connect(addr1).createPackage(
        "mediaType1",
        "platform1",
        "description1",
        10,
        ethers.utils.parseUnits("100", 18)
      );
    });

    it("Should allow clients to purchase packages", async function () {
      await localbuzz.connect(addr2).registerClient("username2", "email2");
      await localbuzz
        .connect(addr2)
        .purchasePackage(0, { value: ethers.utils.parseUnits("100", 18) });

      const package = await localbuzz.getPackage(0);
      expect(package.buyers.length).to.equal(1);
      expect(package.buyers[0]).to.equal(addr2.address);

      const client = await localbuzz.getClient(addr2.address);
      expect(client.purchasedIds.length).to.equal(1);
      expect(client.purchasedIds[0]).to.equal(0);
    });

    it("Should reward tokens to clients on purchase", async function () {
      await localbuzz.connect(addr2).registerClient("username2", "email2");
      await localbuzz
        .connect(addr2)
        .purchasePackage(0, { value: ethers.utils.parseUnits("100", 18) });

      const tokenBalance = await localbuzz.balanceOf(addr2.address);
      expect(tokenBalance).to.equal(ethers.utils.parseUnits("10", 18)); // 10% of 100 cUSD
    });
  });

  describe("Token Redemption", function () {
    beforeEach(async function () {
      await localbuzz.connect(addr1).registerContentCreator(
        "fullname1",
        "username1",
        "bio1",
        "instagram1",
        "facebook1",
        "linkedin1",
        "twitter1",
        "tiktok1",
        "email1"
      );
      await localbuzz.connect(addr1).createPackage(
        "mediaType1",
        "platform1",
        "description1",
        10,
        ethers.utils.parseUnits("100", 18)
      );

      await localbuzz.connect(addr2).registerClient("username2", "email2");
      await localbuzz
        .connect(addr2)
        .purchasePackage(0, { value: ethers.utils.parseUnits("100", 18) });
    });

    it("Should allow clients to redeem tokens for cUSD", async function () {
      await cUSDToken.connect(addr2).approve(localbuzz.address, ethers.utils.parseUnits("10", 18));
      await localbuzz.connect(addr2).depositcUSD(ethers.utils.parseUnits("10", 18));

      const initialCUSDBalance = await cUSDToken.balanceOf(addr2.address);
      await localbuzz.connect(addr2).redeemTokens(ethers.utils.parseUnits("10", 18));
      const finalCUSDBalance = await cUSDToken.balanceOf(addr2.address);

      expect(finalCUSDBalance.sub(initialCUSDBalance)).to.equal(ethers.utils.parseUnits("10", 18));
    });
  });

  describe("Withdraw cUSD", function () {
    it("Should allow owner to withdraw cUSD", async function () {
      await cUSDToken.transfer(localbuzz.address, ethers.utils.parseUnits("100", 18));
      const initialBalance = await cUSDToken.balanceOf(owner.address);

      await localbuzz.withdrawcUSD(ethers.utils.parseUnits("100", 18));
      const finalBalance = await cUSDToken.balanceOf(owner.address);

      expect(finalBalance.sub(initialBalance)).to.equal(ethers.utils.parseUnits("100", 18));
    });

    it("Should not allow non-owners to withdraw cUSD", async function () {
      await cUSDToken.transfer(localbuzz.address, ethers.utils.parseUnits("100", 18));

      await expect(
        localbuzz.connect(addr1).withdrawcUSD(ethers.utils.parseUnits("100", 18))
      ).to.be.revertedWith("Only Owner");
    });
  });
});
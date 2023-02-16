const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("ProductBooking", function () {
  let ProductBooking;
  let owner;
  let customer;
  let contract;

  before(async () => {
    [owner, customer] = await ethers.getSigners();

    ProductBooking = await ethers.getContractFactory("ProductBooking");
    contract = await ProductBooking.deploy();
  });

  describe("createProduct", async () => {
    it("should create a new product", async () => {
      const createProductTx = await contract.connect(owner).createProduct("iPhone 12", 10, 2);
      await createProductTx.wait();

      const productList = await contract.connect(owner).productList();
      assert(productList.length == 1);
      assert(productList[0].product_name == "iPhone 12");
      assert(productList[0].quantity == 10);
      assert(productList[0].price == 2000000000000000000n);
    });
  });

  describe("createProduct", async () => {
    it("should create a new product", async () => {
      const createProductTx = await contract.connect(owner).createProduct("iPhone 12", 10, 2);
      await createProductTx.wait();

      const productList = await contract.connect(owner).productList();
      assert(productList.length == 1);
      assert(productList[0].product_name == "iPhone 12");
      assert(productList[0].quantity == 20);
      assert(productList[0].price == 2000000000000000000n);
    });
  });
 
  describe("productList", async () => {
    it("should create a new product", async () => {
      const productListTx = await contract.connect(owner).createProduct("iPhone 14", 10, 1);
      await productListTx.wait();
      const productList = await contract.connect(owner).productList();
      assert(productList.length == 1);
      assert(productList[0].product_name == "iPhone 12");
      assert(productList[0].quantity == 10);
      assert(productList[0].price == 2000000000000000000n);
    });
  });


    
  describe("buyProduct", async () => {
    it("Buy a Product", async () => {
      const createProductTx = await contract.connect(owner).createProduct("iPhone 13", 10, 1);
      await createProductTx.wait();
    const price = 1000000000000000000;
    const quantity = 1;
    await contract.connect(customer).buyProduct("iPhone 13", quantity, {value: price * quantity});
    const productList = await contract.productList();
    assert(productList.length == 1);
    assert(productList[0].product_name == "iPhone 13");
    assert(productList[0].quantity == 9);

      
    });
  });
});


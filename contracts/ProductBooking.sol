// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductBooking {
    
    address public owner;

    Product[] public products;

    constructor() {
        owner = msg.sender;
    }
    
    struct Product {     
        string product_name;
        int256 quantity;
        int256 price; // Per item price in ETH
    }

    //to know product is already added or not
    mapping(string => bool) productExists;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this action.");
        _;
    }

    /* 
    this functions is for adding the products
    only admin can add the products
    If a product exists, then it can't add again
    */

    function createProduct( string memory _product_name, int256 _quantity, int256 _price) public onlyOwner {
        bool exists = productExists[_product_name];
        if (exists == true) {
            uint256 existingProductIndex = getProductindexbyName(_product_name);
            products[existingProductIndex].quantity += _quantity;
        } else {
            Product memory product = Product( _product_name, _quantity, _price * (10 ** 18));
            products.push(product);
            productExists[_product_name] = true;
        }
    }

    // to view the product list
    function productList() public view returns(Product[] memory) {
        return products;
    }
    // to know the current balance of contract
    function contractBalance() public view returns(uint) {
        uint balance = (address(this).balance)/10 ** 18;
        return balance;
    }
    // to get the product index by name 
    function getProductindexbyName(string memory _product_name) internal view returns(uint256) {
        for (uint256 i = 0; i < products.length; i++) {
            if (keccak256(abi.encodePacked(products[i].product_name)) == keccak256(abi.encodePacked(_product_name))) {
                return i;
            }
        }
        revert("Product not found.");
    }
    // function for  buy products
    function buyProduct(string memory _product_name, int _quantity) public payable {
        uint256 product_index = getProductindexbyName(_product_name);
        require(products[product_index].quantity > 0, "Product is out of stock.");
        require(_quantity > 0 && _quantity <= products[product_index].quantity, "Invalid quantity.");
        require(msg.value == uint(_quantity) * uint(products[product_index].price), "Incorrect amount of ETH sent.");
    
        products[product_index].quantity -= _quantity;
    }
}

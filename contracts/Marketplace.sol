// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";


contract NFTMarketplace {

    struct Listing {
		address payable seller;
        address payable owner;
		address token;
		uint tokenId;
		uint price;
        bool sold;
	}

	uint private _listingId = 0;
	mapping(uint => Listing) private _listings;

    Listing[] listings;

    // List an NFT for sale
    function listToken(address token, uint tokenId, uint price) external {
        require(IERC721(token).ownerOf(tokenId) == msg.sender, "caller is not the owner");
		IERC721(token).transferFrom(msg.sender, address(this), tokenId);
		Listing memory listing = Listing(
			payable(msg.sender),
            payable(address(this)),
			token,
			tokenId,
			price,
            false
		);
        listings.push(listing);
		_listings[_listingId] = listing;
		_listingId++;
	}

    function buyToken(uint listingId) public payable {
		Listing storage listing = listings[listingId];
		require(msg.value >= listing.price, "Insufficient payment");

		IERC721(listing.token).transferFrom(listing.owner, msg.sender, listing.tokenId);
		payable(listing.seller).transfer(msg.value);

        listing.sold = true;
        listing.price = listing.price * 2;
        listing.owner = payable(msg.sender);
		listing.seller = payable(msg.sender);
	}

    function getAllListedNfts() external view returns (Listing[] memory) {
        return listings;
    }

    function getListingLength()public view returns (uint){
        return listings.length;
    }

    function getUserNfts(address token, uint256 tokenID)public view returns (address){
        return IERC721(token).ownerOf(tokenID);
    }

}
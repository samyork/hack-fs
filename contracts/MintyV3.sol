// SPDX-License-Identifier: MIT
pragma solidity^0.8.4;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
contract Minty is ERC721URIStorage, ERC721Enumerable {
    uint256 maxSupply = 10000;
    string baseURI;
    address admin;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        setBaseURI("ifps://");
        admin == msg.sender;
    }
    address[] public users;
    struct Owner {
        bool doesOwn; //turns true if already owns
        address[] owner; //the address of the owners
    }
    event isOwned(
         bool doesOwn,
         address user
         );
    mapping(address => Owner) public owners;
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override(ERC721Enumerable, ERC721) {
        super._beforeTokenTransfer(from, to, amount);
    }

    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;
    function _burn(uint256 tokenId) internal virtual override(ERC721, ERC721URIStorage) {
        address owner = ERC721.ownerOf(tokenId);

        _beforeTokenTransfer(owner, address(0), tokenId);

        // Clear approvals
        _approve(address(0), tokenId);

        _balances[owner] -= 1;
        delete _owners[tokenId];

        emit Transfer(owner, address(0), tokenId);
    }
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
          }
    modifier onlyOwner() {
        require(admin == msg.sender, "Ownable: caller is not the owner");
        _;
              }
    function mint(
        string memory metadataURI, address
    ) public payable returns (uint256) {
        Owner storage sender = owners[msg.sender];
        require(msg.value == 100000000000000000);
        require(!sender.doesOwn, "You can only own one PFP NFT per aaddress.");
        require(_tokenIds.current() <= maxSupply, "There are no more NFTs left to mint!");
        _tokenIds.increment();
        uint256 id = _tokenIds.current();
        _mint(msg.sender, id);
        _setTokenURI(id, metadataURI);
        sender.doesOwn = true;
        emit isOwned(true, msg.sender);
        return id;
    }
    function withdraw(address payable owner) public onlyOwner returns(bool) {
        owner.transfer(address(this).balance);
        return true;
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _setTokenURI(tokenId, _tokenURI);
    }

    function setBaseURI(string memory baseURI_) internal {
        baseURI = baseURI_;
    }


    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }


    mapping(uint256 => string) private _tokenURIs;
    function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
    }
}

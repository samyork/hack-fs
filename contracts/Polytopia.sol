// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import "@openzeppelin/contracts/utils/Counters.sol";


contract PolytopiaV2 {

    string public name = "Ethiopia";
    //store posts
    uint public postCount;

    address[] public users;
    uint256 likeIdCounter;
    address admin;


    struct Post {
        uint id;
        uint timestamp;
        string contents;
        string uri;
        uint likes;
        address poster;
    }

    event postCreated(
        uint id,
        uint timestamp,
        string contents,
        string uri,
        uint likes,
        address poster
        );
    event postLiked(
        uint id,
        uint likes
        );
    mapping(uint => Post) public posts; //store posts
    // create posts
    IERC721 NFT=IERC721(0x072F927095B7e343946a91Bc50bd62ff91F41221);
    constructor() {
        admin=msg.sender;
    }
    function createPost (string memory _contents, string memory uri) public payable {
        require(NFT.balanceOf(msg.sender) > 0, "You need an NFT to post!");
        require(bytes(_contents).length > 0, "You need to enter a message to post!");
        require(msg.value == 1000000000000000, "Not enough funds!");
        //increment post id
        postCount += 1;
        //add post
        posts[postCount] = Post(postCount, block.timestamp, _contents, uri, 0, msg.sender);
        //emits
        emit postCreated(postCount, block.timestamp, _contents, uri, 0, msg.sender);
        users.push(msg.sender);
    }
    function likePost(uint id) public payable {
        require(msg.value == 1000000000000000);
        posts[id].likes ++;
    }
    function withdraw(address payable owner) public onlyOwner returns(bool) {
        owner.transfer(address(this).balance);
        return true;

    }
    modifier onlyOwner() {
        require(admin == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}

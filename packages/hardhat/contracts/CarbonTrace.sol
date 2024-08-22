// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// import { ERC20 } from "./Interface.sol";


contract CarbonTrace is ERC20{

    IERC20 public cUSDToken;
    address public owner;
       
    // address public cUSDTokenAddress = // 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1 //testnet
    // 0x765DE816845861e75A25fCA122bb6898B8B1282a //mainnet
    constructor() ERC20("CarbonCredits", "CARBZ") {

    owner = msg.sender;
    cUSDToken = IERC20(0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1);
    
    }


uint totalProposals;
    uint totalOffsetProps;
    uint totalcompany;
    uint totalOffsetters;
    uint totalValidators;

    //struct of the company thats needs carbon credits.
    struct Buyer {
    uint buyerId;
    string compName;
    uint regPin;
    string category;
    string description;
    address buyerAdd;
    string email;
    uint phoneNo;
    uint[] carbonIds;
    }

    //array of buyers
    Buyer[] public buyers;

    //struct of the one rehabilitating envt.
    struct Offsetter{
    uint offsetterId;
    string compName;
    uint regPin;
    string category;
    string offSetCat;
    string description;
    address offsetterAdd;
    string email;
    uint phoneNo;
    uint[] proposalIds;
    }

    //array of offsetters
    Offsetter[] public offsetters;

    //struct for offset proposal
    struct offsetProposal{
    uint proposalId;
    string category;
    string description;
    uint estAmount;
    uint timestamp;
    string ipfsHash;
    address offsetterAdd;
    uint yesVotes;
    uint noVotes;
    bool approved;
    address[] votedvals;
    }

    //array of offset proposals
    offsetProposal[] public offsetProposals;

    //struct for bought credits
    struct boughtCredit{
    uint proposalId;
    uint estAmount;
    uint timestamp;
    address buyerAdd; 
    }

    //array of bought credits
    boughtCredit[] public boughtCredits;

    //struct of validator
    struct validator{
    uint validatorId;
    string name;
    uint regNo;
    address validatorAdd;
    uint[] proposalIds;
    
    }

    //array of validators
    validator[] public validators;

    struct Result {
        StructType structType;
        address addr;
        bytes data; // encoded struct data
        
    }

    enum StructType { None, Buyer, Offsetter, Validator }


    //mappings of buyers
    mapping (uint => Buyer) buyernId;
    mapping (string => Buyer) buyernName;
    mapping(address => Buyer) buyernAddress;

    //mappings of offsetters
    mapping (uint => Offsetter) offSetternId;
    mapping (string => Offsetter) offSetternName;
    mapping(address => Offsetter) offSetternAddress;

    //mappings of proposals
    mapping (address=> offsetProposal) offSetProposalAddress;
    mapping (uint => offsetProposal) offSetProposalnId;

    //mappings of bought credits
    mapping (address => boughtCredit) boughtCreditsAddress;
    mapping (uint => boughtCredit) boughtCreditsId;

    //mapping of validators
    mapping (uint => validator) validatornId;
    mapping (string => validator) validatornName;
    mapping(address => validator) validatornAddress;

    // event emitted when offsetter is registered
    event offsetterRegistered(uint offsetterId,
    string compName,
    uint regPin,
    string category,
    string offSetCat,
    string description,
    address offsetterAdd,
    string email,
    uint phoneNo, uint[] proposalIds);

    //event of a registered user
    event buyerRegistered(uint buyerId,
    string compName,
    uint regPin,
    string category,
    string description,
    address buyerAdd,
    string email,
    uint phoneNo, uint[] carbonIds);

    //event of an offset proposal
    event offsetProposalCreated(uint proposalId,
    string category,
    string description,
    uint estAmount,
    uint timestamp,
    string ipfsHash,
    address offsetterAdd, bool approved, address[] votedvals);

    //event of a bought credit
    event boughtCreditCreated(uint buyerId,
    string compName,
    uint regPin,
    address buyerAdd,
    uint estAmount,
    uint timestamp
    );

    //event to approve an offset proposal
    event offsetProposalApproved(uint offsetterId,string compName,uint regPin,address offsetterAdd,uint amount,uint proposalId, string ipfsHash);

    //event of registered validator
    event validatorRegistered(uint validatorId, string name, uint regNo,address validatorAdd);

    //event to show validator voted
    event validatorVoted(uint validatorId, uint proposalId,address validatorAdd);

    //event to show contract withdrawn
    event withdrawalSuccessful(address receiver,uint amount);

    //event to show minted
    event minted(address sender,uint amount);

    //function to register offsetter
    function registerBuyer( string memory _compName,uint _regPin,string memory _category,string memory _description,string memory _email,uint _phoneNo) public {
    require(!registeredOffsetter(msg.sender), "You are already registered as an offsetter");
    require(!registeredBuyer(msg.sender), "You are already registered as a buyer");
    uint _buyerId = totalcompany;
    Buyer memory newBuyer = Buyer({
    buyerId: _buyerId,
    compName: _compName,
    regPin: _regPin,
    category: _category,
    description: _description,
    buyerAdd: msg.sender,
    email: _email,
    phoneNo: _phoneNo,
    carbonIds: new uint[](0)
    });
    buyernId[_buyerId]= newBuyer;
    buyernAddress[msg.sender]= newBuyer;
    buyernName[_compName]= newBuyer;

    buyers.push(newBuyer);
    totalcompany++;

    emit buyerRegistered(_buyerId, _compName, _regPin, _category, _description, msg.sender, _email, _phoneNo,new uint[](0));
    }


    //function to register buyer
    function registerOffsetter( string memory _compName,uint _regPin,string memory _category,string memory _offSetCat,string memory _description,string memory _email,uint _phoneNo)
    public {
    require(!registeredOffsetter(msg.sender), "You are already registered as an offsetter");
    require(!registeredBuyer(msg.sender), "You are already registered as a buyer");
    uint _offsetterId = totalOffsetters;
    Offsetter memory newOffsetter = Offsetter({
    offsetterId: _offsetterId,
    compName: _compName,
    regPin: _regPin,
    category: _category,
    offSetCat: _offSetCat,
    description: _description,
    offsetterAdd: msg.sender,
    email: _email,
    phoneNo: _phoneNo,
    proposalIds: new uint[](0)
    });

    offSetternId[_offsetterId]= newOffsetter;
    offSetternAddress[msg.sender]= newOffsetter;
    offSetternName[_compName]= newOffsetter;

    offsetters.push(newOffsetter);
    totalOffsetters++;
    emit offsetterRegistered(_offsetterId, _compName, _regPin, _category, _offSetCat, _description, msg.sender, _email, _phoneNo , new uint[](0));
    }

    //fuction to make an offset proposal
    function makeOffsetProposal( string memory _category,string memory _description,string memory _ipfs,uint _estAmount) public {
    require(registeredOffsetter(msg.sender), "Please register as an offsetter first");
    uint _proposalId = totalOffsetProps;
    offsetProposal memory newProposal = offsetProposal({
    proposalId: _proposalId,
    category: _category,
    description: _description,
    estAmount: _estAmount,
    timestamp: block.timestamp,
    ipfsHash: _ipfs,
    offsetterAdd: msg.sender,
    yesVotes: 0,
    noVotes: 0,
    approved: false,
    votedvals: new address[](0)
    });
    offSetProposalnId[_proposalId]= newProposal;
    offSetProposalAddress[msg.sender]= newProposal;
    offSetternAddress[msg.sender].proposalIds.push(_proposalId);
    offsetProposals.push(newProposal);
    totalOffsetProps++;
    emit offsetProposalCreated(_proposalId, _category, _description, _estAmount, block.timestamp, _ipfs, msg.sender, false, new address[](0));
    }

    //function to register validator
    function registerValidator(string memory _name, uint _regNo) public {
    require(!registeredValidator(msg.sender), "You are already registered as a validator");
    require(!registeredBuyer(msg.sender), "You are  registered as a buyer");
    require(!registeredOffsetter(msg.sender), "You are  registered as an offsetter");
    uint _validatorId = totalValidators;
    validator memory newValidator = validator({
    validatorId: _validatorId,
    name: _name,
    regNo: _regNo,
    validatorAdd: msg.sender,
    proposalIds: new uint[](0)
    });
    validatornId[_validatorId]= newValidator;
    validatornName[_name]= newValidator;
    validatornAddress[msg.sender] = newValidator;
    totalValidators++;
    emit validatorRegistered(_validatorId, _name,_regNo, msg.sender);
    }

 //function to get Carbon credits
    function buyCarbonCredits(uint _estAmount) public payable {
        require(registeredBuyer(msg.sender), "Please register as a buyer first");
        require(super.balanceOf(msg.sender)>= _estAmount, "You have no sufficient CBT balance");
        _burn(msg.sender,_estAmount);
        uint _proposalId = totalProposals;
        boughtCredit memory newCredit = boughtCredit({
        proposalId: _proposalId,
        estAmount: _estAmount,
        timestamp: block.timestamp,
        buyerAdd: msg.sender
        });
        boughtCreditsId[_proposalId]= newCredit;
        boughtCreditsAddress[msg.sender]= newCredit;
        buyernAddress[msg.sender].carbonIds.push(_proposalId);
        boughtCredits.push(newCredit);
        totalProposals++;
        emit boughtCreditCreated(buyernAddress[msg.sender].buyerId,buyernAddress[msg.sender].compName, buyernAddress[msg.sender].regPin , msg.sender, _estAmount, block.timestamp);
    }

//function to buy CARBZ tokens
function getCarbz(uint _amount) public {
    _mint(msg.sender, _amount);
    emit minted(msg.sender, _amount);
}

//function to get Carbon Credits from address
    function getCarbonCredits( address _myadd) public view returns(boughtCredit memory){
        return boughtCreditsAddress[_myadd]; 
    }

    //function to get all offset Proposals
    function getOffsetProposals() public view returns(offsetProposal[] memory){
        return offsetProposals;
    }

    //function to get proposal from address
    function getProposal( address _myadd) public view returns(offsetProposal memory){
        return offSetProposalAddress[_myadd];
    }

    //function to get all offset Proposals
    function getOffsetProposal( uint _proposalId) public view returns(offsetProposal memory){
        return offSetProposalnId[_proposalId];
    }

    //function to get buyers credits
    function myCredits(uint [] memory _carbonIds) public view returns(boughtCredit[] memory){
        boughtCredit[] memory _boughtCredits = new boughtCredit[](_carbonIds.length);
        for(uint i = 0; i < _carbonIds.length; i++){
            _boughtCredits[i] = boughtCreditsId[_carbonIds[i]];
        }
        return _boughtCredits;        
    }

    //function to get offsetter offsets proposals
    function myOffsets(uint [] memory _offsetIds) public view returns(offsetProposal[] memory){
        offsetProposal[] memory _offsetProposals = new offsetProposal[](_offsetIds.length);
        for(uint i = 0; i < _offsetIds.length; i++){
            _offsetProposals[i] = offSetProposalnId[_offsetIds[i]];
        }
        return _offsetProposals;
        
    }

    //function to get struct from address
    function getStruct(address _myaddress) public view returns (Result memory) {
        for(uint i = 0; i < totalcompany; i++){
            if(buyers[i].buyerAdd == _myaddress){
                return Result(StructType.Buyer, buyers[i].buyerAdd, abi.encode(buyers[i]));
            }
        }
        for(uint j = 0; j < totalOffsetters; j++){
            if(offSetternId[j].offsetterAdd == _myaddress){
                return Result(StructType.Offsetter, offSetternId[j].offsetterAdd, abi.encode(offSetternId[j]));
            }
        }
        for(uint k = 0; k < totalValidators; k++){
            if(validatornId[k].validatorAdd == _myaddress){
                return Result(StructType.Validator, validatornId[k].validatorAdd, abi.encode(validatornId[k]));
            }
        }
        return Result(StructType.None, address(0), "");
    }

    //function to get offsetter details from address
    function getOffsetter(address _myaddress) public view returns(Offsetter memory){
        return offSetternAddress[_myaddress];
    }

    //function to get all offsetters
    function getOffsetters() public view returns(Offsetter[] memory){
        return offsetters;
    }

    //function to gett all buyers
    function getBuyers() public view returns(Buyer[] memory){
        return buyers;
    }

    //function to get buyer details from address
    function getBuyer(address _myaddress) public view returns(Buyer memory){
        return buyernAddress[_myaddress];
    }

    //function to get validator details from address
    function getValidator(address _myaddress) public view returns (validator memory){
        return validatornAddress[_myaddress];
    }

    //function to vote yes
    function voteYes( uint _proposalId) public {
        require(registeredValidator(msg.sender), "Only validators can vote");
        offSetProposalnId[_proposalId].yesVotes++;
        offSetProposalnId[_proposalId].votedvals.push(msg.sender);
        validatornAddress[msg.sender].proposalIds.push(_proposalId);
        approveProposal(_proposalId);
        emit validatorVoted(validatornAddress[msg.sender].validatorId, _proposalId,msg.sender);
    }

    //function to vote no
    function voteNo( uint _proposalId) public {
        require(registeredValidator(msg.sender), "Only validators can vote");
        offSetProposalnId[_proposalId].noVotes++;
        offSetProposalnId[_proposalId].votedvals.push(msg.sender);
        validatornAddress[msg.sender].proposalIds.push(_proposalId);
        approveProposal(_proposalId);
        emit validatorVoted(validatornAddress[msg.sender].validatorId, _proposalId,msg.sender);
    }

    //function to check if yes votes are greater than no votes
    function approveProposal( uint _proposalId) internal {
        if(offSetProposalnId[_proposalId].yesVotes > totalValidators/2){
            approveOffsetProposal(_proposalId);
        }
        return;        
    }

    //function to approve an offset proposal
    function approveOffsetProposal( uint _proposalId) public payable {
        require(registeredValidator(msg.sender), "Only validators can approve");
        require(offSetProposalnId[_proposalId].approved == false, "this proposal is already approved ");
        offSetProposalnId[_proposalId].approved = true;
        // Retrieve the receiver address and the amount to be sent
        address  receiver = offSetProposalnId[_proposalId].offsetterAdd;
        uint amount = offSetProposalnId[_proposalId].estAmount;
        string memory ipfsHash = offSetProposalnId[_proposalId].ipfsHash;
        uint compId = offSetternAddress[receiver].offsetterId;
        string memory compName = offSetternAddress[receiver].compName;
        uint regPin = offSetternAddress[receiver].regPin;
        // Check if the contract has enough cUSD to send
        require (cUSDToken.balanceOf(address(this)) >= amount, "Insufficient funds in contract");
        // Send cUSD to the receiver
       require(cUSDToken.transfer(receiver, amount), "Failed to transfer");
        // Emit the approval event
        emit offsetProposalApproved(compId, compName, regPin,  receiver, amount,_proposalId, ipfsHash);
        
        }

   // Function to get all approved proposals
    function getApprovedProposals() public view returns (offsetProposal[] memory) {
        uint approvedCount = 0;
        //  counting approved proposals
        for (uint i = 0; i < offsetProposals.length; i++) {
            if (offsetProposals[i].approved == true) {
                approvedCount++;
            }
        }
        //array to hold the approved proposals
        offsetProposal[] memory approvedProposals = new offsetProposal[](approvedCount);
        uint index = 0;

        //populating the approved proposals array
        for (uint i = 0; i < offsetProposals.length; i++) {
            if (offsetProposals[i].approved == true) {
                approvedProposals[index] = offsetProposals[i];
                index++;
            }
        }
        return approvedProposals;
    }

    //function to check if an address is registered
    function registeredBuyer( address _myadd) public view returns(bool){
    for (uint i=0; i < totalcompany; i++ ){
    if( buyernId[i].buyerAdd == _myadd ){
    return true;
    }
    }
    return false;}

    //function to check if an address is registered
    function registeredOffsetter( address _myadd) public view returns(bool){
    for (uint i=0; i < totalOffsetters; i++ ){
    if( offSetternId[i].offsetterAdd == _myadd){
    return true;
    }
    }
    return false;
    }

    //function to check if an address is registered validator
    function registeredValidator( address _myadd) public view returns(bool){
    for (uint i=0; i < totalValidators; i++ ){
    if( validatornId[i].validatorAdd == _myadd){
    return true;
    }
    }
    return false;}

    //function to withdraw from contract
    function withdraw( address _address) public payable onlyOwner{
        require(cUSDToken.balanceOf(address(this))>0, "No amount to withdraw");
        require(cUSDToken.transfer(_address, cUSDToken.balanceOf(address(this))), "Failed to transfer");
        emit withdrawalSuccessful(msg.sender, address(this).balance);        
    }

    //modifier for onlyOwner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

//function to check balance of CARBZ tokens
    function balanceOf(address _client) public view override returns (uint256) {
        return super.balanceOf(_client);
    }

//function to view contract balance
function contractBalance() public view returns(uint){
    return cUSDToken.balanceOf(address(this));
}

}


   


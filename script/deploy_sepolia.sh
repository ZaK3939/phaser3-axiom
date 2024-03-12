# Call script from root directory of repo: ./script/deploy_sepolia.sh

source .env
forge script script/AxiomGameDemo.s.sol:AxiomGameDemoScript --private-key $PRIVATE_KEY_SEPOLIA --broadcast --rpc-url $PROVIDER_URI_SEPOLIA -vvvv --verify --etherscan-api-key $ETHERSCAN_API_KEY
cp out/AxiomGameDemo.sol/AxiomGameDemo.json ./app/src/lib/abi/AxiomGameDemo.json
cp out/GameScore.sol/GameScore.json ./app/src/lib/abi/GameScore.json

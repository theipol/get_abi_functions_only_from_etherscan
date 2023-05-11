const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider());

const axios = require("axios");
const address = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"; //Bored Ape Contract Address

const params = {
  module: "contract",
  action: "getabi",
  address,
};

axios
  .get("https://api.etherscan.io/api", {
    params,
  })
  .then((response) => {
    const {
      data: { result },
    } = response;
    const jsonParsedContractABI = JSON.parse(result);
    const functions = jsonParsedContractABI
      .filter(
        (functionItem) => (functionItem.type = "function" && functionItem.name)
      )
      .map((X) => {
        const params = !X.input
          ? X.inputs.map((input) => {
              return `${input.name}:${input.type}`;
            })
          : undefined;
        return `${X.name}(${params})`;
      });
    console.log("🚀 ~ All Functions with parameters:", functions);
    return functions;
  })
  .catch((error) => {
    console.log(error);
  });

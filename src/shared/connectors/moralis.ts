type MoralisConnector = {
  actionID: string;
  chainID: string;
  patterns: {
    pattern_id: string;
    value: string;
  }[];
};

export default class Moralis {
  private static BASE_URL = 'https://deep-index.moralis.io/api/v2';

  static resolveConnector = (
    mConnector: MoralisConnector
  ): ((...args: any) => string) => {
    switch (mConnector.actionID) {
      // Balance - Get balance by wallet
      case '654680982835828':
        return (address: string, chain = 'eth') =>
          `${this.BASE_URL}/v2/${address}/erc20?chain=${chain}`;
      // Block - Get block by date
      case '523877556256031':
        return (chain = 'eth', date = 'string') =>
          `${this.BASE_URL}/dateToBlock?chain=${chain}&date=${date}`;
      // Block - Get block by hash
      case '1452042158655942':
        return (chain = 'eth', blockID: string) =>
          `${this.BASE_URL}/block/${blockID}?chain=${chain}`;
      // DEFI - Get pair address
      case '522697406056902':
        return (
          chain = 'eth',
          exchange = 'uniswapv3',
          token0: string,
          token1: string
        ) =>
          `${this.BASE_URL}/${token0}/${token1}/pairAddress?chain=${chain}&exchange=${exchange}`;
      // DEFI - Get pair reserves
      case '1557290888045944':
        return (chain = 'eth', address: string) =>
          `${this.BASE_URL}/${address}/reserves?chain=${chain}`;
      // Event - Get logs by contract
      case '525751418997290':
        return (chain = 'eth') =>
          `${this.BASE_URL}/address/logs?chain=${chain}`;
      // NFT - Get all transfers by contract
      case '937171100576587':
        return (chain = 'eth', address: string) =>
          `${this.BASE_URL}/nft/${address}/transfers?chain=${chain}&format=decimal`;
      // NFT - Get collection metadata
      case '2203313393161286':
        return (chain = 'eth', address: string) =>
          `${this.BASE_URL}/nft/${address}/metadata?chain=${chain}`;
      // NFT - Get collections by wallet
      case '442434717988347':
        return (chain = 'eth', address: string) =>
          `${this.BASE_URL}/${address}/nft/collections?chain=${chain}`;
      // NFT - Get lowest price
      case '1297330557707936':
        return (chain = 'eth', address: string) =>
          `${this.BASE_URL}/nft/${address}/lowestprice?chain=${chain}&marketplace=opensea`;
      // NFT - Get nft metadata
      case '1136445900333443':
        return (chain = 'eth', address: string, tokenID: string) =>
          `${this.BASE_URL}/nft/${address}/${tokenID}?chain=${chain}&format=decimal&normalizeMetadata=true`;
    }
  };
}

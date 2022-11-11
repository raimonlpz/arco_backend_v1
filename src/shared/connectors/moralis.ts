type MoralisConnector = {
  actionID: string;
  chainID: string;
  patterns: {
    pattern_id: string;
    value: string;
  }[];
};

export default class WEB3Provider {
  private static EVM_URL = 'https://deep-index.moralis.io/api/v2';
  private static SOL_URL = 'https://solana-gateway.moralis.io';

  // [GETs]
  static resolveConnector = (
    mConnector: MoralisConnector
  ): ((...args: string[]) => string) => {
    switch (mConnector.actionID) {
      /**
       ***************************** Balances *****************************
       */
      // Balance - Get balance by wallet
      case '654680982835828':
        return (address: string, chain = 'eth') =>
          `${this.EVM_URL}/v2/${address}/erc20?chain=${chain}`;
      /**
       ***************************** Blocks *****************************
       */
      // Block - Get block by date
      case '523877556256031':
        return (chain = 'eth', date: string) =>
          `${this.EVM_URL}/dateToBlock?chain=${chain}&date=${date}`;
      // Block - Get block by hash
      case '1452042158655942':
        return (chain = 'eth', blockID: string) =>
          `${this.EVM_URL}/block/${blockID}?chain=${chain}`;
      /**
       ***************************** DEFI *****************************
       */
      // DEFI - Get pair address
      case '522697406056902':
        return (
          chain = 'eth',
          exchange = 'uniswapv3',
          token0: string,
          token1: string
        ) =>
          `${this.EVM_URL}/${token0}/${token1}/pairAddress?chain=${chain}&exchange=${exchange}`;
      // DEFI - Get pair reserves
      case '1557290888045944':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/${address}/reserves?chain=${chain}`;
      /**
       ***************************** Events *****************************
       */
      // Event - Get logs by contract
      case '525751418997290':
        return (chain = 'eth') => `${this.EVM_URL}/address/logs?chain=${chain}`;
      // NFT - Get all transfers by contract
      case '937171100576587':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/nft/${address}/transfers?chain=${chain}&format=decimal`;
      /**
       ***************************** NFTs *****************************
       */
      // NFT - Get collection metadata
      case '2203313393161286':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/nft/${address}/metadata?chain=${chain}`;
      // NFT - Get collections by wallet
      case '442434717988347':
        return (chain = 'eth', wallet: string) =>
          `${this.EVM_URL}/${wallet}/nft/collections?chain=${chain}`;
      // NFT - Get lowest price
      case '1297330557707936':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/nft/${address}/lowestprice?chain=${chain}&marketplace=opensea`;
      // NFT - Get nft metadata
      case '1136445900333443':
        return (chain = 'eth', address: string, tokenID: string) =>
          `${this.EVM_URL}/nft/${address}/${tokenID}?chain=${chain}&format=decimal&normalizeMetadata=true`;
      // NFT - Get nfts by contract
      case '1304321556772525':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/nft/${address}?chain=${chain}&format=decimal&normalizeMetadata=true`;
      // NFT - Get nfts by wallet
      case '1209850519599243':
        return (chain = 'eth', wallet: string) =>
          `${this.EVM_URL}/${wallet}/nft?chain=${chain}&format=decimal&normalizeMetadata=true`;
      // NFT - Get owners by contract
      case '684110989585710':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/nft/${address}/owners?chain=${chain}&format=decimal&normalizeMetadata=false`;
      // NFT - Get owners by token ID
      case '647149190278160':
        return (chain = 'eth', address: string, tokenID: string) =>
          `${this.EVM_URL}/nft/${address}/${tokenID}/owners?chain=${chain}&format=decimal&normalizeMetadata=false`;
      // NFT - Get trades by marketplace
      case '1137693370518049':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/nft/${address}/trades?chain=${chain}&marketplace=opensea`;
      // NFT - Get nft transfers by block
      case '1123867985188862':
        return (chain = 'eth', blockN: string) =>
          `${this.EVM_URL}/block/${blockN}/nft/transfers?chain=${chain}&limit=100`;
      // NFT - Get nft transfers by contract
      case '1674954096234703':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/nft/${address}/transfers?chain=${chain}&format=decimal`;
      // NFT - Get nft transfers by wallet
      case '454590410097164':
        return (chain = 'eth', wallet: string) =>
          `${this.EVM_URL}/${wallet}/nft/transfers?chain=${chain}&format=decimal&direction=both`;
      // NFT - Get nft transfers from block to block
      case '854474602398661':
        return (chain = 'eth', from: string, to: string) =>
          `${this.EVM_URL}/nft/transfers?chain=${chain}&from_block=${from}&to_block=${to}&format=decimal`;
      // NFT - Free search
      case '442657351284368':
        return (chain = 'eth', filter = 'global', descriptors: string) =>
          `${this.EVM_URL}/nft/search?chain=${chain}&format=decimal&q=${descriptors}&filter=${filter}`;
      /**
       ***************************** Resolvers *****************************
       */
      // Resolver - Resolve ens name
      case '5591458647601102':
        return (address: string) =>
          `${this.EVM_URL}/resolve/${address}/reverse`;
      // Resolver - Resolve unstoppable domain
      case '842187703642337':
        return (domain: string) =>
          `${this.EVM_URL}/resolve/${domain}?currency=eth`;
      /**
       ******************************* Solana ****************************
       */
      // Solana - Get native balance by wallet
      case '784653845955967':
        return (address: string) =>
          `${this.SOL_URL}/account/mainnet/${address}/balance`;
      // Solana - Get nft contract metadata
      case '1206579323257913':
        return (address: string) =>
          `${this.SOL_URL}/nft/network/${address}/metadata`;
      // Solana - Get nfts owned
      case '841507616892138':
        return (address: string) =>
          `${this.SOL_URL}/account/network/${address}/nft`;
      // Solana - Get portfolio by wallet
      case '799523917926172':
        return (address: string) =>
          `${this.SOL_URL}account/network/${address}/portfolio`;
      // Solana - Get token balance by wallet
      case '507680271406470':
        return (address: string) =>
          `${this.SOL_URL}/account/network/${address}/tokens`;
      // Solana - Get token price
      case '1241460426702652':
        return (address: string) =>
          `${this.SOL_URL}/token/network/${address}/price`;
      /**
       ******************************* Tokens ****************************
       */
      // Token - Get balance by wallet
      case '949253332700548':
        return (chain = 'eth', wallet: string) =>
          `${this.EVM_URL}/${wallet}/erc20?chain=${chain}`;
      // Token - Get metadata by contract
      case '2981363208827761':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/erc20/metadata?chain=${chain}&addresses=${address}`;
      // Token - Get metadata by symbols
      case '2616060721870543':
        return (chain = 'eth', symbol: string) =>
          `${this.EVM_URL}/erc20/metadata/symbols?chain=${chain}&symbols=${symbol}`;
      // Token - Get price
      case '5572739362847437':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/erc20/${address}/price?chain=${chain}`;
      // Token - Get spender allowance
      case '5643857045659994':
        return (chain = 'eth', token: string, owner: string, spender: string) =>
          `${this.EVM_URL}/erc20/${token}/allowance?chain=${chain}h&owner_address=${owner}&spender_address=${spender}`;
      // Token - Get transactions by contract
      case '668019598041380':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/erc20/${address}/transfers?chain=${chain}`;
      // Token - Get transactions by wallet
      case '485258416896547':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/${address}/erc20/transfers?chain=${chain}`;
      /**
       ********************************** Transactions *********************************
       */
      // Transaction - Get transaction by hash
      case '523777972602491':
        return (chain = 'eth', hash: string) =>
          `${this.EVM_URL}/transaction/${hash}?chain=${chain}`;
      // Transaction - Get transactions by wallet
      case '537899531504823':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/${address}?chain=${chain}`;
      /**
       ******************************* ¡Action NOT FOUND! **********************
       */
      default:
        throw Error('Invalid action');
    }
  };
}

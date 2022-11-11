import { MoralisExecutor } from 'src/search/types/moralis-executor';

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
    mConnector: MoralisExecutor
  ): ((...args: string[]) => string) => {
    console.log(mConnector.entities.actions[0]);
    switch (mConnector.entities.actions[0]) {
      /**
       ***************************** Balances *****************************
       */
      // Balance - Get balance by wallet
      case '861435631882561':
        return (address: string, chain = 'eth') =>
          `${this.EVM_URL}/v2/${address}/erc20?chain=${chain}`;
      /**
       ***************************** Blocks *****************************
       */
      // Block - Get block by date
      case '506050018232792':
        return (chain = 'eth', date: string) =>
          `${this.EVM_URL}/dateToBlock?chain=${chain}&date=${date}`;
      // Block - Get block by hash
      case '1061690494458016':
        return (chain = 'eth', blockID: string) =>
          `${this.EVM_URL}/block/${blockID}?chain=${chain}`;
      /**
       ***************************** DEFI *****************************
       */
      // DEFI - Get pair address
      case '777485370015491':
        return (
          chain = 'eth',
          exchange = 'uniswapv3',
          token0: string,
          token1: string
        ) =>
          `${this.EVM_URL}/${token0}/${token1}/pairAddress?chain=${chain}&exchange=${exchange}`;
      // DEFI - Get pair reserves
      case '692396802308195':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/${address}/reserves?chain=${chain}`;
      /**
       ***************************** Events *****************************
       */
      // Event - Get logs by contract
      case '782585529488279':
        return (chain = 'eth') => `${this.EVM_URL}/address/logs?chain=${chain}`;
      /**
       ***************************** NFTs *****************************
       */
      // NFT - Get collection metadata
      case '2397255320427374':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/nft/${address}/metadata?chain=${chain}`;
      // NFT - Get collections by wallet
      case '2281828988633087':
        return (chain = 'eth', wallet: string) =>
          `${this.EVM_URL}/${wallet}/nft/collections?chain=${chain}`;
      // NFT - Get lowest price
      case '675619187502678':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/nft/${address}/lowestprice?chain=${chain}&marketplace=opensea`;
      // NFT - Get nft metadata
      case '842083873652927':
        return (chain = 'eth', address: string, tokenID: string) =>
          `${this.EVM_URL}/nft/${address}/${tokenID}?chain=${chain}&format=decimal&normalizeMetadata=true`;
      // NFT - Get nfts by contract
      case '835329507889192':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/nft/${address}?chain=${chain}&format=decimal&normalizeMetadata=true`;
      // NFT - Get nfts by wallet
      case '3437178786560398':
        return (chain = 'eth', wallet: string) =>
          `${this.EVM_URL}/${wallet}/nft?chain=${chain}&format=decimal&normalizeMetadata=true`;
      // NFT - Get owners by contract
      case '1151306745501879':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/nft/${address}/owners?chain=${chain}&format=decimal&normalizeMetadata=false`;
      // NFT - Get owners by token ID
      case '8428026627237615':
        return (chain = 'eth', address: string, tokenID: string) =>
          `${this.EVM_URL}/nft/${address}/${tokenID}/owners?chain=${chain}&format=decimal&normalizeMetadata=false`;
      // NFT - Get trades by marketplace
      case '1278553912967519':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/nft/${address}/trades?chain=${chain}&marketplace=opensea`;
      // NFT - Get nft transfers by block
      case '690282058869999':
        return (chain = 'eth', blockN: string) =>
          `${this.EVM_URL}/block/${blockN}/nft/transfers?chain=${chain}&limit=100`;
      // NFT - Get nft transfers by contract
      case '2664890450315051':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/nft/${address}/transfers?chain=${chain}&format=decimal`;
      // NFT - Get nft transfers by wallet
      case '822873695707041':
        return (chain = 'eth', wallet: string) =>
          `${this.EVM_URL}/${wallet}/nft/transfers?chain=${chain}&format=decimal&direction=both`;
      // NFT - Get nft transfers from block to block
      case '378002127805128':
        return (chain = 'eth', from: string, to: string) =>
          `${this.EVM_URL}/nft/transfers?chain=${chain}&from_block=${from}&to_block=${to}&format=decimal`;
      // NFT - Free search
      case '436101708673522':
        return (chain = 'eth', filter = 'global', descriptors: string) =>
          `${this.EVM_URL}/nft/search?chain=${chain}&format=decimal&q=${descriptors}&filter=${filter}`;
      /**
       ***************************** Resolvers *****************************
       */
      // Resolver - Resolve ens name
      case '783410986069459':
        return (address: string) =>
          `${this.EVM_URL}/resolve/${address}/reverse`;
      // Resolver - Resolve unstoppable domain
      case '3369216713290542':
        return (domain: string) =>
          `${this.EVM_URL}/resolve/${domain}?currency=eth`;
      /**
       ******************************* Solana ****************************
       */
      // Solana - Get native balance by wallet
      case '2306653156176873':
        return (address: string) =>
          `${this.SOL_URL}/account/mainnet/${address}/balance`;
      // Solana - Get nft contract metadata
      case '8620151908009887':
        return (address: string) =>
          `${this.SOL_URL}/nft/network/${address}/metadata`;
      // Solana - Get nfts owned
      case '979086632887022':
        return (address: string) =>
          `${this.SOL_URL}/account/network/${address}/nft`;
      // Solana - Get portfolio by wallet
      case '691197678806674':
        return (address: string) =>
          `${this.SOL_URL}account/network/${address}/portfolio`;
      // Solana - Get token balance by wallet
      case '1092555738100854':
        return (address: string) =>
          `${this.SOL_URL}/account/network/${address}/tokens`;
      // Solana - Get token price
      case '660494885679605':
        return (address: string) =>
          `${this.SOL_URL}/token/network/${address}/price`;
      /**
       ******************************* Tokens ****************************
       */
      // Token - Get balance by wallet
      case '489243316478024':
        return (chain = 'eth', wallet: string) =>
          `${this.EVM_URL}/${wallet}/erc20?chain=${chain}`;
      // Token - Get metadata by contract
      case '947262789963409':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/erc20/metadata?chain=${chain}&addresses=${address}`;
      // Token - Get metadata by symbols
      case '1525940594590120':
        return (chain = 'eth', symbol: string) =>
          `${this.EVM_URL}/erc20/metadata/symbols?chain=${chain}&symbols=${symbol}`;
      // Token - Get price
      case '520813466243104':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/erc20/${address}/price?chain=${chain}`;
      // Token - Get spender allowance
      case '477331057704365':
        return (chain = 'eth', token: string, owner: string, spender: string) =>
          `${this.EVM_URL}/erc20/${token}/allowance?chain=${chain}h&owner_address=${owner}&spender_address=${spender}`;
      // Token - Get transactions by contract
      case '6080231491995606':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/erc20/${address}/transfers?chain=${chain}`;
      // Token - Get transactions by wallet
      case '681180596568564':
        return (chain = 'eth', address: string) =>
          `${this.EVM_URL}/${address}/erc20/transfers?chain=${chain}`;
      /**
       ********************************** Transactions *********************************
       */
      // Transaction - Get transaction by hash
      case '464255779021107':
        return (chain = 'eth', hash: string) =>
          `${this.EVM_URL}/transaction/${hash}?chain=${chain}`;
      // Transaction - Get transactions by wallet
      case '1424124288407650':
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

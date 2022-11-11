import { MoralisExecutor } from 'src/search/types/moralis-executor';

/**
 * Reference: https://docs.moralis.io/reference
 */

class WEB3Provider {
  private static EVM_URL = 'https://deep-index.moralis.io/api/v2';
  private static SOL_URL = 'https://solana-gateway.moralis.io';

  static hydrateURL = (
    executor: MoralisExecutor,
    url: {
      fn: (...args: Args[]) => string;
      spec: string;
    }
  ): string => {
    // to-do
    console.log(executor, url);
    return '';
  };

  static resolvePatterns = () => {
    //
  };
  static resolveChains = () => {
    //
  };
  // [GETs]
  static resolveConnector = (
    mConnector: MoralisExecutor
  ): { fn: (...args: Args[]) => string; spec: string } => {
    switch (mConnector.entities.actions[0]) {
      /**
       ***************************** Balances *****************************
       */
      // Balance - Get balance by wallet
      case '861435631882561':
        return {
          fn: ({ chain = 'eth', address }) =>
            `${this.EVM_URL}/v2/${address}/erc20?chain=${chain}`,
          spec: 'chain,address',
        };
      /**
       ***************************** Blocks *****************************
       */
      // Block - Get block by date
      case '506050018232792':
        return {
          fn: ({ chain = 'eth', date }) =>
            `${this.EVM_URL}/dateToBlock?chain=${chain}&date=${date}`,
          spec: 'chain,date',
        };
      // Block - Get block by hash
      case '1061690494458016':
        return {
          fn: ({ chain = 'eth', blockID }) =>
            `${this.EVM_URL}/block/${blockID}?chain=${chain}`,
          spec: 'chain,blockID',
        };
      /**
       ***************************** DEFI *****************************
       */
      // DEFI - Get pair address
      case '777485370015491':
        return {
          fn: ({ chain = 'eth', exchange = 'uniswapv3', token0, token1 }) =>
            `${this.EVM_URL}/${token0}/${token1}/pairAddress?chain=${chain}&exchange=${exchange}`,
          spec: 'chain,exchange,token0,token1',
        };
      // DEFI - Get pair reserves
      case '692396802308195':
        return {
          fn: ({ chain = 'eth', address }) =>
            `${this.EVM_URL}/${address}/reserves?chain=${chain}`,
          spec: 'chain,address',
        };
      /**
       ***************************** Events *****************************
       */
      // Event - Get logs by contract
      case '782585529488279':
        return {
          fn: ({ chain = 'eth', address }) =>
            `${this.EVM_URL}/${address}/logs?chain=${chain}`,
          spec: 'chain,address',
        };
      /**
       ***************************** NFTs *****************************
       */
      // NFT - Get collection metadata
      case '2397255320427374':
        return {
          fn: ({ chain = 'eth', address }) =>
            `${this.EVM_URL}/nft/${address}/metadata?chain=${chain}`,
          spec: 'chain,address',
        };
      // NFT - Get collections by wallet
      case '2281828988633087':
        return {
          fn: ({ chain = 'eth', wallet }) =>
            `${this.EVM_URL}/${wallet}/nft/collections?chain=${chain}`,
          spec: 'chain,wallet',
        };
      // NFT - Get lowest price
      case '675619187502678':
        return {
          fn: ({ chain = 'eth', address }) =>
            `${this.EVM_URL}/nft/${address}/lowestprice?chain=${chain}&marketplace=opensea`,
          spec: 'chain,address',
        };
      // NFT - Get nft metadata
      case '842083873652927':
        return {
          fn: ({ chain = 'eth', address, tokenID }) =>
            `${this.EVM_URL}/nft/${address}/${tokenID}?chain=${chain}&format=decimal&normalizeMetadata=true`,
          spec: 'chain,address,tokenID',
        };
      // NFT - Get nfts by contract
      case '835329507889192':
        return {
          fn: ({ chain = 'eth', address }) =>
            `${this.EVM_URL}/nft/${address}?chain=${chain}&format=decimal&normalizeMetadata=true`,
          spec: 'chain,address',
        };
      // NFT - Get nfts by wallet
      case '3437178786560398':
        return {
          fn: ({ chain = 'eth', wallet }) =>
            `${this.EVM_URL}/${wallet}/nft?chain=${chain}&format=decimal&normalizeMetadata=true`,
          spec: 'chain,wallet',
        };
      // NFT - Get owners by contract
      case '1151306745501879':
        return {
          fn: ({ chain = 'eth', address }) =>
            `${this.EVM_URL}/nft/${address}/owners?chain=${chain}&format=decimal&normalizeMetadata=false`,
          spec: 'chain,address',
        };
      // NFT - Get owners by token ID
      case '8428026627237615':
        return {
          fn: ({ chain = 'eth', address, tokenID }) =>
            `${this.EVM_URL}/nft/${address}/${tokenID}/owners?chain=${chain}&format=decimal&normalizeMetadata=false`,
          spec: 'chain,address,tokenID',
        };
      // NFT - Get trades by marketplace
      case '1278553912967519':
        return {
          fn: ({ chain = 'eth', address }) =>
            `${this.EVM_URL}/nft/${address}/trades?chain=${chain}&marketplace=opensea`,
          spec: 'chain,address',
        };
      // NFT - Get nft transfers by block
      case '690282058869999':
        return {
          fn: ({ chain = 'eth', blockN }) =>
            `${this.EVM_URL}/block/${blockN}/nft/transfers?chain=${chain}&limit=100`,
          spec: 'chain,blockN',
        };
      // NFT - Get nft transfers by contract
      case '2664890450315051':
        return {
          fn: ({ chain = 'eth', address }) =>
            `${this.EVM_URL}/nft/${address}/transfers?chain=${chain}&format=decimal`,
          spec: 'chain,address',
        };
      // NFT - Get nft transfers by wallet
      case '822873695707041':
        return {
          fn: ({ chain = 'eth', wallet }) =>
            `${this.EVM_URL}/${wallet}/nft/transfers?chain=${chain}&format=decimal&direction=both`,
          spec: 'chain,wallet',
        };
      // NFT - Get nft transfers from block to block
      case '378002127805128':
        return {
          fn: ({ chain = 'eth', from, to }) =>
            `${this.EVM_URL}/nft/transfers?chain=${chain}&from_block=${from}&to_block=${to}&format=decimal`,
          spec: 'chain,from,to',
        };
      // NFT - Free search
      case '436101708673522':
        return {
          fn: ({ chain = 'eth', filter = 'global', descriptors }) =>
            `${this.EVM_URL}/nft/search?chain=${chain}&format=decimal&q=${descriptors}&filter=${filter}`,
          spec: 'chain,filter,descriptors',
        };
      /**
       ***************************** Resolvers *****************************
       */
      // Resolver - Resolve ens name
      case '783410986069459':
        return {
          fn: ({ address }) => `${this.EVM_URL}/resolve/${address}/reverse`,
          spec: 'address',
        };
      // Resolver - Resolve unstoppable domain
      case '3369216713290542':
        return {
          fn: ({ domain }) => `${this.EVM_URL}/resolve/${domain}?currency=eth`,
          spec: 'domain',
        };
      /**
       ******************************* Solana ****************************
       */
      // Solana - Get native balance by wallet
      case '2306653156176873':
        return {
          fn: ({ address }) =>
            `${this.SOL_URL}/account/mainnet/${address}/balance`,
          spec: 'address',
        };
      // Solana - Get nft contract metadata
      case '8620151908009887':
        return {
          fn: ({ address }) =>
            `${this.SOL_URL}/nft/network/${address}/metadata`,
          spec: 'address',
        };
      // Solana - Get nfts owned
      case '979086632887022':
        return {
          fn: ({ address }) => `${this.SOL_URL}/account/network/${address}/nft`,
          spec: 'address',
        };
      // Solana - Get portfolio by wallet
      case '691197678806674':
        return {
          fn: ({ address }) =>
            `${this.SOL_URL}account/network/${address}/portfolio`,
          spec: 'address',
        };
      // Solana - Get token balance by wallet
      case '1092555738100854':
        return {
          fn: ({ address }) =>
            `${this.SOL_URL}/account/network/${address}/tokens`,
          spec: 'address',
        };
      // Solana - Get token price
      case '660494885679605':
        return {
          fn: ({ address }) => `${this.SOL_URL}/token/network/${address}/price`,
          spec: 'address',
        };
      /**
       ******************************* Tokens ****************************
       */
      // Token - Get balance by wallet
      case '489243316478024':
        return {
          fn: ({ chain = 'eth', wallet }) =>
            `${this.EVM_URL}/${wallet}/erc20?chain=${chain}`,
          spec: 'chain,wallet',
        };
      // Token - Get metadata by contract
      case '947262789963409':
        return {
          fn: ({ chain = 'eth', address }) =>
            `${this.EVM_URL}/erc20/metadata?chain=${chain}&addresses=${address}`,
          spec: 'chain,address',
        };
      // Token - Get metadata by symbols
      case '1525940594590120':
        return {
          fn: ({ chain = 'eth', symbol }) =>
            `${this.EVM_URL}/erc20/metadata/symbols?chain=${chain}&symbols=${symbol}`,
          spec: 'chain,symbol',
        };
      // Token - Get price
      case '520813466243104':
        return {
          fn: ({ chain = 'eth', address }) =>
            `${this.EVM_URL}/erc20/${address}/price?chain=${chain}`,
          spec: 'chain,address',
        };
      // Token - Get spender allowance
      case '477331057704365':
        return {
          fn: ({ chain = 'eth', token, owner, spender }) =>
            `${this.EVM_URL}/erc20/${token}/allowance?chain=${chain}h&owner_address=${owner}&spender_address=${spender}`,
          spec: 'chain,token,owner,spender',
        };
      // Token - Get transactions by contract
      case '6080231491995606':
        return {
          fn: ({ chain = 'eth', address }) =>
            `${this.EVM_URL}/erc20/${address}/transfers?chain=${chain}`,
          spec: 'chain,address',
        };
      // Token - Get transactions by wallet
      case '681180596568564':
        return {
          fn: ({ chain = 'eth', address }) =>
            `${this.EVM_URL}/${address}/erc20/transfers?chain=${chain}`,
          spec: 'chain,address',
        };
      /**
       ********************************** Transactions *********************************
       */
      // Transaction - Get transaction by hash
      case '464255779021107':
        return {
          fn: ({ chain = 'eth', hash }) =>
            `${this.EVM_URL}/transaction/${hash}?chain=${chain}`,
          spec: 'chain,hash',
        };
      // Transaction - Get transactions by wallet
      case '1424124288407650':
        return {
          fn: ({ chain = 'eth', address }) =>
            `${this.EVM_URL}/${address}?chain=${chain}`,
          spec: 'chain,address',
        };
      /**
       ******************************* ¡Action NOT FOUND! **********************
       */
      default:
        throw Error('Invalid actor');
    }
  };
}

type Args = {
  chain?: string;
  address?: string;
  date?: string;
  blockID?: string;
  exchange?: string;
  token?: string;
  token0?: string;
  token1?: string;
  wallet?: string;
  tokenID?: string;
  blockN?: string;
  from?: string;
  to?: string;
  filter?: string;
  descriptors?: string;
  domain?: string;
  symbol?: string;
  owner?: string;
  spender?: string;
  hash?: string;
};

export { Args, WEB3Provider };

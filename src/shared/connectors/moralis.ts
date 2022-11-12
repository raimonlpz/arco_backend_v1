import { MoralisExecutor } from 'src/search/types/moralis-executor';

/**
 *  Endpoints Reference: https://docs.moralis.io/reference (Web3 Provider)
 */

class WEB3Provider {
  private static EVM_URL = 'https://deep-index.moralis.io/api/v2';
  private static SOL_URL = 'https://solana-gateway.moralis.io';

  /**
   *
   * @param mConnector
   * @returns API call specification + URL templates to be hydrated with params.
   */
  static resolveConnector = (
    mConnector: MoralisExecutor
  ): { fn: (args: Args) => string; spec: string } => {
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
          fn: ({
            chain = 'eth',
            exchange = 'uniswapv3',
            token_pair1,
            token_pair2,
          }) =>
            `${this.EVM_URL}/${token_pair1}/${token_pair2}/pairAddress?chain=${chain}&exchange=${exchange}`,
          spec: 'chain,exchange,token_pair1,token_pair2',
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

  /**
   *
   * @param executor
   * @param url
   * @returns String with URL composed ready to be used against Moralis server (Web3 Provider)
   */
  static hydrateURL = (
    executor: MoralisExecutor,
    url: {
      fn: (args: Args) => string;
      spec: string;
    }
  ): string => {
    const pattern = (patternID: string, def: string) => {
      const patternIdx = executor.entities.patterns.findIndex(
        (pattern) => pattern.pattern_id == patternID
      );
      if (patternIdx > -1) {
        const value = executor.entities.patterns[patternIdx].value;
        executor.entities.patterns.splice(patternIdx, 1);
        return value;
      }
      return def;
    };
    const spec = url.spec.split(',');
    const params: Args = {};
    spec.forEach((param) => {
      switch (param) {
        case 'chain':
          if (executor.entities.chains.length > 0) {
            params[param] = this.resolveChain(executor.entities.chains[0]);
          } else {
            params[param] = DEFAULTS.CHAIN;
          }
          break;
        case 'address':
        case 'wallet':
        case 'token':
        case 'token_pair1':
        case 'token_pair2':
        case 'owner':
        case 'spender':
          // PATTERN_by_wallet_or_contract
          params[param] = pattern('470228255107181', DEFAULTS.ADDRESS);
          break;
        case 'date':
          // PATTERN_from_to_date
          params[param] = pattern('663110085531183', DEFAULTS.DATE);
          break;
        case 'blockID':
          // PATTERN_block_id
          params[param] = pattern('3394400600885983', DEFAULTS.BLOCK_ID);
          break;
        case 'exchange':
          // PATTERN_exchange
          params[param] = pattern('661054248982179', DEFAULTS.EXCHANGE);
          break;
        case 'tokenID':
          // PATTERN_by_token_id
          params[param] = pattern('686278616170279', DEFAULTS.TOKEN_ID);
          break;
        case 'blockN':
        case 'from':
        case 'to':
          // PATTERN_from_to_block
          params[param] = pattern('785687105835106', DEFAULTS.BLOCK_ID);
          break;
        case 'filter':
          // Default (by now)
          params[param] = 'global';
          break;
        case 'descriptors':
          // PATTERN_nft_free_search
          params[param] = pattern('1133498020610082', DEFAULTS.FREE_SEARCH);
          break;
        case 'domain':
          // PATTERN_uns_domain
          params[param] = pattern('855884608780237', DEFAULTS.UNS_DOM);
          break;
        case 'symbol':
          // PATTERN_by_token_symbol
          params[param] = pattern('1153808938550177', DEFAULTS.SYMBOL);
          break;
        case 'hash':
          // PATTERN_transaction_hash
          params[param] = pattern('1195082887748742', DEFAULTS.HASH);
          break;
        default:
          return;
      }
    });
    return url.fn(params);
  };

  /**
   *
   * @param chainID
   * @returns Hex code for chains -> https://docs.moralis.io/docs/what-is-streams-api-1#supported-chains
   */
  static resolveChain = (chainID: string): string => {
    switch (chainID) {
      // Arbitrum
      case '1306660666757475':
        return '0x66eed';
      // Avalanche
      case '2033966263465530':
        return '0xa86a';
      // Binance Chain
      case '455885466646961':
        return '0x38';
      // Cronos
      case '477600647673720':
        return '0x19';
      // Ethereum
      case '1564560644009223':
        return '0x1';
      // Fantom
      case '1127734044804114':
        return '0xfa';
      // Goerli (testnet)
      case '666447601523052':
        return '0x5';
      // Mumbai (testnet)
      case '808671833774231':
        return '0x13881';
      // Polygon
      case '1176377562956057':
        return '0x89';
      // Solana
      case '506186854885784':
        return ''; // diff endpoints
      // Optimism
      case '1071244096884678':
        return '0xa';
      // Ronin
      case '1834632213538082':
        return '0x7e4';
      default:
        throw Error('Unknown chain');
    }
  };
}

class DEFAULTS {
  static CHAIN = '0x1';
  static ADDRESS = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
  static DATE = Date.now().toString();
  static BLOCK_ID = '15897680';
  static EXCHANGE = 'uniswapv2';
  static TOKEN_ID = '1';
  static FREE_SEARCH = 'pixel-art avatars';
  static UNS_DOM = 'matt.crypto';
  static SYMBOL = 'GNO';
  static HASH =
    '0x56e98b5cb905597e6e09cab388bc9cf7e676f8ff6a19b08e12c0c91dfab872ab';
}

type Args = {
  chain?: string;
  address?: string;
  date?: string;
  blockID?: string;
  exchange?: string;
  token?: string;
  token_pair1?: string;
  token_pair2?: string;
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

type Entity = {
  id: string;
  name: string;
};

const ENTITIES: Entity[] = [
  /**
   ******************************************** BALANCE **********************************************
   */
  {
    id: '861435631882561',
    name: 'BALANCE_get_balance_by_wallet',
  },
  /**
   ******************************************** BLOCK **********************************************
   */
  {
    id: '506050018232792',
    name: 'BLOCK_get_block_by_date',
  },
  {
    id: '1061690494458016',
    name: 'BLOCK_get_block_by_hash',
  },
  /**
   ******************************************** CHAIN **********************************************
   */
  {
    id: '1306660666757475',
    name: 'CHAIN_arbitrum',
  },
  {
    id: '2033966263465530',
    name: 'CHAIN_avalanche',
  },
  {
    id: '455885466646961',
    name: 'CHAIN_bsc',
  },
  {
    id: '477600647673720',
    name: 'CHAIN_cronos',
  },
  {
    id: '1564560644009223',
    name: 'CHAIN_eth',
  },
  {
    id: '1127734044804114',
    name: 'CHAIN_fantom',
  },
  {
    id: '666447601523052',
    name: 'CHAIN_goerli',
  },
  {
    id: '808671833774231',
    name: 'CHAIN_mumbai',
  },
  {
    id: '1176377562956057',
    name: 'CHAIN_polygon',
  },
  {
    id: '506186854885784',
    name: 'CHAIN_solana',
  },
  {
    id: '1071244096884678',
    name: 'CHAIN_optimism',
  },
  {
    id: '1834632213538082',
    name: 'CHAIN_ronin',
  },
  /**
   ******************************************** DEFI **********************************************
   */
  {
    id: '777485370015491',
    name: 'DEFI_get_pair_address',
  },
  {
    id: '692396802308195',
    name: 'DEFI_get_pair_reserves',
  },
  /**
   ******************************************** EVENT **********************************************
   */
  {
    id: '1336021603881044',
    name: 'EVENT_get_events_by_contract',
  },
  {
    id: '782585529488279',
    name: 'EVENT_get_logs_by_contract',
  },
  /**
   ******************************************** NFTs **********************************************
   */
  {
    id: '644840817036834',
    name: 'NFT_get_all_transfers_by_contract',
  },
  {
    id: '2397255320427374',
    name: 'NFT_get_collection_metadata',
  },
  {
    id: '2281828988633087',
    name: 'NFT_get_collections_by_wallet',
  },
  {
    id: '675619187502678',
    name: 'NFT_get_lowest_price',
  },
  {
    id: '842083873652927',
    name: 'NFT_get_nft_metadata',
  },
  {
    id: '835329507889192',
    name: 'NFT_get_nfts_by_contract',
  },
  {
    id: '3437178786560398',
    name: 'NFT_get_nfts_by_wallet',
  },
  {
    id: '1151306745501879',
    name: 'NFT_get_owners_by_contract',
  },
  {
    id: '8428026627237615',
    name: 'NFT_get_owners_by_token_id',
  },
  {
    id: '1278553912967519',
    name: 'NFT_get_trades_by_marketplace',
  },
  {
    id: '690282058869999',
    name: 'NFT_get_transfers_by_block',
  },
  {
    id: '2664890450315051',
    name: 'NFT_get_transfers_by_contract',
  },
  {
    id: '822873695707041',
    name: 'NFT_get_transfers_by_wallet',
  },
  {
    id: '378002127805128',
    name: 'NFT_get_transfers_from_block_to_block',
  },
  {
    id: '436101708673522',
    name: 'NFT_search_nfts',
  },
  /**
   ******************************************** PATTERN **********************************************
   */
  {
    id: '3394400600885983',
    name: 'PATTERN_block_id',
  },
  {
    id: '686278616170279',
    name: 'PATTERN_by_token_id',
  },
  {
    id: '1153808938550177',
    name: 'PATTERN_by_token_symbol',
  },
  {
    id: '470228255107181',
    name: 'PATTERN_by_wallet_or_contract',
  },
  {
    id: '518730806767297',
    name: 'PATTERN_ens_alias',
  },
  {
    id: '785687105835106',
    name: 'PATTERN_from_to_block',
  },
  {
    id: '663110085531183',
    name: 'PATTERN_from_to_date',
  },
  {
    id: '1133498020610082',
    name: 'PATTERN_nft_free_search',
  },
  {
    id: '1146288606283738',
    name: 'PATTERN_size_limit',
  },
  {
    id: '679769890433980',
    name: 'PATTERN_token_tag_search',
  },
  {
    id: '855884608780237',
    name: 'PATTERN_uns_domain',
  },
  {
    id: '661054248982179',
    name: 'PATTERN_exchange',
  },
  {
    id: '1195082887748742',
    name: 'PATTERN_transaction_hash',
  },
  /**
   ******************************************** RESOLVERS **********************************************
   */
  {
    id: '783410986069459',
    name: 'RESOLVER_resolve_ens_name',
  },
  {
    id: '3369216713290542',
    name: 'RESOLVER_unstoppable_domain',
  },
  /**
   ******************************************** SOLANA **********************************************
   */
  {
    id: '2306653156176873',
    name: 'SOLANA_get_native_balance',
  },
  {
    id: '8620151908009887',
    name: 'SOLANA_get_nft_contract_metadata',
  },
  {
    id: '979086632887022',
    name: 'SOLANA_get_nfts_owned',
  },
  {
    id: '691197678806674',
    name: 'SOLANA_get_portfolio',
  },
  {
    id: '1092555738100854',
    name: 'SOLANA_get_token_balance',
  },
  {
    id: '660494885679605',
    name: 'SOLANA_get_token_price',
  },
  /**
   ******************************************** TOKEN **********************************************
   */
  {
    id: '489243316478024',
    name: 'TOKEN_get_balance_by_wallet',
  },
  {
    id: '947262789963409',
    name: 'TOKEN_get_metadata_by_contract',
  },
  {
    id: '1525940594590120',
    name: 'TOKEN_get_metadata_by_symbols',
  },
  {
    id: '520813466243104',
    name: 'TOKEN_get_price',
  },
  {
    id: '477331057704365',
    name: 'TOKEN_get_spender_allowance',
  },
  {
    id: '6080231491995606',
    name: 'TOKEN_get_transactions_by_contract',
  },
  {
    id: '681180596568564',
    name: 'TOKEN_get_transactions_by_wallet',
  },
  /**
   ******************************************** TRANSACTION **********************************************
   */
  {
    id: '464255779021107',
    name: 'TRANSACTION_get_transaction_by_hash',
  },
  {
    id: '1424124288407650',
    name: 'TRANSACTION_get_transactions_by_wallet',
  },
];

export { ENTITIES, Entity };

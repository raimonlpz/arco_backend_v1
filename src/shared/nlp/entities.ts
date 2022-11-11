type Entity = {
  id: string;
  name: string;
};

const ENTITIES: Entity[] = [
  /**
   ******************************************** BALANCE **********************************************
   */
  {
    id: '654680982835828',
    name: 'BALANCE_get_balance_by_wallet',
  },
  /**
   ******************************************** BLOCK **********************************************
   */
  {
    id: '523877556256031',
    name: 'BLOCK_get_block_by_date',
  },
  {
    id: '1452042158655942',
    name: 'BLOCK_get_block_by_hash',
  },
  /**
   ******************************************** CHAIN **********************************************
   */
  {
    id: '364843612473226',
    name: 'CHAIN_arbitrum',
  },
  {
    id: '609951020829266',
    name: 'CHAIN_avalanche',
  },
  {
    id: '667077984813023',
    name: 'CHAIN_bsc',
  },
  {
    id: '808111740440636',
    name: 'CHAIN_cronos',
  },
  {
    id: '3303664573230871',
    name: 'CHAIN_eth',
  },
  {
    id: '1134895654068401',
    name: 'CHAIN_fantom',
  },
  {
    id: '866814014499359',
    name: 'CHAIN_goerli',
  },
  {
    id: '916226509357994',
    name: 'CHAIN_mumbai',
  },
  {
    id: '511752440594270',
    name: 'CHAIN_polygon',
  },
  {
    id: '1157126915237008',
    name: 'CHAIN_solana',
  },
  /**
   ******************************************** DEFI **********************************************
   */
  {
    id: '522697406056902',
    name: 'DEFI_get_pair_address',
  },
  {
    id: '1557290888045944',
    name: 'DEFI_get_pair_reserves',
  },
  /**
   ******************************************** EVENT **********************************************
   */
  {
    id: '824911008929672',
    name: 'EVENT_get_events_by_contract',
  },
  {
    id: '525751418997290',
    name: 'EVENT_get_logs_by_contract',
  },
  /**
   ******************************************** NFTs **********************************************
   */
  {
    id: '937171100576587',
    name: 'NFT_get_all_transfers_by_contract',
  },
  {
    id: '2203313393161286',
    name: 'NFT_get_collection_metadata',
  },
  {
    id: '442434717988347',
    name: 'NFT_get_collections_by_wallet',
  },
  {
    id: '1297330557707936',
    name: 'NFT_get_lowest_price',
  },
  {
    id: '1136445900333443',
    name: 'NFT_get_nft_metadata',
  },
  {
    id: '1304321556772525',
    name: 'NFT_get_nfts_by_contract',
  },
  {
    id: '1209850519599243',
    name: 'NFT_get_nfts_by_wallet',
  },
  {
    id: '684110989585710',
    name: 'NFT_get_owners_by_contract',
  },
  {
    id: '647149190278160',
    name: 'NFT_get_owners_by_token_id',
  },
  {
    id: '1137693370518049',
    name: 'NFT_get_trades_by_marketplace',
  },
  {
    id: '1123867985188862',
    name: 'NFT_get_transfers_by_block',
  },
  {
    id: '1674954096234703',
    name: 'NFT_get_transfers_by_contract',
  },
  {
    id: '454590410097164',
    name: 'NFT_get_transfers_by_wallet',
  },
  {
    id: '854474602398661',
    name: 'NFT_get_transfers_from_block_to_block',
  },
  {
    id: '442657351284368',
    name: 'NFT_search_nfts',
  },
  /**
   ******************************************** PATTERN **********************************************
   */
  {
    id: '499025435476185',
    name: 'PATTERN_block_id',
  },
  {
    id: '1830886527261614',
    name: 'PATTERN_by_token_id',
  },
  {
    id: '5351499638232182',
    name: 'PATTERN_by_token_symbol',
  },
  {
    id: '1641817499549002',
    name: 'PATTERN_by_wallet_or_contract',
  },
  {
    id: '5919874708031586',
    name: 'PATTERN_ens_alias',
  },
  {
    id: '530761825235215',
    name: 'PATTERN_from_to_block',
  },
  {
    id: '5552905464801494',
    name: 'PATTERN_from_to_date',
  },
  {
    id: '5513568482084847',
    name: 'PATTERN_nft_free_search',
  },
  {
    id: '1314090409418387',
    name: 'PATTERN_size_limit',
  },
  {
    id: '5661022124017913',
    name: 'PATTERN_token_tag_search',
  },
  {
    id: '831062241577621',
    name: 'PATTERN_uns_domain',
  },
  /**
   ******************************************** RESOLVERS **********************************************
   */
  {
    id: '5591458647601102',
    name: 'RESOLVER_resolve_ens_name',
  },
  {
    id: '842187703642337',
    name: 'RESOLVER_unstoppable_domain',
  },
  /**
   ******************************************** SOLANA **********************************************
   */
  {
    id: '784653845955967',
    name: 'SOLANA_get_native_balance',
  },
  {
    id: '1206579323257913',
    name: 'SOLANA_get_nft_contract_metadata',
  },
  {
    id: '841507616892138',
    name: 'SOLANA_get_nfts_owned',
  },
  {
    id: '799523917926172',
    name: 'SOLANA_get_portfolio',
  },
  {
    id: '507680271406470',
    name: 'SOLANA_get_token_balance',
  },
  {
    id: '1241460426702652',
    name: 'SOLANA_get_token_price',
  },
  /**
   ******************************************** TOKEN **********************************************
   */
  {
    id: '949253332700548',
    name: 'TOKEN_get_balance_by_wallet',
  },
  {
    id: '2981363208827761',
    name: 'TOKEN_get_metadata_by_contract',
  },
  {
    id: '2616060721870543',
    name: 'TOKEN_get_metadata_by_symbols',
  },
  {
    id: '5572739362847437',
    name: 'TOKEN_get_price',
  },
  {
    id: '5643857045659994',
    name: 'TOKEN_get_spender_allowance',
  },
  {
    id: '668019598041380',
    name: 'TOKEN_get_transactions_by_contract',
  },
  {
    id: '485258416896547',
    name: 'TOKEN_get_transactions_by_wallet',
  },
  /**
   ******************************************** TRANSACTION **********************************************
   */
  {
    id: '523777972602491',
    name: 'TRANSACTION_get_transaction_by_hash',
  },
  {
    id: '537899531504823',
    name: 'TRANSACTION_get_transactions_by_wallet',
  },
];

export { ENTITIES, Entity };

type Entity = {
  id: string;
  name: string;
};

const ENTITIES: Entity[] = [
  // Balance
  { id: '654680982835828', name: 'BALANCE_get_balance_by_wallet' },
  // Block
  { id: '523877556256031', name: 'BLOCK_get_block_by_date' },
  { id: '1452042158655942', name: 'BLOCK_get_block_by_hash' },
  // Chains
  { id: '364843612473226', name: 'CHAIN_arbitrum' },
  { id: '609951020829266', name: 'CHAIN_avalanche' },
  { id: '667077984813023', name: 'CHAIN_bsc' },
  { id: '808111740440636', name: 'CHAIN_cronos' },
  { id: '3303664573230871', name: 'CHAIN_eth' },
  { id: '1134895654068401', name: 'CHAIN_fantom' },
  { id: '866814014499359', name: 'CHAIN_goerli' },
  { id: '916226509357994', name: 'CHAIN_mumbai' },
  { id: '511752440594270', name: 'CHAIN_polygon' },
  { id: '1157126915237008', name: 'CHAIN_solana' },
  // DeFi
  { id: '522697406056902', name: 'DEFI_get_pair_address' },
  { id: '1557290888045944', name: 'DEFI_get_pair_reserves' },
  // Events
  { id: '824911008929672', name: 'EVENT_get_events_by_contract' },
  { id: '525751418997290', name: 'EVENT_get_logs_by_contract' },
  // NFTs
  { id: '937171100576587', name: 'NFT_get_all_transfers_by_contract' },
  { id: '2203313393161286', name: 'NFT_get_collection_metadata' },
  { id: '442434717988347', name: 'NFT_get_collections_by_wallet' },
  { id: '1297330557707936', name: 'NFT_get_lowest_price' },
  { id: '1136445900333443', name: 'NFT_get_nft_metadata' },
  { id: '1304321556772525', name: 'NFT_get_nfts_by_contract' },
];

export { ENTITIES };

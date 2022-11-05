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
  // Chain
  { id: '364843612473226', name: 'CHAIN_arbitrum' },
  { id: '609951020829266', name: 'CHAIN_avalanche' },
  { id: '667077984813023', name: 'CHAIN_bsc' },
  { id: '808111740440636', name: 'CHAIN_cronos' },
  { id: '3303664573230871', name: 'CHAIN_eth' },
  { id: '1134895654068401', name: 'CHAIN_fantom' },
];

export { ENTITIES, Entity };

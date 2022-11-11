type Intent = {
  id: string;
  name: string;
};

const INTENTS: Intent[] = [
  {
    id: '445238024390998',
    name: 'BALANCE_API',
  },
  {
    id: '551850093416283',
    name: 'BLOCK_API',
  },
  {
    id: '430326582606727',
    name: 'DEFI_API',
  },
  {
    id: '3391750947773831',
    name: 'EVENTS_API',
  },
  {
    id: '830705604737619',
    name: 'NFT_API',
  },
  {
    id: '975055560122217',
    name: 'RESOLVER_API',
  },
  {
    id: '853458926071316',
    name: 'SOLANA_API',
  },
  {
    id: '972016364200637',
    name: 'TOKEN_API',
  },
  {
    id: '784600309278248',
    name: 'TRANSACTION_API',
  },
];

export { INTENTS, Intent };

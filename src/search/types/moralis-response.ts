import { Entity } from 'src/shared/nlp/entities';

type MoralisResponse = {
  data: any; // Moralis dynamic response
  action: Entity;
};

export { MoralisResponse };

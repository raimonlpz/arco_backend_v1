import { EntityOracle, WITResolver } from 'src/search/types';
import { MoralisExecutor } from 'src/search/types/moralis-executor';

/**
 *  Endpoints Reference: https://wit.ai/
 */

export default class WIT {
  private static BASE_URL = 'https://api.wit.ai';

  // [GETs]
  static query = (query: string) => `${this.BASE_URL}/message?q=${query}`;
  static intents = () => `${this.BASE_URL}/intents`;
  static entities = () => `${this.BASE_URL}/entities`;
  static traits = () => `${this.BASE_URL}/traits`;
  static utterances = (limit: number) =>
    `${this.BASE_URL}/utterances?limit=${limit}`;

  // Unpack resolver
  static unpackResolver = (resolver: WITResolver): MoralisExecutor => {
    const mExecutor: MoralisExecutor = {
      // Scheme
      intent: resolver.intents[0].id, // Intent appended (max. 1)
      entities: {
        actions: [],
        chains: [],
        patterns: [],
      },
      traits: [],
    };

    const scanEntities = (entities: { [key: string]: EntityOracle[] }) => {
      // Entities appended
      Object.keys(entities).forEach((key) => {
        if (key.startsWith('CHAIN')) {
          // CHAINS
          mExecutor.entities.chains.push(entities[key][0].id); // (max. 1 -first-)
        } else if (key.startsWith('PATTERN')) {
          // PATTERNS
          entities[key].forEach((nestedKey) => {
            mExecutor.entities.patterns.push({
              pattern_id: nestedKey.id,
              value: nestedKey.value,
            });
          });
        } else {
          // ACTIONS (all) - NFT, TRANSFERS, DEFI, BLOCKS, EVENTS...
          mExecutor.entities.actions.push(entities[key][0].id); // (max. 1 -first-)
        }
        // Nested entities check -> Recursive hack
        entities[key].forEach((nestedKey) => {
          if (Object.keys(nestedKey.entities).length > 0) {
            scanEntities(nestedKey.entities);
          }
        });
      });
    };

    scanEntities(resolver.entities);

    // Traits appended
    Object.keys(resolver.traits).forEach((key) => {
      resolver.traits[key].forEach((nestedKey) => {
        mExecutor.traits.push({
          trait_id: nestedKey.id,
          trait_name: key,
          value: nestedKey.value,
        });
      });
    });

    return mExecutor;
  };
}

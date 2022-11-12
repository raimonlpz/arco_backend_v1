import { WITResolver } from 'src/search/types';
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
      intent: resolver.intents[0].id, // Intent appended
      entities: {
        actions: [],
        chains: [],
        patterns: [],
      },
      traits: [],
    };

    // Entities appended
    Object.keys(resolver.entities).forEach((key) => {
      if (key.startsWith('CHAIN')) {
        // CHAINS
        mExecutor.entities.chains.push(resolver.entities[key][0].id);
      } else if (key.startsWith('PATTERN')) {
        // PATTERNS
        mExecutor.entities.patterns.push({
          pattern_id: resolver.entities[key][0].id,
          value: resolver.entities[key][0].value,
        });
      } else {
        // ACTIONS (all) - NFT, TRANSFERS, DEFI, BLOCKS, EVENTS...
        mExecutor.entities.actions.push(resolver.entities[key][0].id);
      }
    });

    // Traits appended
    Object.keys(resolver.traits).forEach((key) => {
      mExecutor.traits.push({
        trait_id: resolver.traits[key][0].id,
        trait_name: key,
        value: resolver.traits[key][0].value,
      });
    });

    return mExecutor;
  };
}

export class SubscriptionDto {
  bookmarker: {
    intent: string;

    entities: {
      actions: string[];
      patterns: {
        pattern_id: string;
        value: string;
      }[];
      chains: string[];
    };

    traits: {
      trait_id: string;
      trait_name: string;
      value: string;
    }[];
  };
}

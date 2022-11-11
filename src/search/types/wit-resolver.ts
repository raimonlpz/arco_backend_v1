/**
 * Types defined according to Wit.AI Standard API responses
 */

type WITResolver = {
  entities: { [key: string]: EntityOracle[] };
  intents: IntentOracle[];
  text: string;
  traits: { [key: string]: TraitOracle[] };
};

type EntityOracle = {
  body: string;
  confidence: number;
  end: string;
  entities: { string: EntityOracle[] };
  id: string;
  name: string;
  role: string;
  start: number;
  type: string;
  value: string;
};

type IntentOracle = {
  confidence: number;
  id: string;
  name: string;
};

type TraitOracle = {
  confidence: number;
  id: string;
  value: string;
};

export { WITResolver, EntityOracle, IntentOracle, TraitOracle };

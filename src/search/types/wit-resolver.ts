/**
 * Types defined according to Wit.AI Standard API responses
 */

type WITResolver = {
  entities: { [key: string]: Entity[] };
  intents: Intent[];
  text: string;
  traits: { [key: string]: Trait[] };
};

type Entity = {
  body: string;
  confidence: number;
  end: string;
  entities: { string: Entity[] };
  id: string;
  name: string;
  role: string;
  start: number;
  type: string;
  value: string;
};

type Intent = {
  confidence: number;
  id: string;
  name: string;
};

type Trait = {
  confidence: number;
  id: string;
  value: string;
};

export { WITResolver, Entity, Intent, Trait };

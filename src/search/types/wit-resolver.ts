type WITResolver = {
  entites: { string: Entity[] };
  intents: Intent[];
  text: string;
  traits: { string: Trait[] };
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

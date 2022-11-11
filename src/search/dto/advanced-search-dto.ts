import { IsString } from 'class-validator';
import { Entity } from 'src/shared/nlp/entities';
import { Intent } from 'src/shared/nlp/intents';
import { Trait } from 'src/shared/nlp/traits';

export class AdvancedSearchDto {
  @IsString()
  query: string;
  intent: Intent;
  entities: Entity[];
  tags: Trait[];
}

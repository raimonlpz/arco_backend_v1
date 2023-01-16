import { AxiosResponse } from 'axios';
import { RawSearchDto } from '../dto';
import { MinimalError, MoralisResponse, WITResolver } from '../types';
import { MoralisExecutor } from '../types/moralis-executor';

export default interface IArcoEngine {
  searchRaw(
    userId: number,
    dto: RawSearchDto
  ): Promise<MinimalError | MoralisResponse>;
  // 1st - Api call to Resolve with WIT.ai user Query
  resolveWitAIOracle(query: string): Promise<AxiosResponse>;
  // 2nd - Unpack Wit.ai response <-> Moralis Exec.
  unpackWitAIResolver(resolver: WITResolver): MoralisExecutor;
  // 3rd - Translate Executor to a Functional Query to send against Moralis server
  resolveMoralisExecutor(
    userId: number,
    mExecutor: MoralisExecutor,
    query: string
  ): Promise<AxiosResponse>;
  // 4th - In parallel, save/write more Metadata to Postgresql ddbb linked to User
  writeDB(
    userId: number,
    mExecutor: MoralisExecutor,
    query: string,
    urlComposed: string
  ): Promise<void>;
}

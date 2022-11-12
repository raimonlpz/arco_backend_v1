import { MinimalError } from '../types';

export default class HttpErrors {
  static WIT_AI = (
    msg = 'Something went wrong: Wit.ai oracle error.'
  ): MinimalError => ({
    error: msg,
  });

  static MORALIS = (
    msg = 'Something went wrong: Web3 Provider error.'
  ): MinimalError => ({
    error: msg,
  });

  static UNKNOWN = (
    msg = 'Something went wrong: Contact platform Admin.'
  ): MinimalError => ({
    error: msg,
  });
}

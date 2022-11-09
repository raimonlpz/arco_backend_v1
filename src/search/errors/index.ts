export default class HttpErrors {
  static WIT_AI = (msg = 'Something went wrong: Wit.ai oracle error') => ({
    error: msg,
  });
}

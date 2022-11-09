export default class WIT {
  private static BASE_URL = 'https://api.wit.ai';

  static query = (query: string) => `${this.BASE_URL}/message?q=${query}`;
  static intents = () => `${this.BASE_URL}/intents`;
  static entities = () => `${this.BASE_URL}/entities`;
  static utterances = (limit: number) =>
    `${this.BASE_URL}/utterances?limit=${limit}`;
}

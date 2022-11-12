type MoralisResponse = {
  total: number;
  page: number;
  page_size: number;
  status: string;
  result: any[];
  cursor: string | null;
};

export { MoralisResponse };

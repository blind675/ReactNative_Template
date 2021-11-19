export type Error = {
  statusCode: number;
  error: string;
  message: {
    messages: {
      id: string;
      message: string;
    }[];
  }[];
  data: {
    messages: {
      id: string;
      message: string;
    }[];
  }[];
};

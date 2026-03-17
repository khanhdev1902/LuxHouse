export interface messageInterface {
  role: string;
  content: string;
}

export type historyInterface = messageInterface[];

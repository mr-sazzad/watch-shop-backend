export interface IWatch {
  name: string;
  image?: string;
  price: number;
  status: string;
  rating: number;
  description: string;
  comments: { name: string; comment: string }[];
  _id: string;
}

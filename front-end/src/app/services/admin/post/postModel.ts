export interface PostModel {
  id: number;
  title: string;
  description: string;
  published: string;
  author: {
    name: string;
  };
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  image_name: string;
  image_path: string;
  formattedDate?: string;
}

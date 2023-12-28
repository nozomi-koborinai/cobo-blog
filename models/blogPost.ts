export interface BlogPost {
  id: string;
  content: { type: string; value: string }[];
  created_on: string;
  header_image: string | null;
  name: string;
  publish_date: string;
  reviewed: boolean;
  status: 'published' | 'draft';
  tags: string[];
}

import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { BlogPost } from '../models/blogPost';

export async function getBlogs(): Promise<BlogPost[]> {
  const collectionRef = collection(db, 'blog');
  const q = query(collectionRef, orderBy('created_on', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      content: data.content,
      created_on: data.created_on,
      header_image: data.header_image,
      name: data.name,
      publish_date: data.publish_date,
      reviewed: data.reviewed,
      status: data.status,
      tags: data.tags,
    } as BlogPost;
  });
}

import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { BlogPost } from '../models/blogPost';

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const collectionRef = collection(db, 'blog');
    const q = query(collectionRef, orderBy('created_on', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const createdOn = data.created_on.toDate().toISOString();
      const publishDate = data.publish_date?.toDate().toISOString();
      return {
        id: doc.id,
        content: data.content,
        created_on: createdOn,
        header_image: data.header_image,
        name: data.name,
        publish_date: publishDate,
        reviewed: data.reviewed,
        status: data.status,
        tags: data.tags,
      } as BlogPost;
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

// pages/blogs/[id].tsx
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { db } from '../../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { BlogPost } from '../../models/blogPost';

export const getStaticPaths: GetStaticPaths = async () => {
  // FirestoreからすべてのブログのIDを取得する
  const snapshot = await getDocs(collection(db, 'blog'));
  const paths = snapshot.docs.map((doc) => ({
    params: { id: doc.id },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const docRef = doc(db, 'blog', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return {
      notFound: true,
    };
  }

  const blog = docSnap.data() as BlogPost;

  return {
    props: { blog },
    // ISRを有効にするために、revalidateを設定する
    revalidate: 10,
  };
};

const BlogPostPage: NextPage<{ blog: BlogPost }> = ({ blog }) => {
  const contentHtml = blog.content.map((content) => content.value).join('');

  return (
    <article>
      <h1>{blog.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      <p>Published on: {blog.publish_date}</p>
      {blog.tags.map((tag, index) => (
        <span key={index}>{tag}</span>
      ))}
    </article>
  );
};

export default BlogPostPage;

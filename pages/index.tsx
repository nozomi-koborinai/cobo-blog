import { GetServerSideProps } from 'next';
import { BlogPost } from '../models/blogPost';
import { getBlogs } from '../lib/getBlogs';

interface HomeProps {
  blogs: BlogPost[];
}

const Home: React.FC<HomeProps> = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.name}</h2>
          <p>{new Date(blog.publish_date).toDateString()}</p>
          <div dangerouslySetInnerHTML={{ __html: blog.content.map((c) => c.value).join('') }} />
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const blogs = await getBlogs();
  return { props: { blogs } };
};

export default Home;

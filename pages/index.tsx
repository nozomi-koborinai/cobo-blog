import { GetServerSideProps } from 'next';
import { BlogPost } from '../models/blogPost';
import { getBlogs } from '../lib/getBlogs';
import xss from 'xss';

interface HomeProps {
  blogs: BlogPost[];
}

const Home: React.FC<HomeProps> = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => {
        const blogContentHtml = blog.content.map((c) => c.value).join('');
        return (
          <div key={blog.id}>
            <article>
              <h2>{blog.name}</h2>
              <p>{new Date(blog.publish_date).toLocaleDateString()}</p>
              <section dangerouslySetInnerHTML={{ __html: blogContentHtml }} />
            </article>
          </div>
        );
      })}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const blogs = await getBlogs();

  const sanitizedBlogs = blogs.map((blog) => ({
    ...blog,
    content: blog.content.map((c) => ({ ...c, value: xss(c.value) })),
  }));

  return { props: { blogs: sanitizedBlogs } };
};

export default Home;

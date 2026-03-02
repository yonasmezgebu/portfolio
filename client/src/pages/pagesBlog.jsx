import styles from "../assets/Blog.module.css";
import posts from "../data/datablogPosts";
import BlogCard from "../components/componentsBlogCard";


export default function Blog() {
  return (
    <section 
  
    
    
    className={styles.blog}>
      <div className={styles.container}>
        <h2 className={styles.title}>J♢URNAL</h2>

        <div className={styles.grid}>
          {posts.map((post) => (
            <div className={styles.cardWrapper} key={post.id}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

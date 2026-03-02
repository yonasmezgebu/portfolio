export default function BlogCard({ post }) {
  return (
    <article className="card blog-card">
      <p className="card-sub">{post.date} • {post.tag}</p>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
     
    </article>
  );
}

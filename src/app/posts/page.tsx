const fetchPosts = async () => {
  try {
    const res = await fetch("/api/posts");

    if (!res) {
      return { message: "Couldn't retrieve posts" };
    }

    return await res.json();
  } catch (e) {
    return { message: "Couldn't retrieve posts" };
  }
};

const PostsPage = async () => {
  const posts = await fetchPosts();
  console.log(posts);
  return (
    <div>
      {/* {posts.map((post, idx) => {
        return (
          <div key={idx}>
            <p>{post.title}</p>
          </div>
        );
      })} */}
    </div>
  );
};

export default PostsPage;

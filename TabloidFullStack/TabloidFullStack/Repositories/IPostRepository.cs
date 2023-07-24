using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAllPosts();
        List<Post> GetPostsByUserId(int userProfileId);
        Post GetPostById(int postId);
        void Add(Post post);
        void Update(Post post);
        void Delete(int id);

    }
}

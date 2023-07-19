using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAllPosts();
        List<Post> GetPostsByUserId(int userProfileId);
        Post GetPostById(int postId);

    }
}

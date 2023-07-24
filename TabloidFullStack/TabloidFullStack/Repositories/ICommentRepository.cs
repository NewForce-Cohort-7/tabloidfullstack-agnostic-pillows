using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ICommentRepository
    {

        List<Comment> GetAllByPostId(int postId);


    }
}

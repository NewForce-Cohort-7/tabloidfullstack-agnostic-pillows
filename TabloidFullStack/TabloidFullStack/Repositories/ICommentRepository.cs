using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ICommentRepository
    {

        List<Comment> GetAllByPostId(int postId);
        void Add(Comment comment);
        void Delete(int id);


    }
}

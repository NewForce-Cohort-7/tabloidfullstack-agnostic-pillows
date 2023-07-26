using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IUserRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByEmail(string email);
        void UpdateUserType(int id, int userTypeId);
        List<UserType> GetUserTypes();

    }
}

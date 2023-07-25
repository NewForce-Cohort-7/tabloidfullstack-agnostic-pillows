using System.Collections.Generic;
using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAll();
        UserProfile GetById(int id);
        void DeactivateUserProfile(int userId);
        void ReactivateUserProfile(int userId);
        void Update(UserProfile userProfile);
    }
}

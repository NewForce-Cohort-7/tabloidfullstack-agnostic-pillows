using System.Collections.Generic;
using TabloidFullStack.Models;  

namespace TabloidFullStack.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
        Category GetById(int id);
        void Update(Category category); 
        void Add(Category category);
        void Delete(int id);    
    }
}

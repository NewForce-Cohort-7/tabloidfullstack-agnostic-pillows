using System.ComponentModel;

namespace TabloidFullStack.Models
{
    public class Category
    {
        public int Id { get; set; }
        [DisplayName("Category")]
        public string Name { get; set; }
    }
}

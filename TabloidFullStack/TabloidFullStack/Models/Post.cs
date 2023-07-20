using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TabloidFullStack.Models
{
    public class Post
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        [DisplayName("Image URL")]
        public string ImageLocation { get; set; }
        public DateTime CreateDateTime { get; set; }
        [DisplayName("Published")]
        public DateTime? PublishDateTime { get; set; }
        public bool IsApproved { get; set; }
        [Required]
        [DisplayName("Category")]
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile? UserProfile { get; set; }
    }
}

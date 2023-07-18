using Microsoft.Extensions.Configuration.EnvironmentVariables;
using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration config) : base(config) { }

        public List<Post> GetAllPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content, p.ImageLocation AS ImageUrl, p.CreateDateTime, p.PublishDateTime, p.IsApproved, p.CatagoryId, p.UserProfileId,
                            c.[Name] as CatagoryName,
                            u.FirstName, u.LastName, u.DisplayName, u.Email, u.CreateDateTime, u.ImageLocation as UserImageUrl, u.UserTypeId,
                            ut.[Name] as UserTypeName
                        FROM Post p
                            LEFT JOIN Category c ON p.CategoryId = c.Id
                            LEFT JOIN UserProfile u ON p.UserProfileId = u.Id
                            LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                        WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME()
                    ";
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        Post post = new Post()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            ImageLocation = DbUtils.GetString(reader, "HeaderImage"),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            //Category = new Category()
                            //{
                            //    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            //    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                            //},
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            UserProfile = new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                                ImageLocation = DbUtils.GetString(reader, "AvatarImage"),
                                UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                UserType = new UserType()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                    Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                                }
                            }
                        };
                        posts.Add(post);
                    }
                    reader.Close();

                    return posts;
                }
            }
        }
    }
}

using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration.EnvironmentVariables;
using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration config) : base(config) { }

        private Post NewPostFromReader(SqlDataReader reader)
        {
            return new Post()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = reader.GetString(reader.GetOrdinal("Title")),
                Content = reader.GetString(reader.GetOrdinal("Content")),
                ImageLocation = DbUtils.GetNullableString(reader, "ImageUrl"),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                Category = new Category()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                },
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                    ImageLocation = DbUtils.GetNullableString(reader, "UserImageUrl"),
                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                    UserType = new UserType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                    }
                }
            };
        }
        public List<Post> GetAllPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content, p.ImageLocation AS ImageUrl, p.CreateDateTime, p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId,
                            c.[Name] as CategoryName,
                            u.FirstName, u.LastName, u.DisplayName, u.Email, u.CreateDateTime, u.ImageLocation as UserImageUrl, u.UserTypeId,
                            ut.[Name] as UserTypeName
                        FROM Post p
                            LEFT JOIN Category c ON p.CategoryId = c.Id
                            LEFT JOIN UserProfile u ON p.UserProfileId = u.Id
                            LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                        WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME()
                        ORDER BY PublishDateTime desc
                    ";
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }
                    reader.Close();

                    return posts;
                }
            }
        }
        public List<Post> GetPostsByUserId(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content, p.ImageLocation AS ImageUrl, p.CreateDateTime, p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId,
                            c.[Name] as CategoryName,
                            u.FirstName, u.LastName, u.DisplayName, u.Email, u.CreateDateTime, u.ImageLocation as UserImageUrl, u.UserTypeId,
                            ut.[Name] as UserTypeName
                        FROM Post p
                            LEFT JOIN Category c ON p.CategoryId = c.Id
                            LEFT JOIN UserProfile u ON p.UserProfileId = u.Id
                            LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                        WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME() AND p.UserProfileId = @userProfileId
                        ORDER BY p.CreateDateTime desc
                    ";
                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }
                    reader.Close();

                    return posts;
                }
            }
        }
        public Post GetPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using ( var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content, p.ImageLocation AS ImageUrl, p.CreateDateTime, p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId,
                            c.[Name] as CategoryName,
                            u.FirstName, u.LastName, u.DisplayName, u.Email, u.CreateDateTime, u.ImageLocation as UserImageUrl, u.UserTypeId,
                            ut.[Name] as UserTypeName
                        FROM Post p
                            LEFT JOIN Category c ON p.CategoryId = c.Id
                            LEFT JOIN UserProfile u ON p.UserProfileId = u.Id
                            LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                        WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME()
                        AND p.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Post post = null;

                    if (reader.Read())
                    {
                        post = NewPostFromReader(reader);
                    }

                    reader.Close();

                    return post;
                }
            }
        }
    }
}

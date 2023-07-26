using Microsoft.Extensions.Hosting;
using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration config) : base(config) { }




        public List<Comment> GetAllByPostId(int postId)
        {
            List<Comment> comments = new List<Comment>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT c.Id, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime,
                    p.Title AS PostTitle, p.Content AS PostContent, p.ImageLocation AS PostImageLocation,
                    u.DisplayName AS UserProfileDisplayName
                    FROM Comment c
                    LEFT JOIN Post p ON c.PostId = p.Id
                    LEFT JOIN UserProfile u ON c.UserProfileId = u.Id
                    WHERE c.PostId = @PostId
                    order by c.CreateDateTime desc";

                    cmd.Parameters.AddWithValue("@PostId", postId);

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Comment comment = new Comment();
                        comment.Id = reader.GetInt32(reader.GetOrdinal("Id"));
                        comment.PostId = reader.GetInt32(reader.GetOrdinal("PostId"));
                        comment.UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId"));
                        comment.Subject = reader.GetString(reader.GetOrdinal("Subject"));
                        comment.Content = reader.GetString(reader.GetOrdinal("Content"));
                        comment.CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime"));

                        comment.Post = new Post
                        {
                            Title = reader.GetString(reader.GetOrdinal("PostTitle")),
                            Content = reader.GetString(reader.GetOrdinal("PostContent")),
                            ImageLocation = reader.GetString(reader.GetOrdinal("PostImageLocation"))
                        };

                        comment.UserProfile = new UserProfile
                        {
                            DisplayName = reader.GetString(reader.GetOrdinal("UserProfileDisplayName"))
                        };

                        comments.Add(comment);
                    }
                }
            }

            return comments;
        }



        public void Add(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Comment (PostId, UserProfileId, Subject, Content, CreateDateTime) 
                                                    OUTPUT INSERTED.ID
                                                    VALUES (@PostId, @UserProfileId, @Subject, @Content, @CreateDateTime)";

                    cmd.Parameters.AddWithValue("@PostId", comment.PostId);
                    cmd.Parameters.AddWithValue("@UserProfileId", comment.UserProfileId);
                    cmd.Parameters.AddWithValue("@Subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@Content", comment.Content);
                    cmd.Parameters.AddWithValue("@CreateDateTime", comment.CreateDateTime);


                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"
                        DELETE FROM Comment
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }



        public void Update(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Comment
                        SET
                        [PostId] = @postId,
                         [UserProfileId] = @userProfileId,
                         [Subject] = @subject,
                         [Content] = @content,
                         [CreateDateTime] = @createDateTime
                        WHERE Id = @id
                        ";
                    cmd.Parameters.AddWithValue("@id", comment.Id);
                    cmd.Parameters.AddWithValue("@postId", comment.PostId);
                    cmd.Parameters.AddWithValue("@userProfileId", comment.UserProfileId);
                    cmd.Parameters.AddWithValue("@subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@content", comment.Content);
                    cmd.Parameters.AddWithValue("@createDateTime", comment.CreateDateTime);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        public Comment GetCommentById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime,
                        p.Title AS PostTitle, p.Content AS PostContent, p.ImageLocation AS PostImageLocation,
                        u.DisplayName AS UserProfileDisplayName
                        FROM Comment c
                        LEFT JOIN Post p ON c.PostId = p.Id
                        LEFT JOIN UserProfile u ON c.UserProfileId = u.Id
                        WHERE c.Id = @commentId";

                    cmd.Parameters.AddWithValue("@commentId", id);
                    var reader = cmd.ExecuteReader();

                    Comment comment = null;

                    if (reader.Read())
                    {
                        comment = new Comment();

                        comment.Id = reader.GetInt32(reader.GetOrdinal("Id"));
                        comment.PostId = reader.GetInt32(reader.GetOrdinal("PostId"));
                        comment.UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId"));
                        comment.Subject = reader.GetString(reader.GetOrdinal("Subject"));
                        comment.Content = reader.GetString(reader.GetOrdinal("Content"));
                        comment.CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime"));

                        comment.Post = new Post
                        {
                            Title = reader.GetString(reader.GetOrdinal("PostTitle")),
                            Content = reader.GetString(reader.GetOrdinal("PostContent")),
                            ImageLocation = reader.GetString(reader.GetOrdinal("PostImageLocation"))
                        };

                        comment.UserProfile = new UserProfile
                        {
                            DisplayName = reader.GetString(reader.GetOrdinal("UserProfileDisplayName"))
                        };
                    }

                    reader.Close();

                    return comment;
                }
            }
        }






    }
}

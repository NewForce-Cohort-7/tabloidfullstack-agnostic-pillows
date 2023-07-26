using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration config)
            : base(config) { }

        public List<UserProfile> GetAll()
        {
            List<UserProfile> userProfiles = new List<UserProfile>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.DisplayName, up.FirstName, up.LastName, 
                               up.Email, up.CreateDateTime, up.ImageLocation, up.UserTypeId,
                               ut.Name AS UserTypeName, up.IsActive
                        FROM UserProfile up
                        INNER JOIN UserType ut ON up.UserTypeId = ut.Id";

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            UserProfile userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                IsActive = DbUtils.GetBoolean(reader, "IsActive"),
                                UserType = new UserType()
                                {
                                    Id = DbUtils.GetInt(reader, "UserTypeId"),
                                    Name = DbUtils.GetString(reader, "UserTypeName")
                                }
                            };

                            userProfiles.Add(userProfile);
                        }
                    }
                }
            }

            return userProfiles;
        }

        // get by Id
        public UserProfile GetById(int id)
        {
            UserProfile userProfile = null;

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT up.Id, up.DisplayName, up.FirstName, up.LastName, 
                       up.Email, up.CreateDateTime, up.ImageLocation, up.UserTypeId,
                       ut.Name AS UserTypeName, up.IsActive
                FROM UserProfile up
                INNER JOIN UserType ut ON up.UserTypeId = ut.Id
                WHERE up.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                IsActive = DbUtils.GetBoolean(reader, "IsActive"),
                                UserType = new UserType()
                                {
                                    Id = DbUtils.GetInt(reader, "UserTypeId"),
                                    Name = DbUtils.GetString(reader, "UserTypeName")
                                }
                            };
                        }
                    }
                }
            }

            return userProfile;
        }


        // deactivate profile by Id/isActive boolean
        public void DeactivateUserProfile(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserProfile
                        SET IsActive = 0
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", userId);

                    cmd.ExecuteNonQuery();
                }
            }

            }

        // reactivate profile by Id/isActive boolean
        public void ReactivateUserProfile(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserProfile
                        SET IsActive = 1
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", userId);

                    cmd.ExecuteNonQuery();
                }
            }


        }
        
    }
    
}
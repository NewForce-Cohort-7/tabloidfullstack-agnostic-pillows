using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IUserRepository _userRepository;

        public UserProfileController(
            IUserRepository userRepository,
            IUserProfileRepository userProfileRepository
        )
        {
            _userProfileRepository = userProfileRepository;
            _userRepository = userRepository;
        }

        // GET: api/<UserProfileController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        // GET: api/<UserProfileController>/5 - getById/details
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var userProfile = _userProfileRepository.GetById(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            _userRepository.Add(userProfile);
            return CreatedAtAction("GetByEmail", new { email = userProfile.Email }, userProfile);
        }

        // Get all User Types/Names 
        [HttpGet("GetUserTypes")]
        public IActionResult GetUserTypes()
        {
            return Ok(_userRepository.GetUserTypes());
        }

        // Update User Type
        [HttpPatch("UpdateUserType/{id}")]
        public IActionResult UpdateUserType(int id, [FromBody] int userTypeId)
        {
            // Check if the user profile exists
            UserProfile userProfile = _userProfileRepository.GetById(id);
            if (userProfile == null)
            {
                return NotFound();
            }

            _userRepository.UpdateUserType(id, userTypeId);
            return NoContent();
        }


        // PATCH api/<UserProfileController>/5
        [HttpPatch("Deactivate/{id}")]
        public IActionResult Deactivate(int id)
        {
            // Check if the user profile exists
            UserProfile userProfile = _userProfileRepository.GetById(id);
            if (userProfile == null)
            {
                return NotFound();
            }

            // Deactivate the user profile
            _userProfileRepository.DeactivateUserProfile(id);

            return NoContent();
        }

        // PATCH api/<UserProfileController>/5
        [HttpPatch("Reactivate/{id}")]
        public IActionResult Reactivate(int id)
        {
            // Check if the user profile exists
            UserProfile userProfile = _userProfileRepository.GetById(id);
            if (userProfile == null)
            {
                return NotFound();
            }

            // Reactivate the user profile
            _userProfileRepository.ReactivateUserProfile(id);

            return NoContent();
        }


        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile userProfile)
        {
            if (id != userProfile.Id)
            {
                return BadRequest();
            }
            _userProfileRepository.UpdateProfileImage(userProfile);
            return NoContent();
        }
        [HttpPost("upload-image")]
        public IActionResult UploadImage(IFormFile image)
        {
            if (image != null && image.Length > 0)
            {
                // Generate a unique filename for the uploaded image
                string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);

                // Builds the fullPath variable which gets the directory of the folder which is wwwroot/ImageUploads
                string uploadsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "ImageUploads");
                string fullPath = Path.Combine(uploadsDirectory, uniqueFileName);
                //creates a FileStream to essentially save it to the folder
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    image.CopyTo(stream);
                }
                string publicImageUrl = $"/ImageUploads/{uniqueFileName}";
                // Return the URL or file path of the saved image to the frontend
                return Ok(new { imageUrl = publicImageUrl });
            }

            return BadRequest();
        }

    }
}

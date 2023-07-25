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

    }
}

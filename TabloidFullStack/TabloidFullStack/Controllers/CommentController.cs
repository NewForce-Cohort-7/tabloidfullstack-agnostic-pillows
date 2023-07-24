using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Repositories;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {

        private readonly ICommentRepository _commentRepo;
        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepo = commentRepository;
        }



        // http://localhost:5000/api/comment/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var category = _commentRepo.GetAllByPostId(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }






    }
}

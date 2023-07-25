using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
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



        // http://localhost:5000/api/comments/5
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


        // http://localhost:5000/api/comment
        [HttpPost]
        public ActionResult Post(Comment comment)
        {
            _commentRepo.Add(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        // http://localhost:5000/api/comment/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepo.Delete(id);
            return NoContent();
        }






    }
}

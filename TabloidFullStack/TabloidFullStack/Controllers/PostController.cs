using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Repositories;
using TabloidFullStack.Models;
using System.Security.Claims;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;

        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAllPosts());
        }
        [HttpGet("GetUsersPosts/{id}")]
        public IActionResult Get(int id)
        {
            List<Post> posts = _postRepository.GetPostsByUserId(id);
            if (posts == null)
            {
                return NotFound();
            }
            return Ok(posts);
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Post post = _postRepository.GetPostById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }
        [HttpPost]
        public IActionResult Post(Post post)
        {
            _postRepository.Add(post);
            return CreatedAtAction("Get", new {id = post.Id }, post);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }
            _postRepository.Update(post);
            return NoContent();
        }
    }
}

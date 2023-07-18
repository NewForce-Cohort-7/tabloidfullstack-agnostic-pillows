using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        // http://localhost:5000/api/category
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_categoryRepository.GetAll());
        }

        // http://localhost:5000/api/category/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var category = _categoryRepository.GetById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        // http://localhost:5000/api/category
        [HttpPost]
        public ActionResult Post(Category category)
        {
            _categoryRepository.Add(category);
            return CreatedAtAction("Get", new { id = category.Id }, category);
        }

        // http://localhost:5000/api/category/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _categoryRepository.Update(category);
            return NoContent();
        }

        // http://localhost:5000/api/category/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _categoryRepository.Delete(id);
            return NoContent();
        }
    }
}

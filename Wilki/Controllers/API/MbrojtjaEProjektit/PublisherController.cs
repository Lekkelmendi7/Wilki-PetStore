using Wilki.Data;
using Wilki.Models.MbrojtjaEProjektit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers.MbrojtjaProjektit
{

    [Authorize(AuthenticationSchemes = "Bearer")]
    [ApiController]
    [Route("api/MbrojtjaEProjektit/[controller]")]
    public class PublisherController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PublisherController(ApplicationDbContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("ShfaqPublisher")]
        public async Task<IActionResult> ShfaqPublisher()
        {
            var Publisher = await _context.Publisher.ToListAsync();

            return Ok(Publisher);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("ShfaqPublisherNgaID")]
        public async Task<IActionResult> ShfaqPublisherNgaID(int PublisherID)
        {
            var Publisher = await _context.Publisher.FirstOrDefaultAsync(x => x.PublisherID == PublisherID);

            if (Publisher == null)
            {
                return NotFound();
            }

            return Ok(Publisher);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("ShtoPublisher")]
        public async Task<IActionResult> ShtoPublisher([FromBody] Publisher Publisher)
        {
            await _context.Publisher.AddAsync(Publisher);

            await _context.SaveChangesAsync();

            return CreatedAtAction("ShfaqPublisher", Publisher.PublisherID, Publisher);
        }

        [AllowAnonymous]
        [HttpPut]
        [Route("PerditesoPublisher")]
        public async Task<IActionResult> PerditesoPublisher(int PublisherID, [FromBody] Publisher p)
        {
            var Publisher = await _context.Publisher.FirstOrDefaultAsync(x => x.PublisherID == PublisherID);

            if (Publisher == null)
            {
                return NotFound();
            }

            Publisher.PublisherName = p.PublisherName;
            Publisher.Location = p.Location;

            _context.Publisher.Update(Publisher);
            await _context.SaveChangesAsync();

            return Ok(Publisher);
        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("FshijPublisher")]
        public async Task<IActionResult> FshijPublisher(int PublisherID)
        {
            var Publisher = await _context.Publisher.FirstOrDefaultAsync(x => x.PublisherID == PublisherID);

            if (Publisher == null)
            {
                return NotFound();
            }

            _context.Publisher.Remove(Publisher);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}

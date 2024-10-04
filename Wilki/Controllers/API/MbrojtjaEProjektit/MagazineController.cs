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
    public class MagazineController : Controller
    {
        private readonly ApplicationDbContext _context;

        public MagazineController(ApplicationDbContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("ShfaqMagazine")]
        public async Task<IActionResult> ShfaqMagazine()
        {
            var Magazine = await _context.Magazine.Include(x => x.Publisher).ToListAsync();

            return Ok(Magazine);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("ShfaqMagazineNgaID")]
        public async Task<IActionResult> ShfaqMagazineNgaID(int MagazineID)
        {
            var Magazine = await _context.Magazine.Include(x => x.Publisher).FirstOrDefaultAsync(x => x.MagazineID == MagazineID);

            if (Magazine == null)
            {
                return NotFound();
            }

            return Ok(Magazine);
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("ShtoMagazine")]
        public async Task<IActionResult> ShtoMagazine([FromBody] Magazine Magazine)
        {
            await _context.Magazine.AddAsync(Magazine);
            await _context.SaveChangesAsync();

            return CreatedAtAction("ShfaqMagazine", Magazine.MagazineID, Magazine);
        }

        [AllowAnonymous]
        [HttpPut]
        [Route("PerditesoMagazine")]
        public async Task<IActionResult> PerditesoMagazine(int MagazineID, [FromBody] Magazine s)
        {
            var Magazine = await _context.Magazine.FirstOrDefaultAsync(x => x.MagazineID == MagazineID);

            if (Magazine == null)
            {
                return NotFound();
            }

            Magazine.MagazineName = s.MagazineName;
            Magazine.IssueNumber = s.IssueNumber;
            Magazine.PublisherID = s.PublisherID;

            _context.Magazine.Update(Magazine);
            await _context.SaveChangesAsync();

            return Ok(Magazine);
        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("FshijMagazine")]
        public async Task<IActionResult> FshijMagazine(int MagazineID)
        {
            var Magazine = await _context.Magazine.FirstOrDefaultAsync(x => x.MagazineID == MagazineID);

            if (Magazine == null)
            {
                return NotFound();
            }

            _context.Magazine.Remove(Magazine);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}

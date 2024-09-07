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
    public class PlanetController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PlanetController(ApplicationDbContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("ShfaqPlanet")]
        public async Task<IActionResult> ShfaqPlanet()
        {
            var Planet = await _context.Planet.Where(x => x.isDeleted == "false").ToListAsync();

            return Ok(Planet);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("ShfaqPlanetNgaID")]
        public async Task<IActionResult> ShfaqPlanetNgaID(int PlanetID)
        {
            var Planet = await _context.Planet.FirstOrDefaultAsync(x => x.PlanetID == PlanetID);

            if (Planet == null || Planet.isDeleted == "true")
            {
                return NotFound();
            }

            return Ok(Planet);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("ShtoPlanet")]
        public async Task<IActionResult> ShtoPlanet([FromBody] Planet Planet)
        {
            await _context.Planet.AddAsync(Planet);

            await _context.SaveChangesAsync();

            return CreatedAtAction("ShfaqPlanet", Planet.PlanetID, Planet);
        }

        [AllowAnonymous]
        [HttpPut]
        [Route("PerditesoPlanet")]
        public async Task<IActionResult> PerditesoPlanet(int PlanetID, [FromBody] Planet p)
        {
            var Planet = await _context.Planet.FirstOrDefaultAsync(x => x.PlanetID == PlanetID);

            if (Planet == null || Planet.isDeleted == "true")
            {
                return NotFound();
            }

            Planet.Name = p.Name;
            Planet.Type = p.Type;

            _context.Planet.Update(Planet);
            await _context.SaveChangesAsync();

            return Ok(Planet);
        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("FshijPlanet")]
        public async Task<IActionResult> FshijPlanet(int PlanetID)
        {
            var Planet = await _context.Planet.FirstOrDefaultAsync(x => x.PlanetID == PlanetID);

            if (Planet == null || Planet.isDeleted == "true")
            {
                return NotFound();
            }

            Planet.isDeleted = "true";

            _context.Planet.Update(Planet);
            await _context.SaveChangesAsync();

            var Satellites = await _context.Satellite.Where(x => x.PlanetID == Planet.PlanetID).ToListAsync();

            foreach (var Satellite in Satellites)
            {
                if (Satellite.isDeleted == "false")
                {
                    Satellite.isDeleted = "true";

                    _context.Satellite.Update(Satellite);
                    await _context.SaveChangesAsync();
                }
            }

            return Ok();
        }
    }
}

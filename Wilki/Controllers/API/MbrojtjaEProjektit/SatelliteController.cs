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
    public class SatelliteController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SatelliteController(ApplicationDbContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("ShfaqSatellite")]
        public async Task<IActionResult> ShfaqSatellite()
        {
            var Satellite = await _context.Satellite.Include(x => x.Planet).Where(x => x.isDeleted == "false").ToListAsync();

            return Ok(Satellite);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("ShfaqSatelliteNgaID")]
        public async Task<IActionResult> ShfaqSatelliteNgaID(int SatelliteID)
        {
            var Satellite = await _context.Satellite.Include(x => x.Planet).FirstOrDefaultAsync(x => x.SatelliteID == SatelliteID);

            if (Satellite == null || Satellite.isDeleted == "true")
            {
                return NotFound();
            }

            return Ok(Satellite);
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("ShtoSatellite")]
        public async Task<IActionResult> ShtoSatellite([FromBody] Satellite Satellite)
        {
            await _context.Satellite.AddAsync(Satellite);
            await _context.SaveChangesAsync();

            return CreatedAtAction("ShfaqSatellite", Satellite.SatelliteID, Satellite);
        }

        [AllowAnonymous]
        [HttpPut]
        [Route("PerditesoSatellite")]
        public async Task<IActionResult> PerditesoSatellite(int SatelliteID, [FromBody] Satellite s)
        {
            var Satellite = await _context.Satellite.FirstOrDefaultAsync(x => x.SatelliteID == SatelliteID);

            if (Satellite == null || Satellite.isDeleted == "true")
            {
                return NotFound();
            }

            Satellite.Name = s.Name;
            Satellite.PlanetID = s.PlanetID;

            _context.Satellite.Update(Satellite);
            await _context.SaveChangesAsync();

            return Ok(Satellite);
        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("FshijSatellite")]
        public async Task<IActionResult> FshijSatellite(int SatelliteID)
        {
            var Satellite = await _context.Satellite.FirstOrDefaultAsync(x => x.SatelliteID == SatelliteID);

            if (Satellite == null || Satellite.isDeleted == "true")
            {
                return NotFound();
            }

            Satellite.isDeleted = "true";

            _context.Satellite.Update(Satellite);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}

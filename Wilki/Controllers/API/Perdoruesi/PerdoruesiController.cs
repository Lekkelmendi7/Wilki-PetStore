﻿

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Wilki.Data;
using Wilki.Models;
using Wilki.Services;

namespace Wilki.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [ApiController]
    [Route("api/[controller]")]
    public class PerdoruesiController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IAdminLogService _adminLogService;

        public PerdoruesiController(
            ApplicationDbContext context,
            UserManager<IdentityUser> userManager,
            IAdminLogService adminLogService)
        {
            _context = context;
            _userManager = userManager;
            _adminLogService = adminLogService;
        }

        [Authorize]
        [HttpGet]
        [Route("shfaqPerdoruesit")]
        public async Task<IActionResult> ShfaqPerdoruesit()
        {
            var perdoruesit = await _context.Perdoruesit
                .Include(p => p.TeDhenatPerdoruesit)
                .ToListAsync();

            var perdoruesiList = new List<RoletEPerdoruesit>();

            foreach (var perdoruesi in perdoruesit)
            {
                var user = await _userManager.FindByIdAsync(perdoruesi.AspNetUserId);
                var roles = await _userManager.GetRolesAsync(user);

                var roletEPerdoruesit = new RoletEPerdoruesit
                {
                    Perdoruesi = perdoruesi,
                    Rolet = roles.ToList()
                };

                perdoruesiList.Add(roletEPerdoruesit);
            }

            return Ok(perdoruesiList);
        }

        [Authorize]
        [HttpGet]
        [Route("shfaqSipasID")]
        public async Task<IActionResult> ShfaqSipasID(string idUserAspNet)
        {
            var user = await _userManager.FindByIdAsync(idUserAspNet);

            var perdoruesi = await _context.Perdoruesit
                .Include(p => p.TeDhenatPerdoruesit)
                .FirstOrDefaultAsync(x => x.AspNetUserId.Equals(idUserAspNet));

            var rolet = await _userManager.GetRolesAsync(user);

            var result = new
            {
                perdoruesi?.Emri,
                perdoruesi?.Mbiemri,
                perdoruesi?.Email,
                perdoruesi?.TeDhenatPerdoruesit,
                perdoruesi?.UserID,
                rolet
            };

            return Ok(result);
        }

        [Authorize]
        [HttpGet]
        [Route("ShfaqAdresatPerdoruesit")]
        public async Task<IActionResult> ShfaqShfaqAdresatPerdoruesitSipasID(string idUserAspNet)
        {
            var perdoruesi = await _context.Perdoruesit.Where(x => x.AspNetUserId == idUserAspNet).FirstOrDefaultAsync();

            if(perdoruesi == null)
            {
                return NotFound();
            }

            var adresat = await _context.AdresatPerdoruesit.Where(x => x.PerdoruesiID == perdoruesi.UserID).Select(x => new
            {
                x.AdresaID,
                x.Qyteti,
                x.ZipKodi,
                x.Adresa,
                x.Shteti,
                x.Email,
                x.NrKontaktit,
                x.Emri,
                x.Mbiemri
            }).ToListAsync();

            return Ok(adresat);
        }
    }

    public class RoletEPerdoruesit
    {
        public Perdoruesi Perdoruesi { get; set; }
        public List<string> Rolet { get; set; }
    }
}

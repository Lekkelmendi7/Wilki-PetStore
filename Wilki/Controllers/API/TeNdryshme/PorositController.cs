﻿using Wilki.Data;
using Wilki.Models;
using Wilki.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Wilki.Controllers.API.TeNdryshme
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [ApiController]
    [Route("api/TeNdryshme/[controller]")]
    public class PorosiaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IAdminLogService _adminLogService;

        public PorosiaController(ApplicationDbContext context, IAdminLogService adminLogService)
        {
            _context = context;
            _adminLogService = adminLogService;
        }

        [Authorize(Roles = "Admin, Shites")]
        [HttpGet]
        [Route("ShfaqPorosit")]
        public async Task<IActionResult> ShfaqPorosit()
        {
            var porosit = await _context.Porosit
                .Include(p => p.Klienti)
                    .ThenInclude(t => t.TeDhenatPerdoruesit)
                .Select(p => new
                {
                    p.IdPorosia,
                    p.Totali18TVSH,
                    p.Totali8TVSH,
                    p.DataPorosis,
                    p.StatusiPorosis,
                    p.IdKlienti,
                    p.Zbritja,
                    p.TotaliProdukteve,
                    p.Klienti.Emri,
                    p.Klienti.Mbiemri,
                    p.LlojiPageses,
                    p.LlojiTransportit,
                    p.QmimiTransportit
                })
                .OrderByDescending(p => p.IdPorosia)
                .ToListAsync();

            return Ok(porosit);
        }

        [Authorize]
        [HttpGet]
        [Route("ShfaqPorositeKlientit")]
        public async Task<IActionResult> ShfaqPorositeKlientit(string idPerdoruesi)
        {
            var perdoruesi = await _context.Perdoruesit.Where(x => x.AspNetUserId == idPerdoruesi).FirstOrDefaultAsync();

            if (perdoruesi == null)
            {
                return NotFound();
            }

            var porosit = await _context.Porosit
                .OrderByDescending(p => p.IdPorosia)
                .Where(p => p.IdKlienti == perdoruesi.UserID)
                .Select(p => new
                {
                    p.IdPorosia,
                    p.Totali18TVSH,
                    p.Totali8TVSH,
                    p.DataPorosis,
                    p.StatusiPorosis,
                    p.Zbritja,
                    p.TotaliProdukteve,
                    p.LlojiPageses,
                    p.LlojiTransportit,
                    p.QmimiTransportit,
                })
                .ToListAsync();

            return Ok(porosit);
        }

        [Authorize]
        [HttpGet]
        [Route("ShfaqPorosineNgaID")]
        public async Task<IActionResult> ShfaqPorosineNgaID(int nrFatures)
        {
            var porosia = await _context.Porosit
                .Include(p => p.TeDhenatEPorosis)
                    .ThenInclude(t => t.Produkti)
                .Include(p => p.Klienti)
                    .ThenInclude(t => t.TeDhenatPerdoruesit)
                .Include(x => x.AdresaDorezimit)
                .Where(x => x.IdPorosia == nrFatures)
                .Select(p => new
                {
                    p.IdPorosia,
                    p.Totali18TVSH,
                    p.Totali8TVSH,
                    p.DataPorosis,
                    p.StatusiPorosis,
                    p.IdKlienti,
                    p.Zbritja,
                    p.TotaliProdukteve,
                    p.Klienti.Emri,
                    p.Klienti.Mbiemri,
                    p.LlojiPageses,
                    p.LlojiTransportit,
                    p.QmimiTransportit,
                    EmriAdresaDorezimit = p.AdresaDorezimit.Emri,
                    MbiemriAdresaDorezimit = p.AdresaDorezimit.Mbiemri,
                    p.AdresaDorezimit.Email,
                    p.AdresaDorezimit.NrKontaktit,
                    p.AdresaDorezimit.Adresa,
                    p.AdresaDorezimit.Qyteti,
                    p.AdresaDorezimit.Shteti,
                    p.AdresaDorezimit.ZipKodi,
                    TeDhenatEPorosis = p.TeDhenatEPorosis.Select(t => new
                    {
                        t.QmimiProduktit,
                        t.SasiaPorositur,
                        t.Produkti.EmriProduktit,
                        t.Produkti.FotoProduktit,
                    }),
                })
                .FirstOrDefaultAsync();

            if (porosia == null)
            {
                return NotFound();
            }

            return Ok(porosia);
        }


        [Authorize]
        [HttpGet]
        [Route("ShfaqTeDhenatEPorosis")]
        public async Task<IActionResult> ShfaqTeDhenatEPorosis(int nrPorosis)
        {
            var porsia = await _context.TeDhenatEPorosis.Include(x => x.Produkti).ThenInclude(x => x.TeDhenatProduktit).Where(x => x.IdPorosia == nrPorosis).Select(p => new
            {
                p.IdDetajet,
                p.IdPorosia,
                p.SasiaPorositur,
                p.IdProdukti,
                p.QmimiProduktit,
                p.Produkti.EmriProduktit,
                p.Produkti.TeDhenatProduktit.llojiTVSH
            }).ToListAsync();

            return Ok(porsia);
        }

        [Authorize]
        [HttpPost]
        [Route("VendosPorosine")]
        public async Task<IActionResult> VendosPorosine(string AspNetUserID, [FromBody] Porosit porosit)
        {
            var shporta = await _context.Shporta.Include(x => x.Perdoruesi).Include(x => x.KodiZbritjes).Where(x => x.Perdoruesi.AspNetUserId == AspNetUserID).FirstOrDefaultAsync();
            var teDhenatShporta = await _context.TeDhenatShporta.Where(x => x.ShportaID == shporta.ShportaID).ToListAsync();

            Porosit porosia = new()
            {
                AdresaID = shporta.AdresaPorosisID,
                IdKlienti = shporta.PerdoruesiID,
                LlojiPageses = porosit.LlojiPageses,
                LlojiTransportit = porosit.LlojiTransportit,
                QmimiTransportit = porosit.QmimiTransportit,
                Totali18TVSH = shporta.Totali18TVSH,
                Totali8TVSH = shporta.Totali8TVSH,
                TotaliProdukteve = shporta.TotaliProdukteveNeShporte,
                Zbritja = shporta.KodiZbritjes != null ? shporta.KodiZbritjes.QmimiZbritjes : 0
            };

            await _context.Porosit.AddAsync(porosia);
            await _context.SaveChangesAsync();

            foreach (var produktiNeShporte in teDhenatShporta)
            {
                var teDhenatEporosi = new TeDhenatEPorosis
                {
                    IdPorosia = porosia.IdPorosia,
                    IdProdukti = produktiNeShporte.ProduktiID,
                    QmimiProduktit = produktiNeShporte.QmimiPorduktit,
                    SasiaPorositur = produktiNeShporte.SasiaProduktit
                };

                await _context.TeDhenatEPorosis.AddAsync(teDhenatEporosi);
                await _context.SaveChangesAsync();

                var produkti = await _context.TeDhenatProduktit.FindAsync(produktiNeShporte.ProduktiID);

                if (produkti == null)
                {
                    return NotFound();
                }

                produkti.SasiaNeStok -= produktiNeShporte.SasiaProduktit;
                produkti.DataPerditsimit = DateTime.Now;

                await _context.SaveChangesAsync();

                _context.TeDhenatShporta.Remove(produktiNeShporte);
                await _context.SaveChangesAsync();
            }

            shporta.TotaliProdukteveNeShporte = 0;
            shporta.KodiZbritjesID = "NukKaZbritje";
            shporta.DataEFunditEPerditesimit = DateTime.Now;
            shporta.TotProd8TVSH = 0;
            shporta.TotProd18TVSH = 0;
            shporta.Totali8TVSH = 0;
            shporta.Totali18TVSH = 0;

            _context.Shporta.Update(shporta);
            await _context.SaveChangesAsync();

            return Ok(porosia.IdPorosia);
        }

        [Authorize(Roles = "Admin, Shites")]
        [HttpPut]
        [Route("PerditesoStatusinPorosis")]
        public async Task<IActionResult> PerditesoStatusinPorosis(int idPorosia, string statusi)
        {
            var porosia = await _context.Porosit.FirstOrDefaultAsync(p => p.IdPorosia == idPorosia);

            if (porosia == null)
            {
                return NotFound();
            }

            porosia.StatusiPorosis = statusi;

            _context.Porosit.Update(porosia);
            await _context.SaveChangesAsync();

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            await _adminLogService.LogAsync(userId, "Perditeso", "Porosit", porosia.IdPorosia.ToString(), $"Eshte Perditesuar statusi i Porosis: {statusi}");

            return Ok(porosia);
        }

        [Authorize]
        [HttpGet]
        [Route("TeDhenatFatQRCode")]
        public async Task<IActionResult> TeDhenatFatQRCode(int nrPorosis, string nrBarkodit)
        {
            var teDhenatEBiznesit = await _context.TeDhenatBiznesit.FirstAsync();
            var bankatBiznesit = await _context.Bankat.ToListAsync();
            var porsia = await _context.Porosit.Include(x => x.AdresaDorezimit).Where(x => x.IdPorosia == nrPorosis).FirstOrDefaultAsync();
            var teDhenatEPorosis = await _context.TeDhenatEPorosis.Include(x => x.Produkti).Where(x => x.IdPorosia == nrPorosis).ToListAsync();
            var LlogaritBankare = new List<string>();
            var ProduktetEPorosis = new List<string>();

            foreach (var bankat in bankatBiznesit)
            {
                var banka = $"{bankat.EmriBankes} - {bankat.NumriLlogaris}, Valuta: {bankat.Valuta}";

                LlogaritBankare.Add(banka);
            }

            foreach (var produktet in teDhenatEPorosis)
            {
                var produkti = $"{produktet.Produkti.EmriProduktit}, Sasia: {produktet.SasiaPorositur} cope, Qmimi: {produktet.QmimiProduktit} €, Totali: {produktet.QmimiProduktit * produktet.SasiaPorositur} €";

                ProduktetEPorosis.Add(produkti);
            }

            var Fatura = new
            {
                TeDhenatEBiznesit = new
                {
                    teDhenatEBiznesit.EmriIBiznesit,
                    teDhenatEBiznesit.Adresa,
                    Kontakti = teDhenatEBiznesit.Email + ", " + teDhenatEBiznesit.NrKontaktit,
                    NumratEBiznesit = $"NUI: {teDhenatEBiznesit.NUI}, Nr. TVSH: {teDhenatEBiznesit.NrTVSH}, NF: {teDhenatEBiznesit.NF}",
                    LlogaritBankare
                },
                Porosia = new
                {
                    NrFatures = nrBarkodit,
                    TotaliPorosisMeZbritje = porsia.Totali18TVSH + porsia.Totali8TVSH - porsia.Zbritja + " €",
                    Zbritja = porsia.Zbritja + " €",
                    porsia.TotaliProdukteve,
                    porsia.LlojiPageses,
                    porsia.StatusiPorosis,
                    Dergesa = new
                    {
                        Klienti = porsia.AdresaDorezimit.Emri + " " + porsia.AdresaDorezimit.Mbiemri,
                        AdresaDorezimit = $"{porsia.AdresaDorezimit.Adresa}, {porsia.AdresaDorezimit.Qyteti}, {porsia.AdresaDorezimit.Shteti} {porsia.AdresaDorezimit.ZipKodi}",
                        Transporti = $"Qmimi Transportit: {porsia.QmimiTransportit} €, Lloji Transportit: {porsia.LlojiTransportit}",
                        TotaliPerPagese = porsia.LlojiPageses == "Stripe" ? "0.00 €" : porsia.Totali18TVSH + porsia.Totali8TVSH - porsia.Zbritja + " €"
                    },
                    ProduktetEPorosis
                }
            };

            return Ok(Fatura);
        }
    }

}

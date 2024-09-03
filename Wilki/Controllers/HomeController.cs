using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Wilki.Models;
using Microsoft.AspNetCore.Authorization;
using Wilki.Data;
using Microsoft.EntityFrameworkCore;

namespace Wilki.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
                return LocalRedirect("/Identity/Account/Login");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public ActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
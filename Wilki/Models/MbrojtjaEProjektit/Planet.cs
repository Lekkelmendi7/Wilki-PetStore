using System.ComponentModel.DataAnnotations;

namespace Wilki.Models.MbrojtjaEProjektit
{
    public class Planet
    {
        [Key]
        public int PlanetID { get; set; }
        public string? Name { get; set; } = "";
        public string? Type { get; set; } = "";
        public string? isDeleted { get; set; } = "false";
    }
}

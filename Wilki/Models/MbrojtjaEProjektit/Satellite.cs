using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Wilki.Models.MbrojtjaEProjektit
{
    public class Satellite
    {
        [Key]
        public int SatelliteID { get; set; }
        public string? Name { get; set; } = "";
        public string? isDeleted { get; set; } = "false";
        public int? PlanetID { get; set; }
        [ForeignKey(nameof(PlanetID))]
        public virtual Planet? Planet { get; set; }
    }
}

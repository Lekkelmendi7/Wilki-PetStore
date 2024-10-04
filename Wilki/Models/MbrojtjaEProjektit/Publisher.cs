using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Wilki.Models.MbrojtjaEProjektit
{
    public class Publisher
    {
        [Key]
        public int PublisherID { get; set; }
        public string? PublisherName { get; set; } = "";
        public string? Location { get; set; } = "";

    }
}

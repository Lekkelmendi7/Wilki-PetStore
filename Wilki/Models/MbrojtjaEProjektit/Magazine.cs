using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Wilki.Models.MbrojtjaEProjektit
{
    public class Magazine
    {
        [Key]
        public int MagazineID { get; set; }
        public string? MagazineName { get; set; } = "";
        public int? IssueNumber { get; set; }
        public int? PublisherID { get; set; }

        [ForeignKey(nameof(PublisherID))]
        public virtual Publisher? Publisher { get; set; }
    }
}

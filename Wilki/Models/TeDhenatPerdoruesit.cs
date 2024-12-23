﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Wilki.Models
{
    public class TeDhenatPerdoruesit
    {
        [Key]
        public int TeDhenatID { get; set; }
        public string? NrKontaktit { get; set; } = "38344111222";

        public string? Qyteti { get; set; } = "Prishtine";

        public int? ZipKodi { get; set; } = 10000;

        public string? Adresa { get; set; } = "P.A.";

        public string? Shteti { get; set; } = "Kosove";

        public string? Gjinia { get; set; } = "M";
        

        public DateTime? DataLindjes { get; set; } = DateTime.Now;

        [ForeignKey("Perdoruesi")]
        public int UserID { get; set; }

        [JsonIgnore]
        public virtual Perdoruesi? User { get; set; }

        public DateTime? DataKrijimit { get; set; } = DateTime.Now;
    }
}

﻿using System.ComponentModel.DataAnnotations;

namespace Wilki.Models
{
    public class KategoriaProduktit
    {
        [Key]
        public int KategoriaId { get; set; }
        public string? LlojiKategoris { get; set; }
        public string? PershkrimiKategoris { get; set; }
        public string? isDeleted { get; set; } = "false";
    }
}

﻿using System.ComponentModel.DataAnnotations;

namespace Wilki.Models
{
    public class KompanitePartnere
    {
        [Key]
        public int KompaniaID { get; set; }
        public string? EmriKompanis { get; set; } = "";
        public string? Adresa { get; set; } = "";
        public string? isDeleted { get; set; } = "false";
    }
}

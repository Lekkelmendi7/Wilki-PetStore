﻿using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Wilki.Models
{
    public class Perdoruesi
    {
        [Key]
        public int UserID { get; set; }
        public string? Emri { get; set; } = "";
        public string? Mbiemri { get; set; } = "";
        public string? EmailFillestar { get; set; } = "";
        public string? Email{ get; set; } = "";
        public string AspNetUserId { get; set; }
        public DateTime? DataKrijimit { get; set; } = DateTime.Now;
        [ForeignKey("AspNetUserId")]
        public IdentityUser? AspNetUser { get; set; }

        public virtual TeDhenatPerdoruesit? TeDhenatPerdoruesit { get; set; }

        public virtual List<Porosit>? Porosit { get; set; }
    }
}


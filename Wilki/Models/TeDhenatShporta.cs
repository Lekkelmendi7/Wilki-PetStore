﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Wilki.Models
{
    public class TeDhenatShporta
    {
        [Key]
        public int TeDhenatShportaID { get; set; }
        public int ShportaID { get; set; }
        public int ProduktiID { get; set; }
        public int? SasiaProduktit { get; set; } = 0;
        public decimal? QmimiPorduktit { get; set; } = 0;
        public DateTime? KohaEVendosjesNeShportes { get; set; }  = DateTime.Now;

        [ForeignKey(nameof(ShportaID))]
        public virtual Shporta? Shporta { get; set; }
        [ForeignKey(nameof(ProduktiID))]
        public virtual Produkti? Produkti { get; set; }

    }
}

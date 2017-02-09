using System;
using System.Collections.Generic;
using System.Linq;

namespace CoreMenu.Models
{
    public class PaymentViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime Date { get; set; }
        public int Sum { get; set; }
        public string UserName { get; set; }
    }
}
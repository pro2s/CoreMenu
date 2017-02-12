using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoreMenu.Services;
using System.Net.Http;
using System.Net;

namespace CoreMenu.Controllers
{
    [ApiExceptionFilter]
    [Route("api/[controller]")]
    public class ParserController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<Dictionary<string, string>> Services()
        {
            List<Dictionary<string, string>> services = new List<Dictionary<string, string>>();
            var chudoPechka = new ChudoPechkaHtmlParser();
            var mcdonalds = new McDonaldsParser();

            services.Add(chudoPechka.GetInfo());
            services.Add(mcdonalds.GetInfo());
            
            return services;
        }

        public class Service
        {
            public string id { get; set; }
            public string name { get; set; }
            public string icon { get; set; }
        }
    }
}

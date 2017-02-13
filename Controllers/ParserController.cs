using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoreMenu.Services;
using System.Net.Http;
using System.Net;
using CoreMenu.Models;
using Microsoft.Extensions.Caching.Memory;

namespace CoreMenu.Controllers
{
    [ApiExceptionFilter]
    [Route("api/[controller]")]
    public class ParserController : Controller
    {
        private IMemoryCache _cache;

        public  ParserController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
            // Set cache options.
            var cacheEntryOptions = new MemoryCacheEntryOptions()
            // Keep in cache for this time, reset time if accessed.
            .SetSlidingExpiration(TimeSpan.FromHours(10));
        }       
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
        
        [HttpGet("[action]")]
        public ApiMessage Do()
        {
            IMenuParser parser = new ChudoPechkaHtmlParser();
            List<Menu> menus = parser.ParseMenu();
            // Save data in cache.
            _cache.Set("menus", menus);
            return new ApiMessage(String.Format("Parsed successful, {0} menus", menus.Count()));
        }

        public class Service
        {
            public string id { get; set; }
            public string name { get; set; }
            public string icon { get; set; }
        }
    }
}

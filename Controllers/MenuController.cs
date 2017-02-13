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
    public class MenuController : Controller
    {
        private IMemoryCache _cache;
        
        
        public MenuController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
            // Set cache options.
            var cacheEntryOptions = new MemoryCacheEntryOptions()
            // Keep in cache for this time, reset time if accessed.
            .SetSlidingExpiration(TimeSpan.FromHours(10));
        }       

        [HttpGet("[action]")]
        public IEnumerable<Menu> Menus()
        {
            List<Menu> menus = (List<Menu>) _cache.Get("menus");
            return menus;
        }
        
    }
}
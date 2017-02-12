using System;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

namespace CoreMenu.Controllers
{
    [ApiExceptionFilter]
    public class ErrorController : Controller
    {
        [HttpGet, HttpPost, HttpPut, HttpDelete]
        public HttpResponseMessage Handle404()
        {
            throw new InvalidOperationException("Api method not found.");
        }
    }
}
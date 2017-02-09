using CoreMenu.Models;
using System;
using System.Collections.Generic;

namespace CoreMenu.Services
{
    public interface IMenuParser
    {
        string Id();
        List<Menu> ParseMenu(DateTime? start);
        List<Menu> GetDayMenu();
        Dictionary<string, string> GetInfo();
    }
}

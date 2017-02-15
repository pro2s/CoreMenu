using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using CoreMenu.Models;

namespace CoreMenu.Services
{
    /// <summary>
    /// Base class for parsing menu from site chudo-pechka.by
    /// Reading page and get raw info - html for menu and link to doc file with menu
    /// </summary>
    public class ChudoPechka
    {
        const double FULL_PRICE = 3.5;
        const double PRICE = 3.0;

        protected string _url;
        protected DateTime _monday;
        protected IEnumerable<HtmlNode> _html_menu;
        protected string _url_menu;

        protected List<Menu> _weekmenu
        {
            get; set;
        }

        public async Task<string> ReadDataAsync()
        {
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(_url);
                client.DefaultRequestHeaders.Accept.Clear();
                var response = await client.GetAsync(_url);
                if (response.IsSuccessStatusCode)
                {
                    var rawHtml = await response.Content.ReadAsStringAsync();
                    return rawHtml;
                }
                return "";
            }
        }

        protected void ReadData()
        {
            string rawHtml = ReadDataAsync().Result;
            var html = new HtmlDocument();
            html.LoadHtml(rawHtml);
            _html_menu = html.GetElementbyId("issues").Elements("li");
            _url_menu = html.DocumentNode.Descendants("a")
                .Where(d => d.Attributes.Contains("class") && d.Attributes["class"].Value.Contains("file but"))
                .First()
                .Attributes["href"].Value;
        }
      
        public ChudoPechka()
        {
            _url = "http://chudo-pechka.by/";
            _monday = DateTime.UtcNow.StartOfWeek();
            _weekmenu = new List<Menu>();
            ReadData();
        }

        protected void Init()
        {
            _weekmenu.Clear();
        }



        protected List<Menu> FillMenu(List<Item> items, int day)
        {
            List<Menu> result = new List<Menu>();
            int order = 0;
            foreach (var item in items)
            {
                item.Order = order;
                order++;
            };

            // TODO: get template for menu from DB

            List<Item> copy_items = new List<Item>();
            copy_items = items.Select(item => (Item)item.Clone()).ToList();
            
            Menu daymenu = new Menu()
            {
                Name = "Полный обед",
                Price = ChudoPechka.FULL_PRICE,
                Items = copy_items,
                OnDate = _monday.AddDays(day),
                Type = MenuType.NormalMenu,
            };

            result.Add(daymenu);

            copy_items = new List<Item>();
            copy_items = items.Select(item => (Item)item.Clone()).ToList();
            
            if (copy_items.Count > 2)
            {
                copy_items.RemoveAt(1);
            }

            daymenu = new Menu()
            {
                Name = "Без первого",
                Price = ChudoPechka.PRICE,
                Items = copy_items,
                OnDate = _monday.AddDays(day),
                Type = MenuType.NormalMenu,
            };

            result.Add(daymenu);

            return result;
        }
        
    }
}
using CoreMenu.Models;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Net;

namespace CoreMenu.Services
{
    /// <summary>
    /// Get menu from html chudo-pechka.by
    /// </summary>
    public class ChudoPechkaHtmlParser : ChudoPechka, IMenuParser
    {
        private Dictionary<string, string> _info;

        public ChudoPechkaHtmlParser() : base()
        {
            _info = new Dictionary<string, string>();
            _info["id"] = "chudopechkahtml";
            _info["name"] = "Chudo-Pechka HTML";
            _info["icon"] = "http://chudo-pechka.by/assets/templates/Chudopechka/images/logo.png";
        }

        public string Id()
        {
            return _info["id"];
        }

        public Dictionary<string, string> GetInfo()
        {
            return _info;
        }

        public List<Menu> ParseMenu(DateTime? start = null)
        {
            if (start != null)
            {
                _monday = (DateTime)start;
            }
            ParseHtml();
            return _weekmenu;
        }

        public List<Menu> GetDayMenu()
        {
            List<Item> items = new List<Item>();
            List<Menu> menus = FillMenu(items, 0);
            return menus;
        }

        /// <summary>
        /// Load and parse menu from html page
        /// </summary>
        public void ParseHtml()
        {
            Init();
            int day = 0;

            foreach (var item in _html_menu)
            {
                List<Item> items = new List<Item>();
                try
                {
                    var menu_items = item.Element("div");
                    menu_items.InnerHtml = menu_items.InnerHtml.Replace("<br>", "\n");
                    string result = getDecodedHtml(menu_items);

                    // Regex for "<name>, <weight>(0-9,/,space)" or "<name>"
                    // @"((?<name>[^\n]+),(?<weight>[\s0-9/]+)([^\n]+))|(?<name>[^\n]+)"

                    // TODO: move Regex to config for service
                    var matches = Regex.Matches(result, @"(?<name>[^\n]+),(?<weight>[\s0-9/^$\n].+)");

                    foreach (Match m in matches)
                    {
                        Item menu_item = new Item();
                        menu_item.Name = m.Groups["name"].Value.Trim();
                        menu_item.Weight = m.Groups["weight"].Value.Trim();
                        items.Add(menu_item);
                    }

                }
                catch
                {
                    throw new ArgumentException();
                }

                if (items.Count > 0)
                {
                    _weekmenu.AddRange(FillMenu(items, day));
                }

                ++day;
                if (day > 4) break;
            }
        }

        private static string getDecodedHtml(HtmlAgilityPack.HtmlNode menu_items)
        {
            return WebUtility.HtmlDecode(menu_items.InnerText);
        }
    }

}
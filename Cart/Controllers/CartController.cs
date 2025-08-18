// Controllers/CartController.cs
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Xml.Linq;
using Cart.Models;

namespace Cart.Controllers
{

    public class CartController : Controller
    {
        private static List<CartItem> cart = new List<CartItem>();



        // Get the list of items in the cart
        public ActionResult Index()
        {
            CartItem cartI1 = new CartItem ();
            cartI1.Id = 1;
            cartI1.Name = "Test";
            cartI1.Price = 10;
            cartI1.Quantity = 5;
            cart.Add(cartI1);

            CartItem cartI2 = new CartItem();
            cartI2.Id = 1;
            cartI2.Name = "Test";
            cartI2.Price = 10;
            cartI2.Quantity = 5;
            cart.Add(cartI2);

            return Json(cart, JsonRequestBehavior.AllowGet);
        }

        // Add an item to the cart
        [HttpPost]
        public ActionResult AddToCart(int id, string name, decimal price, int quantity)
        {
            var item = cart.FirstOrDefault(x => x.Id == id);
            if (item == null)
            {
                cart.Add(new CartItem { Id = id, Name = name, Price = price, Quantity = quantity });
            }
            else
            {
                item.Quantity += quantity;
            }

            return Json(cart, JsonRequestBehavior.AllowGet);
        }

        // Remove an item from the cart
        [HttpPost]
        public ActionResult RemoveFromCart(int id)
        {
            var item = cart.FirstOrDefault(x => x.Id == id);
            if (item != null)
            {
                cart.Remove(item);
            }

            return Json(cart, JsonRequestBehavior.AllowGet);
        }
    }
}
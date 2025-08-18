using Cart.Models;
using System.Collections.Generic;
using System.Web.Mvc;
using System;
using System.Linq;
using Newtonsoft.Json;
using System.IO;

public class HomeController : Controller
{
    private static List<CartItem> cart = new List<CartItem>();
    
    public ActionResult Index()
    {
        return View();
    }

    public ActionResult About()
    {
        ViewBag.Message = "Your application description page.";

        return View();
    }

    public ActionResult Contact()
    {
        ViewBag.Message = "Your contact page.";

        return View();
    }

    [HttpGet]
    public JsonResult GetItems()
    {
        //CartItem cart1 = new CartItem();
        //cart1.Id = 10;
        //cart1.Name="Shirt";
        //cart1.Price = 100;
        //cart1.Quantity = 6;
        //cart.Add(cart1);
        return Json(cart, JsonRequestBehavior.AllowGet);
    }

    //[HttpPost]
    //public JsonResult AddToCart(int id, string name, decimal price, int quantity)
    //{
    //    // Log or debug to ensure values are being passed correctly
    //    Console.WriteLine($"id: {id}, name: {name}, price: {price}, quantity: {quantity}");

    //    var existingItem = cart.FirstOrDefault(x => x.Id == id);
    //    if (existingItem == null)
    //    {
    //        cart.Add(new CartItem { Id = id, Name = name, Price = price, Quantity = quantity });
    //    }
    //    else
    //    {
    //        existingItem.Quantity += quantity;
    //    }

    //    return Json(new { success = true, items = cart });
    //}

    [HttpPost]
    public JsonResult AddToCart()
    {
        try
        {
            // Read the raw JSON data from the request body
            string json = new StreamReader(Request.InputStream).ReadToEnd();

            // Deserialize the JSON into a CartItem object
            var newItem = JsonConvert.DeserializeObject<CartItem>(json);

            // Log or debug to ensure values are being passed correctly
            Console.WriteLine($"id: {newItem.Id}, name: {newItem.Name}, price: {newItem.Price}, quantity: {newItem.Quantity}");

            // Check if the item already exists in the cart
            var existingItem = cart.FirstOrDefault(x => x.Id == newItem.Id);
            if (existingItem == null)
            {
                // Add the new item to the cart if it doesn't exist
                cart.Add(new CartItem { Id = newItem.Id, Name = newItem.Name, Price = newItem.Price, Quantity = newItem.Quantity });
            }
            else
            {
                // Update the quantity of the existing item
                existingItem.Quantity += newItem.Quantity;
            }

            return Json(new { success = true, items = cart });
        }
        catch (Exception ex)
        {
            // Handle any errors that might occur during deserialization or processing
            return Json(new { success = false, message = "Error adding item", error = ex.Message });
        }
    }


    [HttpPost]
    public JsonResult RemoveFromCart(int id)
    {
        var item = cart.FirstOrDefault(x => x.Id == id);
        if (item != null)
        {
            cart.Remove(item);
        }

        return Json(new { success = true, items = cart });
    }

    [HttpPost]
    public JsonResult EditItem(CartItem updatedItem)
    {
        try
        {
            var item = cart.FirstOrDefault(x => x.Id == updatedItem.Id);
            if (item != null)
            {
                item.Name = updatedItem.Name;
                item.Price = updatedItem.Price;
                item.Quantity = updatedItem.Quantity;
            }

            return Json(new { success = true, items = cart });
        }
        catch (Exception ex)
        {
            return Json(new { success = false, message = "Error editing item", error = ex.Message });
        }
    }
    [HttpPost]
    public JsonResult Login(LoginModel model)
    {
        if (ModelState.IsValid)
        {
            // Mock user authentication
            if (model.Username == "admin" && model.Password == "password123")
            {
                Session["Username"] = model.Username.ToString();
                return Json(new { success = true, message = "Login successful!" });
            }
            else
            {
                return Json(new { success = false, message = "Invalid credentials" });
            }
        }
        else
        {
            return Json(new { success = false, message = "Invalid input" });
        }
    }

    [HttpGet]
    public ActionResult Logout()
    {
        cart.Clear();
        //Session["UserID"] = null;
        Session["Username"] = null;
        Session.Clear();
        Session.Abandon();

        // Clear authentication token if you're using a token-based system (JWT, etc.)
        // If you're storing tokens in cookies, remove the cookie
        Response.Cookies["authToken"].Expires = DateTime.Now.AddDays(-1); // Set cookie expiration to a past date

        // If you're using JWT tokens stored in cookies or localStorage, make sure to remove the token on the client-side

        // Return a successful logout response

        return View("Index");
    }
}
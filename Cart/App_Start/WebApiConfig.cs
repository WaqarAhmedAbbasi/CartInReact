using System.Web.Http;
using System.Web.Http.Cors;

namespace Cart.App_Start
{

    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Enable CORS for all domains (or specify specific ones)
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            config.MapHttpAttributeRoutes();

        }
    }
}
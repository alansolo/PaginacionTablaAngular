using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PaginacionTablaAngular.Controllers
{
    public class PaginacionController : Controller
    {
        // GET: Paginacion
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult CargarDatos()
        {
            List<Models.Dato> ListaDatos = new List<Models.Dato>();

            int total = 50;


            for (int i = 0; i < total; i++)
            {
                Models.Dato dato = new Models.Dato();
                dato.Id = i;
                dato.Nombre = i.ToString();
                dato.Descripcion = "Desc " + i.ToString();
                ListaDatos.Add(dato);
            }

            return Json(ListaDatos, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Pagina()
        {
            return View();
        }
    }
}
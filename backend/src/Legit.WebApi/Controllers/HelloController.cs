using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Legit.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class HelloController : ControllerBase
{
    public IActionResult Index()
    {
        return Ok("Hello world!");
    }
}

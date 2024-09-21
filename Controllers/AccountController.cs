using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Portal.Data;
using Portal.Domain;
using Portal.Domain.DTOs;
using Portal.Validations;
using System.Data;
using System.Security.Claims;

namespace Portal.Controllers
{

    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountValidator validator;
        private readonly IConfiguration configuration;
        private readonly ApplicationDbContext context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly IMemoryCache memoryCache;

        public AccountController(AccountValidator _validator, IConfiguration _configuration, ApplicationDbContext _context,UserManager<ApplicationUser> _userManager, SignInManager<ApplicationUser> _signInManager, IMemoryCache _memoryCache)
        {
            validator = _validator;
            configuration = _configuration;
            context = _context;
            userManager = _userManager;
            signInManager = _signInManager;
            memoryCache =_memoryCache;
        }


        [HttpPost]
      [Route("api/Account/Login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO login)
        {
            //validate client email credential
            ApplicationUser user = await userManager.FindByEmailAsync(login.Email);
            
            if (user != null)
            {
                //validate client password credential
                var signInAttempt = await signInManager.PasswordSignInAsync(user, login.Password, false, false);
                
                if (signInAttempt == Microsoft.AspNetCore.Identity.SignInResult.Success)
                {
                    //presist user's data by storing thier id in memory cache
                    memoryCache.Set("User_Identifier", user.Id, new MemoryCacheEntryOptions
                    {
     
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30)
                    });

                    return Ok();
                }
                else
                {//bad password
                    return Unauthorized();
                }
             
            }
            //bad email
            return NotFound();
        }
        [HttpPost]
        [Route("api/Account/Register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO register)
        {
            //get users current id from cache
            if (memoryCache.TryGetValue("User_Identifier", out string userIdentifier))
            {
                //authenticate users exist by checking for id in database
                var user = await userManager.FindByIdAsync(userIdentifier);

                if (user != null)
                {
                    if(user.CompanyRole != configuration.GetValue<string>("ADMIN_ACCOUNT"))
                    {//user is NOT an admin and does not have authorization to create a user
                        return Unauthorized();
                    }
                }
                else
                {//could not find user
                    return NotFound();
                }
            }
            //ensure new user details is valid
            if (validator.ValidateRegistration(register, configuration))
            {
                //create new user
                ApplicationUser newAccount = new ApplicationUser
                {
                    UserName =register.Email,
                    Email = register.Email,
                    FirstName = register.FirstName,
                    LastName = register.LastName,
                    LastLogin = null,
                    InvitationStatus = false,
                    PortalAccess = true,
                    CompanyRole = register.CompanyRole,
                };

                await userManager.CreateAsync(newAccount, register.Password);

                await context.SaveChangesAsync();

                return Ok();

            }
            else
            {//details for new user bad
                return UnprocessableEntity();
            }
       
        }
        [HttpGet]
        [Route("api/Account")]
        public async Task<IActionResult> GetUserSession()
        {
            //get current users id from cache
            if (memoryCache.TryGetValue("User_Identifier", out string userIdentifier))
            {
                var user = await userManager.FindByIdAsync(userIdentifier);

                if (user != null)
                {
                    return Ok();
                }
            }
            return NotFound();
        }

        [HttpGet]
        [Route("api/Account/Logout")]
        public async Task<IActionResult> Logout()
        {
            //get and remove users id from the cache
            if (memoryCache.TryGetValue("User_Identifier", out string userIdentifier))
            {
                memoryCache.Remove("User_Identifier");

                return Ok();
            }
            return NotFound();
        }

        [HttpGet]
        [Route("api/Account/GetAll")]
        public async Task<IActionResult> GetCompanyUsers()
        {
            //get all users
            var allUsers = await userManager.Users.ToListAsync();

            //map users to DTO using select projection
            List<UserViewDTO> userViews = allUsers.Select(databaseUsers =>
                new UserViewDTO 
                {
                    Email = databaseUsers.Email,
                    CompanyRole = databaseUsers.CompanyRole,
                    FullName = databaseUsers.FirstName + " " + databaseUsers.LastName,
                    PortalAccess = databaseUsers.PortalAccess,
                    InvitationStatus = databaseUsers.InvitationStatus,
                    LastLogin = databaseUsers.LastLogin
                }).ToList();

            return Ok(userViews);
   
        }
    }
}

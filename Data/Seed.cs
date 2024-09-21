using Microsoft.AspNetCore.Identity;
using Microsoft.Win32;
using Portal.Domain;

namespace Portal.Data
{
    public class Seed
    {
        public static async Task AddDefaultUser(ApplicationDbContext context,
          UserManager<ApplicationUser> userManager, string role)
        {
            //if identity table empty
            if (!userManager.Users.Any())
            {
                ApplicationUser testAccount = new ApplicationUser
                {
                    UserName = "test@test.com",
                    Email = "test@test.com",
                    FirstName = "Test",
                    LastName = "User",
                    LastLogin = null,
                    InvitationStatus = false,
                    PortalAccess = true,
                    CompanyRole = role,
                };
               
              await userManager.CreateAsync(testAccount, "test");         

                  await context.SaveChangesAsync();

            }
               
        }
    }
}

using Microsoft.AspNetCore.Identity;

namespace Portal.Domain
{
    public class ApplicationUser : IdentityUser
    {
       
        public DateTime? LastLogin { get; set; }

        public bool InvitationStatus { get; set; }

        public bool PortalAccess { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }
    
        public string? CompanyRole { get; set; }
    }
}

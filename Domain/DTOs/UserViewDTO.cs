namespace Portal.Domain.DTOs
{
    public class UserViewDTO
    {
        public UserViewDTO() { }

        public string Email { get; set; }

        public string CompanyRole { get; set; }

        public string FullName { get; set; }

        public bool PortalAccess { get; set; }

        public bool InvitationStatus { get; set; }

        public DateTime? LastLogin { get; set; }

  
    }
}

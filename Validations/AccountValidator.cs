using Portal.Domain.DTOs;
using System.Text.RegularExpressions;

namespace Portal.Validations
{
    public class AccountValidator
    {
       private const string emailPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
        
        public bool ValidateRegistration(RegisterDTO register, IConfiguration configuration)
        {
            if(register == null)
            {
                return false;
            }
            if(Regex.IsMatch(register.Email, emailPattern) == false) 
            {
                return false;
            }
            if(register.Password.Length < 4)
            {
                return false;
            }
            if (register.FirstName.Length == 0)
            {
                return false;
            }
            if (register.LastName.Length == 0)
            {
                return false;
            }
            if(register.CompanyRole != configuration.GetValue<string>("ADMIN_ACCOUNT") && register.CompanyRole != configuration.GetValue<string>("GENERAL_ACCOUNT"))
            {
                return false;
            }
            return true;
        }

   
    }
}

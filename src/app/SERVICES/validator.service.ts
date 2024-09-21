
export class ValidatorService {

  EmailValidator(email: string):boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {

      return true;
    }
    return false;
  }
  PasswordValidator(password: string): boolean {
    
    if (password.length >= 4) {

      return true;
    }
    return false;
  }
  
 NameValidator(name: string): boolean {

    if (name.length != 0) {

      return true;
    }
    return false;
  }
  RoleValidator(role: string): boolean {

    if (role === "General" || role === "Admin") {

      return true;
    }
    return false;
  }
}

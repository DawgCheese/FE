const passwordRegex = /^[a-zA-Z0-9]{6,32}$/

class Validator{
    validatePassword(password: string){
        if(!password)
            return "Password is required !"
        if(!passwordRegex.test(password)){
            return "Password have 6-32 characters, includes a-z, A-Z, 0-9 !"
        }
    }

    validateUsername(username: string){
        if(!username)
            return "Username is required"
        if(!passwordRegex.test(username)){
            return "Username have 6-32 characters, includes a-z, A-Z, 0-9 "
        }
    }

    validateConfirmPassword(password: string, confirm: string){

        if(password !== confirm){
            return "Re-enter password not match"
        }
        if(!password)
            return "Re-enter is required"
    }
}

export default new Validator();
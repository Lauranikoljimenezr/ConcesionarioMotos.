import UserRepository from '../repositories/UserRepository';
import User from '../Dto/UserDto';
import generateHash from '../helpers/generateHash';
import Auth from '../Dto/UserAuthenticationDto';
import bcrypt from "bcryptjs";



class UserService {

    static async register(user: User) {
        user.password = await generateHash(user.password);
        return await UserRepository.add(user);
    }
 
    static async auth(auth: Auth){
        const result: any = await UserRepository.logeo(auth);
        if (result[0].length > 0){
            const isPasswordValid = await UserService.comparePassword(auth.password, result[0][0].password);
            if(isPasswordValid){
                return {logged: true, status: "Succesful Authentication"}
            } else {
                return {logged: false, status: "Incorrect username or password"}
            }
        } else {
            return {logged: false, status: "Incorrect username or password"}
        }
    }

    private static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}

export default UserService;

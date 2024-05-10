import UserRepository from '../repositories/UserRepository';

class MotoService {
    static async getAllMotos() {
        return await UserRepository.getAllMotos();
      }
}
export default MotoService;
import User from '../models/user.model';

export const profileService = async (userId: string): Promise<object> => {

    const user = await User.findById(userId);

    if (!user) {
        throw 'Account does not exists!';
    }

    return user;
};
import User from '../models/user.model';

export const profileService = async (userId: string): Promise<object> => {

    var user = await User.findById(userId);

    if (!user) {
        throw 'Account does not exists!';
    }

    return user;
};

export const updateProfileImage = async (userId: string, profileImage: string): Promise<object> => {

    var user = await User.findByIdAndUpdate(userId, { profileImage: profileImage }, { new: true });

    if (!user) {
        throw 'Account does not exists!';
    }

    return user;
};
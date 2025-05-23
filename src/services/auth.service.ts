import User from '../models/user.model';

export const signupService = async (reqBody: any): Promise<object> => {
    const { firstName, lastName, phoneNumber, email, password } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
        throw 'This email already exists!';
    }

    var newUserObj = {
        email: email.toLowerCase(),
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        updated: new Date()
    };

    var newUser = new User(newUserObj);
    var savedUser = await newUser.save();
    return savedUser;
};

export const loginService = async (reqBody: any): Promise<object> => {
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
        throw 'Invalid email';
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw 'Invalid password';
    }

    return user;
};

export const refreshTokenCheckUser = async (reqBody: any): Promise<object> => {
    const user = await User.findById(reqBody.id);
    if (!user) {
        throw 'User not found';
    }
    return user;
};
import bcrypt from "bcrypt";

const hashPassword = async (password) =>
    new Promise((resolve, reject) => {
        bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), (err, salt) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }

            bcrypt.hash(password, salt, (err, hashedPassword) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }

                resolve(hashedPassword);
            })
        });
    });


export default Object.freeze({
    hashPassword: hashPassword
});
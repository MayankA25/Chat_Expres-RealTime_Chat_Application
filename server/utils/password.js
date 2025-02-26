import bcrypt from "bcryptjs"

export const hashPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10)

    const hashedPassword = bcrypt.hash(password, salt);

    return hashedPassword;
}

export const comparePassword = async (passwrod, hashedPassword)=>{
    const result = await bcrypt.compare(passwrod, hashedPassword)
    return result
}
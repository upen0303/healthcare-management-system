import User from "../models/User.js";

const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: "admin@gmail.com" });

    if (!adminExists) {
      await User.create({
        name: "Super Admin",
        email: "admin@gmail.com",
        password: "admin123",
        role: "admin",
      });

      console.log("Admin user created: admin@gmail.com / admin123");
    }
  } catch (error) {
    console.log("Error creating admin:", error.message);
  }
};

export default createAdminUser;

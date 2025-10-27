import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import vertaxLogo from "@/assets/images/vertaxLogo.svg";
import authScreenImage from "@/assets/images/authScreenImage.svg";
import favIconVertax from "@/assets/images/favicon VERTEX.svg";
import eyeIcon from "@/assets/images/eyeIcon.png";
import eyeFill from "@/assets/images/eyeFill.png";

const Login = ({ message = "" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    console.log(payload);
    if(data.email === "admin@gmail.com", data.password === "password"){
      navigate("/dashboard");
    }
    // setIsLoading(true);
    // doLogin(payload, navigate, permissions).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);
    const handleBack = () => navigate("/admin/dashboard", { replace: true });
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-between items-center w-1/2 bg-gray-50 px-10 py-6">
        <div className="flex flex-col items-center text-center flex-grow justify-center">
          <img src={vertaxLogo} alt="Vertax Logo" className="w-32 mb-6" />

          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Effortless Ticket Tracking & Resolution
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed max-w-sm mb-6">
            Empower your team to manage, assign, and resolve support tickets efficiently while keeping customers happy.
            Streamline workflows, automate repetitive tasks, and track every issue in real time for faster, smarter resolutions.
          </p>

          {/* Image with controlled height */}
          <img
            src={authScreenImage}
            alt="Illustration"
            className="w-full max-w-xs h-auto object-contain select-none max-h-[280px]"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between w-full text-gray-500 text-xs mt-4">
          <div className="flex items-center">
            <p className="mr-2">© 2023 Vertex. All Rights Reserved.</p>
            <img src={favIconVertax} alt="favicon" className="w-6 h-6" />
          </div>
          <p>Ver. 1.1.0</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-white px-6 md:px-10">
        {isLoading ? (
          <div className="text-gray-600 text-sm">Loading...</div>
        ) : (
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-800">Login</h2>
              {message && (
                <p className="bg-red-100 border border-red-300 text-red-600 text-sm mt-3 p-2 rounded">
                  {message}
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {/* Uncomment if you want error text */}
                {/* {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )} */}
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", { required: "Password is required" })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <img
                  src={showPassword ? eyeFill : eyeIcon}
                  alt="Toggle"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-9 w-5 h-5 cursor-pointer"
                />
                {/* {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )} */}
              </div>

              {/* Options */}
              <div className="flex justify-between items-center text-sm text-gray-600">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 accent-indigo-600" />
                  Keep me logged in
                </label>
                <NavLink
                  to="/login"
                  className="text-indigo-600 hover:underline"
                >
                  Forgot Password?
                </NavLink>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

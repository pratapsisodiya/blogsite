"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="mb-8">
        <svg
          viewBox="0 0 24 24"
          className="w-16 h-16 fill-current text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.158 12.786l-2.698 7.84c.806.236 1.657.365 2.54.365 1.047 0 2.05-.176 2.986-.502-.02-.033-.038-.073-.05-.12l-2.778-7.583zm3.822-4.8c.552 0 .915.544.915 1.158 0 .58-.23 1.23-.48 1.882l-1.406 4.088 2.296-6.664c.174-.508.262-.95.262-1.326 0-.544-.194-.962-.587-1.138zM12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 1.163c-4.88 0-8.837 3.957-8.837 8.837 0 1.57.412 3.047 1.135 4.326L8.562 5.4c.05-.145.138-.208.273-.208.19 0 .385.072.434.25l1.655 4.542 2.13-6.17c-.347-.076-.714-.116-1.09-.116l.036-.54zM4.57 12.031l5.46 14.935c-.172.054-.35.102-.53.144L3.257 8.358c-.067.456-.102.923-.102 1.4 0 .796.08 1.57.234 2.315l1.18 3.425v-.016c.03.09.055.18.083.27zm13.726 5.564c.732-1.287 1.154-2.775 1.154-4.36 0-1.436-.34-2.793-.944-3.993l-3.344 9.69c.143-.056.284-.117.42-.183l.11-.055c.9-.452 1.76-1.12 2.604-1.102z" />
        </svg>
      </div>

      <div className="w-full max-w-sm bg-white p-8 border border-gray-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username or Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-lg pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-xs italic border-l-4 border-red-500 pl-2 py-1 bg-red-50">{error}</p>}

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
              <span>Remember Me</span>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 flex flex-col items-center space-y-4 text-sm text-gray-600">
        <Link href="/signup" className="text-blue-600 font-bold hover:underline">
          Register for an account
        </Link>
        <Link href="/" className="hover:text-blue-500">
          ← Go to The Daily Blog
        </Link>
        <div className="flex space-x-4">
          <Link href="#" className="hover:text-blue-500">Lost your password?</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

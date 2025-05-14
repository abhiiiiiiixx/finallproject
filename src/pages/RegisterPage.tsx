
import { Link } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { MotionDiv } from "@/components/ui/motion-div";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <Link to="/" className="flex justify-center mb-6">
          <span className="font-bold text-3xl text-fitness-primary">FitLife</span>
        </Link>
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create an account
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Join FitLife to start your personalized nutrition journey
          </p>
        </MotionDiv>
      </div>
      <AuthForm type="register" />
    </div>
  );
};

export default RegisterPage;

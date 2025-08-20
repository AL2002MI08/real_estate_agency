import { useNavigate } from 'react-router-dom';
import SignUpForm from '../Forms/SignupForm';


export default function SignUpPage() {
  const navigate = useNavigate()

  const handleSignupSuccess = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <SignUpForm 
          onSuccess={handleSignupSuccess}
        />
      </div>
    </div>
  );
}
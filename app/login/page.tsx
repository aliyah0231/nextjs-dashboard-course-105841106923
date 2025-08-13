import LoginForm from '../ui/login-form';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}

import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {
    const [login, setLogin] = useState(true)

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full fade-in">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-600">
                        {login ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {login ? "Log in to manage your short URLs" : "Sign up to start creating short URLs"}
                    </p>
                </div>
                
                <div className="bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-2 border-b">
                        <button 
                            className={`py-3 font-medium text-center transition-colors duration-200 ${
                                login 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            onClick={() => setLogin(true)}
                        >
                            Login
                        </button>
                        <button 
                            className={`py-3 font-medium text-center transition-colors duration-200 ${
                                !login 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            onClick={() => setLogin(false)}
                        >
                            Register
                        </button>
                    </div>
                    
                    <div className="p-6">
                        {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
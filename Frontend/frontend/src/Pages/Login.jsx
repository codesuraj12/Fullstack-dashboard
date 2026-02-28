import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate,Link} from 'react-router-dom'

const Login = () => {

   const navigate = useNavigate();
const [formData, setFormData] = useState({
    email:'',
     password :''
})

const [loading,setLoading] = useState(false)
const [error,setError] = useState('')

const handlechange =(e)=>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    }
    )
}

const handleSubmit = async (e)=>{
e.preventDefault();
setError('')
if(!formData.email || !formData.password){
    return setError('All Fields Are Required')
}

try {
   setLoading(true)
   
   const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData)

   console.log(res.data)
    // Save token
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
   
} catch (error) {
    setError(error.response?.data?.message || "Login failed");
}
finally{
    setLoading(false)
}
}


  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>


         <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handlechange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handlechange}
          />
{error && (
          <p className="text-red-500 text-sm mb-4 ">
            {error}
          </p>
        )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>


         <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
        
</div>
    </div>
  )
}

export default Login
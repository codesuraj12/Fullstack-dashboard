import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Profile = () => {

const [message,setMessage] = useState("");

const[loading,setLoading] = useState(false);

const [user,setUser] = useState({
  name: "",
  email : ""
})

const handlechange =(e)=>{
setUser({
...user,
[e.target.name] :e.target.value
})
}


 let token = localStorage.getItem("token")
//  profile fetch
const featchprofile =async()=>{

    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        setUser({
            name:res.data.name,
            email: res.data.email
        })

    } catch (error) {
        console.error(error)
    }
}

useEffect(()=>{
featchprofile();
},[])





// form submit handlar
const handleupdate =async(e)=>{

    e.preventDefault();
    setLoading(true);
    setMessage("");

 try {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/auth/profile`, user,{
        headers: {
           Authorization: `Bearer ${token}`,
        }
    })
      setMessage("Profile updated successfully ✅");
 } catch (error) {
     setMessage("Update failed ");
 }
 finally {
      setLoading(false);
    }
}



  return (
     <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          My Profile
        </h2>

        {message && (
          <p className="text-center mb-4 text-sm text-green-600">
            {message}
          </p>
        )}

        <form onSubmit={handleupdate} className="space-y-4">
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handlechange}
            className="w-full border p-3 rounded-lg"
            placeholder="Full Name"
          />

          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handlechange}
            className="w-full border p-3 rounded-lg"
            placeholder="Email"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile
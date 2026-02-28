import axios from 'axios';
import React, { use, useEffect, useState } from 'react'

import { useNavigate, Link } from 'react-router-dom'


const Dashboard = () => {

    const navigate = useNavigate()

    const [title, setTitle] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);


    // Logout>

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/")
    }


    // get profile
    const profilehandle =()=>{
        navigate("/profile")
    }

    // fetch profile

    const fetchprofile = async () => {
        try {
            const token = localStorage.getItem("token")



            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(res.data)
        }

        catch (error) {
            console.error(error)
        }

    };


    // fetch tasks

    const fetchtask = async () => {
        try {
            const token = localStorage.getItem("token")

            console.log("Token:", token);
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/tasks`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(res.data)
            setTasks(res.data)

        } catch (error) {
            console.log(error)
        }
    }

    // onsubmit
    const handleAddTask = async (e) => {
        e.preventDefault()

        if (!title) return;

        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/tasks`,
                { title }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setTasks([res.data, ...tasks]);
            setTitle("");

        } catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false);
        }

    }


    // delete task

    const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/auth/tasks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    
    setTasks((prev) => prev.filter((task) => task._id !== id));

  } catch (error) {
    console.error(error);
  }
};

    useEffect(() => {
        console.log("Token in Dashboard:", localStorage.getItem("token"));
        fetchprofile();
        fetchtask();
    }, [])


    return (
        <div className="min-h-screen bg-gray-100">

            <div className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Dashboard</h1>

                <div className='flex gap-4'>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                    Logout
                </button>

                <button
                    onClick={profilehandle}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    My Profile
                </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-6">

                <h2 className="text-2xl font-semibold mb-4">
                    Welcome, {user?.name || "User"} 👋
                </h2>


                <form
                    onSubmit={handleAddTask}
                    className="flex gap-4 mb-6"
                >
                    <input
                        type="text"
                        placeholder="Enter task..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="flex-1 border p-3 rounded-lg"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 rounded-lg"
                    >
                        {loading ? "Adding..." : "Add"}
                    </button>
                </form>

                {/* Task List */}
                <div className="space-y-3">
                    {tasks.length === 0 ? (
                        <p className="text-gray-500">No tasks yet.</p>
                    ) : (
                        tasks.map((task) => (
                            <div
                                key={task._id}
                                className="bg-white p-4 rounded-lg shadow flex justify-between"
                            >
                                <span>{task.title}</span>
                                <button onClick={()=> handleDelete(task._id)} className="text-red-500">
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
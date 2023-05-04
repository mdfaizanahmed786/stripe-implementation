import { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";


const FormComponent = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/api/auth/register", {
            email,
            password,
        }).then((res) => {
          
          localStorage.setItem("user", JSON.stringify({email: res.data.email, stripeId: res.data.stripeId}));
          navigate("/");
          
        }).catch((err) => {
            console.log(err);
        })
      
    }

  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg  w-1/2  mt-10 items-center mx-auto  sm:px-6 lg:px-8">
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="*********"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sumbit
        </button>
      </div>
    </form>
  </div>
  )
}

export default FormComponent
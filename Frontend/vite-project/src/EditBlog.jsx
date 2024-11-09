import axios from 'axios'
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function EditBlog() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState({
    title: '',
    subtitle: '',
    description: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value
    })
  }

  const editBlog = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.patch(`http://localhost:3000/blog/${id}`, data)
      if (response.status === 200) {
        alert("Edited successfully")
        navigate('/')
      } else {
        alert("Something went wrong")
      }
    } catch (error) {
      console.error("Error editing blog:", error)
      alert("Failed to edit blog.")
    }
  }

  return (
    <>
      <div>
        <div className="mx-14 mt-10 border-2 border-blue-400 rounded-lg">
          <div className="mt-10 text-center font-bold">Wanna edit Blog?</div>
          <div className="mt-3 text-center text-4xl font-bold">Edit Blog</div>
          <form onSubmit={editBlog}>
            <div className="p-8">
              <div className="flex gap-4">
                <input
                  type="text"
                  name="title"
                  className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  placeholder="Title *"
                  onChange={handleChange}
                  value={data.title}
                />
                <input
                  type="text"
                  name="subtitle"
                  className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  placeholder="Subtitle *"
                  onChange={handleChange}
                  value={data.subtitle}
                />
              </div>
              <div className="mt-4">
                <textarea
                  name="description"
                  cols="30"
                  rows="10"
                  className="mb-10 h-40 w-full resize-none rounded-md border border-slate-300 p-5 font-semibold text-gray-500"
                  placeholder="Description"
                  onChange={handleChange}
                  value={data.description}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="cursor-pointer rounded-lg bg-blue-700 px-8 py-5 text-sm font-semibold text-white">
                  Edit Blog
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditBlog

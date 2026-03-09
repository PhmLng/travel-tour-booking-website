import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SidebarInset } from "../ui/sidebar"
import { SiteHeader } from "../site-header"

export const TourManage = () => {

  const [tours, setTours] = useState([
    { id: 1, name: "Tour Đà Nẵng", location: "Đà Nẵng", price: 5000000, duration: 3 }
  ])

  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    duration: ""
  })

  const handleEdit = (tour) => {
    setForm(tour)
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <SidebarInset>
    <SiteHeader />  
    <div className="grid grid-cols-2 gap-8 p-6">
      <div>
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Tour Management</h1>

          <Button onClick={()=>setForm({name:"",location:"",price:"",duration:""})}>
            Create Tour
          </Button>
        </div>

        <table className="w-full border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Price</th>
              <th>Duration</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {tours.map((tour)=>(
              <tr key={tour.id}>
                <td>{tour.name}</td>
                <td>{tour.location}</td>
                <td>{tour.price}</td>
                <td>{tour.duration}</td>

                <td>
                  <Button size="sm" onClick={()=>handleEdit(tour)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      <div className="p-4 border rounded-lg">
        <h2 className="mb-4 text-lg font-semibold">
          Tour Form
        </h2>

        <div className="space-y-3">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tour name"
            className="w-full p-2 border rounded"
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 border rounded"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border rounded"
          />

          <input
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Duration"
            className="w-full p-2 border rounded"
          />

          <Button className="w-full">
            Save
          </Button>

        </div>
      </div>

    </div>
    </SidebarInset>
  )
}
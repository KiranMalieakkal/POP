// This component should receive Props from it's parent component
// The Props should be a function that sets the list of receipts.
// That way this component can call the function and pass the new receipt as an argument

// todo: get a list of available projects to choose from in the drop-down menu.
// todo: add dropzone for image/file
// todo: fill fields with data from POST-response
// todo: collect data fields and send as a POST new receipt to server

import React, { useState } from "react";

function AddReceipt() {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    company: "",
    amount: "",
    date: "",
    text_content: "",
    project: "",
  });

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle submitting form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form was sent", formData);
    // Handle form submission (e.g., send data to server)
  };

  return (
    <>
      <div className="bg-slate-100 size-full">
        <button className="btn border-2 border-black">{"return"}</button>
        <h1>Add receipt</h1>
        <form onSubmit={handleSubmit} className="border-2 border-black p-10">
          <label htmlFor="company">Purchased from</label>
          <br></br>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="purchased from..."
            required
            className="input input-bordered w-full"
            value={formData.company}
            onChange={handleChange}
          />
          <br></br>
          <label htmlFor="amount">Amount</label>
          <br></br>
          <input
            type="number"
            step="0.01"
            id="amount"
            name="amount"
            placeholder="total amount..."
            className="input input-bordered w-full"
            value={formData.amount}
            onChange={handleChange}
          />
          <br></br>
          <label htmlFor="date">Date</label>
          <br></br>
          <input
            type="date"
            id="date"
            name="date"
            placeholder="date of purchase"
            className="input input-bordered w-full"
            value={formData.date}
            onChange={handleChange}
          />
          <br></br>
          <label htmlFor="text_content">Text content</label>
          <br></br>
          <textarea
            id="text_content"
            name="text_content"
            className="input input-bordered w-full"
            value={formData.text_content}
            onChange={handleChange}
          />
          <br></br>
          <label htmlFor="project">Project (optional)</label>
          <br></br>
          <select
            id="project"
            name="project"
            className="select input-bordered w-full"
            value={formData.project}
            onChange={handleChange}
          >
            <option disabled value="">
              pick one or create a new...
            </option>
            <option value="Hello">Hello</option>
            <option value="darkness">darkness</option>
            <option value="my old friend">my old friend</option>
          </select>
          <br></br>
          <input
            type="submit"
            value="Save"
            className="btn btn-primary w-full"
          />
        </form>
      </div>
    </>
  );
}

export default AddReceipt;

// This component should receive Props from it's parent component
// The Props should be a function that sets the list of receipts.
// That way this component can call the function and pass the new receipt as an argument

// todo: get a list of available projects to choose from in the drop-down menu.
// todo: add dropzone for image/file
// todo: add image/pdf preview in dropzone
// todo: fill fields with data from POST-response
// todo: collect data fields and send as a POST new receipt to server

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function AddReceipt() {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    company: "",
    amount: "",
    date: "",
    text_content: "",
    project: "",
  });

  // State to manage uploaded files
  const [files, setFiles] = useState<File[]>([]);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file drop
  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  // Function to handle submitting form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form was sent", formData, files);
    // Handle form submission (e.g., send data to server)
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div className="bg-slate-100 size-full">
        <button className="btn border-2 border-black">{"return"}</button>
        <h1>Add receipt</h1>
        <form onSubmit={handleSubmit} className="border-2 border-black p-10">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed p-6 mt-4 ${
              isDragActive ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
          <br></br>
          <br></br>
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
          <br></br>
          <label htmlFor="text_content">Text content (optional)</label>
          <br></br>
          <textarea
            id="text_content"
            name="text_content"
            className="input input-bordered w-full"
            value={formData.text_content}
            onChange={handleChange}
          />
          <br></br>
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
              pick one...
            </option>
            <option value="Hello">Hello</option>
            <option value="darkness">darkness</option>
            <option value="my old friend">my old friend</option>
          </select>
          <br></br>
          <br></br>
          <input
            type="submit"
            value="Save"
            className="btn btn-primary w-full"
          />
        </form>
        <br></br>
        <br></br>
      </div>
    </>
  );
}

export default AddReceipt;

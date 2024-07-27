import { useState } from "react";
import ReturnArrow from "/return-arrow.svg";
import UploadingFile from "../components/UploadingFile";
import { useNavigate } from "react-router-dom";

type Receipt = {
  company: string;
  amount: number;
  currency: string;
  purchaseDate: string;
  textContent: string;
  project?: string;
};

function AddReceipt() {
  // todo: this is the list of existing project the user can choose from.
  // it should be sent to the component as a prop
  const existingProjects = [
    "Kirans work commute 2024",
    "Tax evasion project 2025",
    "Option 3",
  ];

  const existingCurrency = ["EUR", "SEK", "USD"]; // todo: get these as a prop from ListReceipts.tsx

  const navigate = useNavigate();

  // -------------------------------------------------------------------------------------
  // useState to show component when extracting text from uploaded file
  const [isLoading, setIsLoading] = useState(false);

  // -------------------------------------------------------------------------------------
  // formData is just a useState that stores an object.
  // This object contains the current value of all the text fields.
  const [formData, setFormData] = useState<Receipt>({
    company: "",
    amount: 0,
    currency: "SEK",
    purchaseDate: "",
    textContent: "",
    project: "",
  });

  // -------------------------------------------------------------------------------------
  // Function to handle changes in the form fields
  // When a change is made this function updates the useState that stores the field data
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

  // -------------------------------------------------------------------------------------
  // State to manage the selected file
  const [file, setFile] = useState<File | null>(null);

  // -------------------------------------------------------------------------------------
  // Function to handle file selection
  // It gets the file from the event and then sets the useState to that file
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(
          "http://localhost:8080/api/receipts/textextraction",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          setIsLoading(false);
          throw new Error("Network response was not ok");
        } else {
          setIsLoading(false);
        }

        const result = await response.json();
        autofillEmptyFields(result);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // -------------------------------------------------------------------------------------
  // This function takes a Receipt object as argument and fills in the form fields
  // it only fills them if they are empty
  const autofillEmptyFields = (data: Receipt) => {
    setFormData((prevFormData) => ({
      company: prevFormData.company || data.company || "",
      amount: prevFormData.amount || data.amount,
      currency: prevFormData.currency || data.currency || "SEK",
      purchaseDate: prevFormData.purchaseDate || data.purchaseDate,
      textContent: prevFormData.textContent || data.textContent || "",
    }));
  };

  // -------------------------------------------------------------------------------------
  // This sends all fields and file to server
  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construct form data to send
    // Check if a file has been selected
    if (!file) {
      console.error("No file selected");
      // todo: display user feedback if file is not present
      return;
    }

    // Construct form data to send
    const formDataToSend = new FormData();
    formDataToSend.append("file", file);
    formDataToSend.append("company", formData.company);
    formDataToSend.append("amount", formData.amount.toString()); // Convert amount to string
    formDataToSend.append("currency", formData.currency);
    formDataToSend.append("purchaseDate", formData.purchaseDate);
    formDataToSend.append("textContent", formData.textContent);
    formDataToSend.append("project", formData.project || "");
    formDataToSend.append("email", "jane.smith@example.com"); // todo: do not hardcode email. should come from Auth0s JWT

    try {
      const response = await fetch("http://localhost:8080/api/receipts", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Route back to ReceiptList.tsx once form is successfully submitted
      navigate(-1);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // -------------------------------------------------------------------------------------
  // Navigates back to the ReceiptsLists component
  function handleClick() {
    navigate(-1);
  }

  return (
    <>
      <div className=" size-full">
        <button onClick={handleClick}>
          <img src={ReturnArrow} />
        </button>
        <form onSubmit={submitForm} className="p-10">
          <input
            className="file-input file-input-primary w-full"
            type="file"
            onChange={handleFileChange}
          />
          {isLoading && <UploadingFile />}

          <br />
          <br />
          <label htmlFor="company">Purchased from</label>
          <br />
          <input
            type="text"
            id="company"
            name="company"
            required
            className="input w-full bg-slate-100"
            value={formData.company}
            onChange={handleChange}
          />
          <br />
          <br />
          <div className="grid grid-cols-[3fr_1fr]">
            <div className="pr-5">
              <label htmlFor="amount">Amount</label>
              <br />
              <input
                type="number"
                step="0.01"
                id="amount"
                name="amount"
                className="input w-full bg-slate-100"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="currency">Currency</label>
              <br></br>
              <input
                list="existingCurrency"
                id="currency"
                name="currency"
                className="input w-full bg-slate-100"
                onChange={handleChange}
              />
              <datalist id="existingCurrency" className="bg-slate-500">
                {existingCurrency.map((option, index) => (
                  <option key={index} value={option} />
                ))}
              </datalist>
            </div>
          </div>

          <br />
          <br />
          <label htmlFor="date">Date</label>
          <br />
          <input
            type="date"
            id="date"
            name="purchaseDate"
            className="input w-full bg-slate-100"
            value={formData.purchaseDate}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="text_content">Text content (optional)</label>
          <br />
          <textarea
            id="text_content"
            name="text_content"
            className="input w-full bg-slate-100"
            value={formData.textContent}
            onChange={handleChange}
          />
          <br />
          <br />

          <label htmlFor="project">Project (optional)</label>
          <br></br>
          <input
            list="existingProjects"
            id="project"
            name="project"
            className="input w-full bg-slate-100"
            onChange={handleChange}
          />
          <datalist id="existingProjects" className="bg-slate-500">
            {existingProjects.map((option, index) => (
              <option key={index} value={option} />
            ))}
          </datalist>

          <br></br>
          <br></br>

          <input
            type="submit"
            value="Save"
            className="btn btn-primary w-full"
          />
          <br></br>
          <br></br>
        </form>
        <br />
        <br />
      </div>
    </>
  );
}

export default AddReceipt;

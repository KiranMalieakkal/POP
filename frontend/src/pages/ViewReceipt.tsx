import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import BottomNav from "../components/BottomNav";
import FormChoices from "../components/FormChoices";

type Params = {
  id: string;
};

type Receipt = {
  id: number;
  company: string;
  amount: string;
  currency: string;
  purchaseDate: string;
  textContent?: string;
  project: string | null;
  fileName?: string;
};

const ReceiptDetail = () => {
  const { id } = useParams<Params>();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [receiptData, setReceiptData] = useState<Receipt>({
    id: 0,
    company: "",
    amount: "",
    currency: "",
    purchaseDate: "",
    textContent: "",
    project: "",
    fileName: "",
  });
  const [imgFile, setImgFile] = useState(" ");
  const [message, setMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // todo: this is the list of existing project the user can choose from.
  // it should be sent to the component as a prop
  const existingProjects = [
    "Kirans work commute 2024",
    "Tax evasion project 2025",
    "Option 3",
  ];

  // this useState is used to track which field is selected (aka focused).
  // When a certain field is focused we can display FormChoices.tsx (for example)
  const [focusedField, setFocusedField] = useState("");

  // const baseUrl = "https://pop-app-backend.azurewebsites.net/api/receipts";
  const baseUrl2 = "http://localhost:8080/api/receipts";

  useEffect(() => {
    const fetchReceiptData = async () => {
      const response = await fetch(`${baseUrl2}/${id}`);
      const data = await response.json();
      //console.log(data);
      setReceiptData(data);
    };
    fetchReceiptData();
    const fetchImg = async () => {
      const response = await fetch(`${baseUrl2}/${id}/img`);
      const imgData = await response.blob();
      const url = URL.createObjectURL(imgData);
      setImgFile(url);
    };
    fetchImg();
  }, [id]);

  if (!receiptData) {
    return <div>Loading...</div>;
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setReceiptData({ ...receiptData, [name]: value });
  };

  // -------------------------------------------------------------------------------------
  // This function also sets the formData useState. But this function not used on the form
  // fields change, but rather via an external component
  const handleFormChoicesSelection = (name: string, value: string) => {
    setReceiptData({
      ...receiptData,
      [name]: value,
    });
    //setFocusedField(""); // Reset focus after selection. Uncomment if behaviour is off...
  };
  // -------------------------------------------------------------------------------------

  const handleSave = async () => {
    const response = await fetch(`${baseUrl2}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(receiptData),
    });
    if (response.ok) {
      setEditMode(false);
      toast.success("Changes saved successfully 🎉");

      setTimeout(() => {
        setMessage("");
      }, 2000);
    } else {
      console.log("Failed to save changes.");
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this receipt?"
    );
    if (confirmDelete) {
      const response = await fetch(`${baseUrl2}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success(`Receipt has been deleted successfully ♳.`);
        setTimeout(() => {
          setAlertMessage("");
          navigate("/receipts");
        }, 2000);
      } else {
        console.log("Failed to delete receipt.");
      }
    }
  };

  const handleBack = () => {
    setEditMode(false);
  };

  return (
    <>
      <h1 className="pt-3 pr-6 pl-6 pb-2">
        <a href="/receipts">← Go back</a>
      </h1>
      <div className="p-2 max-w-4xl mx-auto mb-12">
        <div className="bg-white shadow-xl  top-shadow rounded-lg p-6 flex flex-col md:flex-row">
          {/* img section .......*/}
          <div className="border border-gray-300 rounded-lg p-5 h-full w-full md:w-1/2 md:pr-4 ms:w-full  ms:pr-0 h-112">
            <img
              src={imgFile} /* {receiptData.img} */
              alt="Receipt"
              className="w-full h-92 max-h-92 object-contain max-h-full"
            />
          </div>
          {/* form section .......*/}
          <div className="w-full md:w-1/2 pl-4 sm:text-center md:text-left">
            {alertMessage && (
              <div className="alert alert-error mb-4">
                <div>{alertMessage}</div>
              </div>
            )}
            {message && <div className="text-green-500 mb-4">{message}</div>}
            <div className="space-y-4 text-left">
              <div>
                <label className="label text-gray-300">Company</label>
                {editMode ? (
                  <input
                    type="text"
                    name="company"
                    value={receiptData.company}
                    onChange={handleChange}
                    className="input bg-slate-100 w-full"
                  />
                ) : (
                  <div className="input input-bordered w-full flex items-center">
                    <p className="w-full">{receiptData.company}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="label text-gray-300">Amount</label>
                {editMode ? (
                  <input
                    type="text"
                    name="amount"
                    value={receiptData.amount}
                    onChange={handleChange}
                    className="input bg-slate-100 w-full"
                  />
                ) : (
                  <div className="input input-bordered w-full flex items-center">
                    <p className="text-gray-700 ">
                      {receiptData.currency} {receiptData.amount}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <label className="label text-gray-300">Date</label>
                {editMode ? (
                  <input
                    type="text"
                    name="date"
                    value={receiptData.purchaseDate}
                    onChange={handleChange}
                    className="input bg-slate-100 w-full"
                  />
                ) : (
                  <div className="input input-bordered w-full flex items-center">
                    <p className="text-gray-700">{receiptData.purchaseDate}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="label text-gray-300">Text Content</label>
                {editMode ? (
                  <textarea
                    name="textContent"
                    value={receiptData.textContent}
                    onChange={handleChange}
                    className="textarea bg-slate-100 w-full h-40"
                  />
                ) : (
                  <div className="w-full items-center rounded-lg border border-slate-300 p-3">
                    <p className="text-gray-700">{receiptData.textContent}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="label text-gray-300">Project</label>
                {editMode ? (
                  <>
                    <input
                      type="text"
                      name="project"
                      value={receiptData.project ?? ""}
                      onChange={handleChange}
                      className="input bg-slate-100 w-full"
                      onFocus={() => setFocusedField("project")}
                      onBlur={() =>
                        setFocusedField(
                          focusedField === "project" ? "" : focusedField
                        )
                      }
                    />
                    {focusedField === "project" && (
                      <FormChoices
                        items={existingProjects}
                        name="project"
                        pickItemFunction={handleFormChoicesSelection}
                      />
                    )}
                  </>
                ) : (
                  <div className="input input-bordered w-full flex items-center">
                    <p className="text-gray-700">{receiptData.project}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex justify-end mt-6">
                {editMode ? (
                  <>
                    <button
                      className="badge badge-outline p-4 m-1 mt-2"
                      onClick={handleBack}
                    >
                      Cancel
                    </button>
                    <button
                      className="badge badge-outline p-4 mt-2 bg-blue-800 text-white"
                      onClick={handleSave}
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    className="badge p-4 bg-blue-100"
                    onClick={handleEdit}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    Edit
                  </button>
                )}
              </div>
              <div className="flex justify-end mt-6">
                {!editMode && (
                  <button
                    className="badge p-4   bg-blue-100"
                    onClick={handleDelete}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    Delete
                  </button>
                )}
              </div>
            </div>
            <p>
              This p-element is only here during development of the
              FormChoices.tsx component. Todo: remove this element.
            </p>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <BottomNav />
    </>
  );
};

export default ReceiptDetail;

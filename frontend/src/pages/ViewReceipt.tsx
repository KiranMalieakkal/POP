import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import BottomNav from "../components/BottomNav";

// import logo from "../assets/logo_pop.jpeg";
// const mockData = {
//   id: 1,
//   company: "Turkish",
//   amount: "12300",
//   currency: "SEK",
//   purchaseDate: "2023-11-11",
//   textContent: "some context",
//   project: "Trip to Sri Lanka with family 2023",
//   img: logo,
// };

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
  img?: string;
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
    img: "",
  });
  // const [receiptData, setReceiptData] = useState<Receipt>(mockData);

  const [message, setMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchReceiptData = async () => {
      const response = await fetch(`http://localhost:8080/api/receipts/${id}`);
      const data = await response.json();
      setReceiptData(data);
    };
    fetchReceiptData();
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

  const handleSave = async () => {
    const response = await fetch(
      `http://localhost:8080/api/receipts/edit/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(receiptData),
      }
    );
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
      const response = await fetch(
        `http://localhost:8080/api/receipts/delete/${id}`,
        {
          method: "DELETE",
        }
      );
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
      <div className="p-2 max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col  md:flex-row">
          {/* img section .......*/}
          <div className="w-1/2 pr-4 ms:w-1/2 md:w-1/2 md:pr-4">
            <img
              src={receiptData.img}
              alt="Receipt"
              className="w-full h-auto max-h-72 object-contain"
            />
          </div>
          {/* form section .......*/}
          <div className="w-1/2 pl-4">
            <h6 className="text-xl font-semibold mt-2">Receipt Details</h6>
            {alertMessage && (
              <div className="alert alert-error mb-4">
                <div>{alertMessage}</div>
              </div>
            )}
            {message && <div className="text-green-500 mb-4">{message}</div>}
            <div className="space-y-4">
              <div>
                <label className="label font-serif font-bold">Company</label>
                {editMode ? (
                  <input
                    type="text"
                    name="company"
                    value={receiptData.company}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <p className="text-gray-700">{receiptData.company}</p>
                )}
              </div>
              <div>
                <label className="label font-serif font-bold">Amount</label>
                {editMode ? (
                  <input
                    type="text"
                    name="amount"
                    value={receiptData.amount}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    // required
                  />
                ) : (
                  <p className="text-gray-700">
                    {receiptData.currency} {receiptData.amount}
                  </p>
                )}
              </div>
              <div>
                <label className="label font-serif font-bold">Date</label>
                {editMode ? (
                  <input
                    type="text"
                    name="date"
                    value={receiptData.purchaseDate}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <p className="text-gray-700">{receiptData.purchaseDate}</p>
                )}
              </div>
              <div>
                <label className="label font-serif font-bold">
                  Text Content
                </label>
                {editMode ? (
                  <textarea
                    name="textContent"
                    value={receiptData.textContent}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                  />
                ) : (
                  <p className="text-gray-700">{receiptData.textContent}</p>
                )}
              </div>
              <div>
                <label className="label font-serif font-bold">Project</label>
                {editMode ? (
                  <input
                    type="text"
                    name="project"
                    value={receiptData.project ?? ""}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <p className="text-gray-700">{receiptData.project}</p>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                      </svg>
                    </button>
                    <button
                      className="badge badge-outline p-4 mt-2 bg-green-200"
                      onClick={handleSave}
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    className="badge badge-outline p-4"
                    onClick={handleEdit}
                  >
                    Edit 🖍️
                  </button>
                )}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  className="badge badge-outline p-4"
                  onClick={handleDelete}
                >
                  Delete{"  "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <BottomNav />
    </>
  );
};

export default ReceiptDetail;
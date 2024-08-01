// Harald 240730: removing routing because desktop rebuild. therefore params is also removed
/* import { useNavigate, useParams } from "react-router-dom"; */
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
/* import BottomNav from "../components/BottomNav"; */
import FormChoices from "../components/FormChoices";
import { useAuth0 } from "@auth0/auth0-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";

// Harald 240730: removing routing because desktop rebuild. therefore params is also removed
/* type Params = {
  id: string;
}; */

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

type Props = {
  windowToDisplay: ({ window, id }: { window: string; id?: number }) => void;
  receiptId: number;
};

const ReceiptDetail = ({ windowToDisplay, receiptId }: Props) => {
  // Harald 240730: removing routing because desktop rebuild. therefore params is also removed
  /*   const { id } = useParams<Params>(); */
  const id = receiptId;
  // Harald 240730: removing routing because desktop rebuild.
  /*   const navigate = useNavigate(); */
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
  // const [message, setMessage] = useState("");
  // const [patchErrorDisplay, setPatchErrorDisplay] = useState(false);
  // const [alertMessage, setAlertMessage] = useState("");

  // todo: this is the list of existing project the user can choose from.
  // it should be sent to the component as a prop
  const existingProjects = [
    "Kirans work commute 2024",
    "Tax evasion project 2025",
    "Option 3",
  ];

  // todo: get these as a prop from ListReceipts.tsx
  // todo: handle the case when the list is empty
  const existingCurrency = ["EUR", "SEK", "USD"];

  // this useState is used to track which field is selected (aka focused).
  // When a certain field is focused we can display FormChoices.tsx (for example)
  const [focusedField, setFocusedField] = useState("");

  // const baseUrl = "https://pop-app-backend.azurewebsites.net/api/receipts";
  // const baseUrl2 = "http://localhost:8080/api/receipts";
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [theToken, setTheToken] = useState<string>();
  const queryClient = useQueryClient();

  const { mutate: patchReceipt, error: patchError } = useMutation<
    unknown,
    Error,
    unknown
  >({
    mutationFn: (newPost) =>
      fetch(`${baseUrl}/receipts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${theToken}`,
        },
        body: JSON.stringify(newPost),
      }).then((res) => res.json()),
    onSuccess: () => {
      setEditMode(false);
      queryClient.invalidateQueries({ queryKey: ["fetch2"] });
      // toast.success("Changes saved successfully 🎉");
    },
  });

  const { mutate: deleteReceipt, error: deleteError } = useMutation<
    unknown,
    Error,
    unknown
  >({
    mutationFn: (id) =>
      fetch(`${baseUrl}/receipts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${theToken}`,
        },
      }),
    onSuccess: () => {
      setEditMode(false);
      console.log("deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["fetch2"] });
      // toast.success("Receipt deleted successfully 🎉");
      windowToDisplay({ window: "hideViewReceipt" });
    },
  });

  useEffect(() => {
    console.log("isauthenticated effect§");
    if (isAuthenticated) {
      console.log("yues");
      getAccessTokenSilently()
        .then((token) => {
          console.log("token=", token);
          setTheToken(token);
        })
        .catch((err) => {
          console.log("err=", err);
        });
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    if (patchError) {
      setTimeout(() => {
        toast.error("Please try again");
      }, 2000);
    }
  }, [patchError]);

  useEffect(() => {
    if (deleteError) {
      setTimeout(() => {
        toast.error("Delete Failed. Please try again");
      }, 2000);
    }
  }, [deleteError]);

  useEffect(() => {
    if (!theToken) return;
    const fetchReceiptData = async () => {
      const response = await fetch(`${baseUrl}/receipts/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${theToken}`,
        },
      });
      const data = await response.json();
      setReceiptData(data);
    };

    fetchReceiptData();
    const fetchImg = async () => {
      const response = await fetch(`${baseUrl}/receipts/${id}/img`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${theToken}`,
        },
      });
      const imgData = await response.blob();
      const url = URL.createObjectURL(imgData);
      setImgFile(url);
    };
    fetchImg();
  }, [id, theToken, isAuthenticated, baseUrl]);

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
    patchReceipt(receiptData);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = async () => {
    // const confirmDelete = window.confirm(
    //   "Are you sure you want to delete this receipt?"
    // );
    // if (confirmDelete) {
    //   const response = await fetch(`${baseUrl2}/${id}`, {
    //     method: "DELETE",
    //     headers: {
    //       Authorization: `Bearer ${theToken}`,
    //     },
    //   });
    //   if (response.ok) {
    //     toast.success(`Receipt has been deleted successfully ♳.`);
    //     setTimeout(() => {
    //       setAlertMessage("");
    //       // Harald 240730: removing routing because desktop rebuild.
    //       /* navigate("/receipts"); */
    //       windowToDisplay({ window: "hideViewReceipt" });
    //     }, 2000);
    //   } else {
    //     console.log("Failed to delete receipt.");
    //   }
    // }

    toast((t) => (
      <span>
        Are you sure you want to delete this receipt?
        <div className="flex justify-center mt-2">
          <button
            className="bg-red-500 text-white py-1 px-3 rounded-lg text-sm mr-2"
            onClick={() => {
              // fetch(`${baseUrl}/receipts/${id}`, {
              //   method: "DELETE",
              //   headers: {
              //     Authorization: `Bearer ${theToken}`,
              //   },
              // }).then((response) => {
              //   if (!response.ok) {
              //     throw new Error(`Error Status: ${response.status}`);
              //   } else windowToDisplay({ window: "hideViewReceipt" });
              //   toast.dismiss(t.id);
              // });
              deleteReceipt(id);
              toast.dismiss(t.id);
            }}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 text-black py-1 px-3 rounded-lg text-sm"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </span>
    ));
  };

  const handleBack = () => {
    setEditMode(false);
  };

  return (
    <>
      <div className="p-2 lg:p-5 lg:pt-2 max-w-4xl mx-auto pb-20 rounded-xl">
        <div className="bg-white shadow-xl top-shadow lg:shadow-none rounded-lg p-5 flex flex-col">
          <div className="pt-0 pr-6  pb-2">
            <button
              onClick={() => windowToDisplay({ window: "hideViewReceipt" })}
              className="badge p-4 bg-blue-100"
            >
              Close
            </button>
          </div>
          {/* img section .......*/}
          <div className="border border-gray-300 rounded-lg p-5 h-full w-full md:pr-4 ms:w-full  ms:pr-0 h-112">
            <img
              src={imgFile}
              alt="Receipt"
              className="w-full h-92 max-h-92 object-contain max-h-full"
            />
          </div>
          {/* form section .......*/}
          <div className="w-full sm:text-center md:text-left">
            {/* {alertMessage && (
              <div className="alert alert-error mb-4">
                <div>{alertMessage}</div>
              </div>
            )} */}
            {/* {message && <div className="text-green-500 mb-4">{message}</div>} */}
            <div className="space-y-4 text-left">
              <div>
                <label className="label text-gray-900 mt-4 p-0 ">Company</label>
                {editMode ? (
                  <input
                    type="text"
                    name="company"
                    value={receiptData.company}
                    onChange={handleChange}
                    className="input bg-slate-200 w-full"
                  />
                ) : (
                  <div className="input input-bordered w-full flex items-center bg-slate-50">
                    <p className="w-full ">{receiptData.company}</p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-[3fr_1fr]">
                <div className="pr-5">
                  <label className="label text-gray-900 mt-0 p-0">Amount</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="amount"
                      value={receiptData.amount}
                      onChange={handleChange}
                      className="input bg-slate-200 w-full"
                    />
                  ) : (
                    <div className="input input-bordered w-full flex items-center bg-slate-50">
                      <p className=" ">{receiptData.amount}</p>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <label className="label text-gray-900 mt-0 p-0">
                    Currency
                  </label>
                  {editMode ? (
                    <>
                      <input
                        list="existingCurrency"
                        id="currency"
                        name="currency"
                        className="input w-full bg-slate-200"
                        value={receiptData.currency}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("currency")}
                        onBlur={() =>
                          setFocusedField(
                            focusedField === "currency" ? "" : focusedField
                          )
                        }
                      />
                      {focusedField == "currency" && (
                        <FormChoices
                          items={existingCurrency}
                          name="currency"
                          pickItemFunction={handleFormChoicesSelection}
                        />
                      )}
                    </>
                  ) : (
                    <div className="input input-bordered w-full flex items-center bg-slate-50">
                      <p className="">{receiptData.currency}</p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="label text-gray-900 mt-0 p-0">Date</label>
                {editMode ? (
                  <input
                    type="date"
                    name="purchaseDate"
                    value={receiptData.purchaseDate}
                    onChange={handleChange}
                    className="input bg-slate-200 w-full"
                  />
                ) : (
                  <div className="input input-bordered w-full flex items-center bg-slate-50">
                    <p className="">{receiptData.purchaseDate}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="label text-gray-900 mt-0 p-0">
                  Text Content
                </label>
                {editMode ? (
                  <textarea
                    name="textContent"
                    value={receiptData.textContent}
                    onChange={handleChange}
                    className="textarea bg-slate-200 w-full h-40 word-spacing-2"
                  />
                ) : (
                  <div className="max-h-[140px] lg:max-h-[160px] xl:max-h-[140px] mb-2 overflow-y-auto  border rounded-lg bg-slate-50 p-3 pl-5 ">
                    {" "}
                    {/* w-full items-center rounded-lg border border-slate-300 p-3  */}
                    <p className="">{receiptData.textContent}</p>
                  </div>
                )}
              </div>
              <div className="relative">
                <label className="label text-gray-900 mt-0 p-0">Project</label>
                {editMode ? (
                  <>
                    <input
                      type="text"
                      name="project"
                      value={receiptData.project ?? ""}
                      onChange={handleChange}
                      className="input bg-slate-200 w-full"
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
                  <div className="input input-bordered w-full flex items-center bg-slate-50">
                    <p className="">{receiptData.project}</p>
                  </div>
                )}
              </div>
            </div>
            {/* {true && (
              <p className="text-blue-500 break-words whitespace-normal text-center mt-2">{`Sorry, Changes could not be saved. Please try again later.`}</p>
            )} */}
            <div className="flex items-center justify-between">
              <div className="flex justify-end mt-6">
                {editMode ? (
                  <>
                    <button
                      className="badge badge-outline p-4 mr-3 mt-2 hover:text-blue-700"
                      onClick={handleBack}
                    >
                      Cancel
                    </button>
                    <button
                      className="badge p-4 badge-outline  mt-2 bg-blue-800 text-white hover:bg-blue-700 hover:text-white"
                      onClick={handleSave}
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    className="badge p-4 bg-blue-100 border border-blue-300 hover:text-blue-700"
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
                    className="badge p-4 bg-blue-100 border border-blue-300 hover:text-blue-700"
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
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      {/* <BottomNav /> */}
    </>
  );
};

export default ReceiptDetail;

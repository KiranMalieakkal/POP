import { useEffect, useState } from "react";
import FormChoices from "../components/FormChoices";
import toast, { Toaster } from "react-hot-toast";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import heic2any from "heic2any";

type Receipt = {
  company: string;
  amount: number;
  currency: string;
  purchaseDate: string;
  textContent: string;
  project?: string;
};

type FormDataWithBoolean = {
  formData: FormData;
  hasProject: boolean;
};

type Props = {
  windowToDisplay: ({ window, id }: { window: string; id?: number }) => void;
};

function AddReceipt({ windowToDisplay }: Props) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [theToken, setTheToken] = useState<string>();
  const [existingProjects, setExistingProjects] = useState<string[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently()
        .then((token) => {
          setTheToken(token);
          return token;
        })
        .then((token) => {
          fetchProjects(token);
        })
        .catch((err) => {
          console.error("Error getting token:", err);
        });
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  const fetchProjects = async (token: string) => {
    try {
      const response = await fetch(`${baseUrl}/projects?email=${user?.email}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Extract project titles and update state
      const titles = data.map((project: { title: string }) => project.title);
      setExistingProjects(titles);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // todo: get these as a prop from ListReceipts.tsx
  // todo: handle the case when the list is empty
  const existingCurrency = ["EUR", "SEK", "USD"];

  // this useState is used to track which field is selected (aka focused).
  // When a certain field is focused we can display FormChoices.tsx (for example)
  const [focusedField, setFocusedField] = useState("");

  // -------------------------------------------------------------------------------------
  // formData is just a useState that stores an object.
  // This object contains the current data of all the text fields.
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
  // This function also sets the formData useState. But this function not used on the form
  // fields change, but rather via an external component
  const handleFormChoicesSelection = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    //setFocusedField(""); // Reset focus after selection. Uncomment if behaviour is off...
  };

  // -------------------------------------------------------------------------------------
  // State to manage the selected file
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // -------------------------------------------------------------------------------------
  // Function to handle file selection
  // It gets the file from the event and then sets the useState to that file
  // This function sends the image to the server for text extraction
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      const formData = new FormData();

      // Convert Heic file & append file to formData
      // If the image is of type heic it can not be handled by the server.
      // So we convert it to jpeg instead.
      if (selectedFile.type === "image/heic") {
        // Show toast that image is converting (or uploading)
        // Show loading toast
        const loadingToastId = toast.loading("Converting image...");
        try {
          // Wait for the HEIC to JPEG conversion
          const convertedBlob = await heic2any({
            blob: selectedFile,
            toType: "image/jpeg",
            quality: 0.2, // this also reduces the file size
          });

          // Check if convertedBlob is an array
          // This step is done because heic2any can return either a single blob or an array of blobs
          // An array is returned if its a gif or a photo burst. But we only want one image.
          const blobPart = Array.isArray(convertedBlob)
            ? convertedBlob[0]
            : convertedBlob;

          // Create a new File from the Blob
          const jpegFile = new File(
            [blobPart],
            selectedFile.name.replace(/\.[^/.]+$/, ".jpeg"),
            {
              type: "image/jpeg",
              lastModified: Date.now(),
            }
          );

          // We do setFile() because the file will be used later when submitting the new receipt.
          setFile(jpegFile);
          formData.append("file", jpegFile);

          // hide toast
          toast.dismiss(loadingToastId);
          toast.success("Text extracted successfully");

          // Reader to display image preview
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result as string);
          };
          reader.readAsDataURL(jpegFile);
        } catch (error) {
          console.error("Conversion to JPEG failed:", error);
          return; // Stop submission if conversion fails
        }
      } else {
        // if the image is not of type heic then we just set and append it
        setFile(selectedFile);
        formData.append("file", selectedFile);

        // Reader to display image preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      }

      // Show loading toast
      const loadingToastId = toast.loading("Extracting text...");

      // Text extraction
      try {
        const response = await fetch(`${baseUrl}/receipts/textextraction`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${theToken}`,
          },
          body: formData,
        });

        if (!response.ok) {
          toast.error("Error extracting text from file");
          throw new Error("Network response was not ok");
        } else {
          toast.dismiss(loadingToastId);
          toast.success("Text extracted successfully");
        }

        const result = await response.json();
        autofillEmptyFields(result);
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.dismiss(loadingToastId);
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
    if (formData.project) {
      formDataToSend.append("projectTitle", formData.project!);
    }
    formDataToSend.append("email", `${user?.email}`);

    // Comment: we send both the payload (formData) AND a boolean. The boolean controls whether we
    // send the request to the endpoint "withproject" or without project.
    // This is not RESTful and should be handled on the backend, but it isn't...
    const objectToSendToTanstack = {
      formData: formDataToSend,
      hasProject: formData.project ? true : false,
    };

    // Here we call the tanstack query function
    postReceipt(objectToSendToTanstack);
  };

  // -------------------------------------------------------------------------------------
  // This is a tanstack query which does the post to our backend. But the function is called earlier.
  const queryClient = useQueryClient();
  const { mutate: postReceipt } = useMutation<
    unknown,
    Error,
    FormDataWithBoolean
  >({
    mutationFn: ({ formData, hasProject }) =>
      fetch(
        hasProject ? `${baseUrl}/receipts/with-project` : `${baseUrl}/receipts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${theToken}`,
          },
          body: formData,
        }
      ).then((res) => {
        if (!res.ok) {
          throw new Error(`Error Status: ${res.status}`);
        }
        return res.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch2"] });
      windowToDisplay({ window: "hideAddReceipt" });
    },
  });

  // -------------------------------------------------------------------------------------
  return (
    <>
      <div className="size-full">
        <button
          onClick={() => windowToDisplay({ window: "hideAddReceipt" })}
          className="badge p-4 bg-blue-100 mt-5 ml-10"
        >
          Close
        </button>
        <form onSubmit={submitForm} className="p-10">
          <div className="border border-dashed border-slate-500 rounded-lg p-3 relative">
            <input
              type="file"
              id="fileInput"
              required
              className="w-full absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileInput"
              className="w-full h-full flex justify-center items-center cursor-pointer"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" />
              ) : (
                "Click to upload file"
              )}
            </label>
          </div>
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
                required
                className="input w-full bg-slate-100"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label htmlFor="currency">Currency</label>
              <br></br>
              <input
                list="existingCurrency"
                id="currency"
                name="currency"
                autoComplete="off"
                className="input w-full bg-slate-100"
                value={formData.currency}
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
            required
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
            name="textContent"
            className="input w-full bg-slate-100"
            value={formData.textContent}
            onChange={handleChange}
          />
          <br />
          <br />

          <div className="relative">
            <label htmlFor="project">Project (optional)</label>
            <br></br>
            <input
              list="existingProjects"
              id="project"
              name="project"
              autoComplete="off"
              className="input w-full bg-slate-100"
              value={formData.project}
              onChange={handleChange}
              onFocus={() => setFocusedField("project")}
              onBlur={() =>
                setFocusedField(focusedField === "project" ? "" : focusedField)
              }
            />
            {focusedField === "project" && (
              <FormChoices
                items={existingProjects}
                name="project"
                pickItemFunction={handleFormChoicesSelection}
              />
            )}
          </div>

          <br></br>
          <br></br>

          <input
            type="submit"
            value="Save"
            className="btn bg-blue-800 w-full text-white"
          />
          <br></br>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default AddReceipt;

import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";

export type requestType = {
  company: string | null;
  amountFrom: number | null;
  amountTo: number | null;
  currency: string | null;
  dateFrom: string | null;
  dateTo: string | null;
  project: string | null;
  category: string | null;
};

export type receiptType = {
  id: number;
  company: string;
  amount: number;
  currency: string;
  startDate: string;
  purchaseDate: string;
  project: string;
  category: string;
};

export type receiptsType = receiptType[];

function ListReceipts() {
  const [fetchErrorLog, setfetchErrorLog] = useState("");
  const [receipts, setReceipts] = useState<receiptsType>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    company: null,
    amountFrom: null,
    amountTo: null,
    currency: null,
    dateFrom: null,
    dateTo: null,
    project: null,
    category: null,
  });
  const baseUrl = "https://pop-app-backend.azurewebsites.net/api/receipts";
  // const baseUrl2 = "http://localhost:8080/api/receipts";

  const { data, isError: fetchError } = useQuery({
    queryKey: ["fetch1"],
    queryFn: () =>
      fetch(`${baseUrl}?email=jane.smith@example.com`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((e) => {
          setfetchErrorLog(e.message);
        }),
  });

  const { data: data2, refetch } = useQuery({
    queryKey: ["fetch2"],
    queryFn: () =>
      fetch(`${baseUrl}/filters?email=jane.smith@example.com`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      })
        .then((response) => {
          // console.log("iam in the first line");
          return response.json();
        })
        .then((data) => {
          // console.log("my name is kiran");
          // console.log(data);
          return data;
        })
        .then((data) => data)
        .catch((e) => {
          console.log("post error");
          setfetchErrorLog(e.message);
        }),
  });

  // const { data: postdata, mutate: postReceipt } = useMutation<
  //   receiptsType,
  //   Error,
  //   requestType
  // >({
  //   mutationFn: (newPost) =>
  //     fetch(
  //       `http://localhost:8080/api/receipts/filters?email=jane.smith@example.com`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(newPost),
  //       }
  //     )
  //       .then((res) => {
  //         // if (!res.ok) {
  //         //   throw new Error(`Error Status: ${res.status}`);
  //         // }
  //         return res.json();
  //       })
  //       .then((data) => data),
  //   onSuccess: () => {
  //     console.log("success");
  //   },
  // });

  useEffect(() => {
    console.log("use effect 1");
    setReceipts(data);
  }, [data]);

  useEffect(() => {
    // console.log(filters);
    console.log("use-effect2");
    setReceipts(data2);
  }, [data2]);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value !== "") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: null,
      }));
    }
  };

  const applyFilters = async () => {
    await refetch();
    setShowFilter(false);
    console.log("Applying filters:", filters);
    // console.log(data2);
    // console.log(data);
  };

  function addReceipt() {
    console.log(data);
  }

  function handleViewReceipt(receipt: receiptType) {
    console.log(`You are viewing receipt with id  ${receipt.id}`);
  }

  function deleteReceipt(id: number) {
    console.log(`you have deleted receipt with this id ${id}`);
  }

  return (
    <>
      <div className="mb-20">
        <h1 className="text-center mt-4">Receipts</h1>
        <div className="flex justify-center items-center">
          <label className="input input-bordered flex items-center gap-2 md:w-1/3 lg:w-1/3 w-1/2 m-4">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <div className=" border-2 border-inherit rounded ">
            <svg
              onClick={() => setShowFilter(!showFilter)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-12 hover:bg-gray-300 hover:cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
          </div>
        </div>

        {showFilter && (
          <div className="p-4 border border-gray-300 rounded m-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="company"
                value={filters.company !== null ? filters.company : ""}
                onChange={handleFilterChange}
                placeholder="Company"
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="amountFrom"
                value={filters.amountFrom !== null ? filters.amountFrom : ""}
                onChange={handleFilterChange}
                placeholder="Amount From"
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="amountTo"
                value={filters.amountTo !== null ? filters.amountTo : ""}
                onChange={handleFilterChange}
                placeholder="Amount To"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="currency"
                value={filters.currency !== null ? filters.currency : ""}
                onChange={handleFilterChange}
                placeholder="Currency"
                className="input input-bordered w-full"
              />
              <input
                type="date"
                name="dateFrom"
                value={filters.dateFrom !== null ? filters.dateFrom : ""}
                onChange={handleFilterChange}
                placeholder="Date From"
                className="input input-bordered w-full"
              />
              <input
                type="date"
                name="dateTo"
                value={filters.dateTo !== null ? filters.dateTo : ""}
                onChange={handleFilterChange}
                placeholder="Date To"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="project"
                value={filters.project !== null ? filters.project : ""}
                onChange={handleFilterChange}
                placeholder="Project"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="category"
                value={filters.category !== null ? filters.category : ""}
                onChange={handleFilterChange}
                placeholder="Category"
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex justify-center items-center mt-4">
              <button onClick={applyFilters} className="btn btn-primary">
                Apply Filters
              </button>
            </div>
          </div>
        )}

        <div className="w-full p-4">
          <div className="max-h-[400px] lg:max-h-[350px] hover:h-full overflow-y-auto">
            <table className="receipt-table w-full border-collapse">
              <thead>
                <tr className="bg-gray-500 text-white">
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox text-white bg-white"
                      />
                    </label>
                  </th>
                  <th className="p-2 border-b border-gray-300 text-left">
                    Company
                  </th>
                  <th className="p-2 border-b border-gray-300 text-left">
                    Date
                  </th>
                  <th className="p-2 border-b border-gray-300 text-left">
                    Amount
                  </th>
                  <th className="p-2 border-b border-gray-300 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {receipts?.map((receipt: receiptType) => (
                  <tr
                    onClick={() => {
                      handleViewReceipt(receipt);
                    }}
                    key={receipt.id}
                    className="hover:bg-gray-100"
                  >
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td className="p-2 border-b border-gray-300 text-left">
                      {receipt.company}
                    </td>
                    <td className="p-2 border-b border-gray-300">
                      {receipt.purchaseDate}
                    </td>
                    <td className="p-2 border-b border-gray-300 text-left">{`${receipt.amount} ${receipt.currency}`}</td>
                    <td className="p-2 border-b border-gray-300 text-left">
                      <svg
                        onClick={(e) => {
                          deleteReceipt(receipt.id);
                          e.stopPropagation();
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-black hover:text-red-500 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="btn btn-primary md:w-1/3 lg:w-1/3 w-1/2 mb-6"
            onClick={addReceipt}
          >
            Add Receipts
          </button>
        </div>
        {fetchError && (
          <p className="text-red-500 break-words whitespace-normal text-center">{`Sorry, we are unable to retrieve your data. Please try again later. ERROR MESSAGE - ${fetchErrorLog}`}</p>
        )}
      </div>
    </>
  );
}

export default ListReceipts;

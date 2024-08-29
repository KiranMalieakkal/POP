import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import useScreenType from "../components/useSceenType";

// Harald 240730: removing routing because desktop rebuild.
// import { useNavigate } from "react-router-dom";

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
  purchaseDate: string;
  project: string;
  category: string;
  textContent: string;
};

export type receiptsType = receiptType[];

type Props = {
  windowToDisplay: ({ window, id }: { window: string; id?: number }) => void;
};

function ListReceipts({ windowToDisplay }: Props) {
  const [fetchErrorLog, setfetchErrorLog] = useState("");
  const [receipts, setReceipts] = useState<receiptsType>([]);
  const [filteredReceipts, setFilteredReceipts] = useState<receiptsType>([]);
  const [showFilter, setShowFilter] = useState(false);
  //const { user } = useAuth0();
  const { isMobile } = useScreenType();
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [theToken, setTheToken] = useState<string>();

  // Harald 240730: removing routing because desktop rebuild.
  // const navigate = useNavigate();
  const [filters, setFilters] = useState<requestType>({
    company: null,
    amountFrom: null,
    amountTo: null,
    currency: null,
    dateFrom: null,
    dateTo: null,
    project: null,
    category: null,
  });
  const [nonNullFilters, setNonNullFilters] = useState<
    [string, string | number | null][]
  >([]);
  const [search, setSearch] = useState("");
  // const baseUrl = "https://pop-app-backend.azurewebsites.net/api/receipts";
  // const baseUrl = "http://localhost:8080/api/receipts";
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // const { data, isError: fetchError } = useQuery({
  //   queryKey: ["fetch1"],
  //   queryFn: () =>
  //     fetch(`${baseUrl}?email=jane.smith@example.com`)
  //       .then((response) => response.json())
  //       .then((data) => data)
  //       .catch((e) => {
  //         setfetchErrorLog(e.message);
  //       }),
  // });

  const {
    data: data2,
    refetch,
    isError: fetchError,
  } = useQuery({
    queryKey: ["fetch2"],
    queryFn: () =>
      fetch(`${baseUrl}/receipts/filters?email=${user?.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${theToken}`,
        },
        body: JSON.stringify(filters),
      })
        .then((response) => {
          console.log("hello");
          if (!response.ok) {
            throw new Error(`Error Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          return data;
        })
        .then((data) => data)
        .catch((e) => {
          console.log("post error");
          setfetchErrorLog(e.message);
        }),
    enabled: () => !!user?.email && !!theToken,
  });

  // useEffect(() => {
  //   console.log("use effect 1");
  //   setReceipts(data);
  // }, [data]);

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
    // console.log(filters);
    console.log("use-effect2");
    setReceipts(data2);
  }, [data2]);

  useEffect(() => {
    setFilteredReceipts(
      receipts?.filter((receipt) => {
        return (
          receipt.company.toLowerCase().includes(search.toLowerCase()) ||
          receipt.textContent.toLowerCase().includes(search.toLowerCase()) ||
          receipt.purchaseDate.toLowerCase().includes(search.toLowerCase()) ||
          (receipt.project?.toLowerCase() || "").includes(search.toLowerCase())
        );
      })
    );
  }, [search, receipts]);

  useEffect(() => {
    const entries = Object.entries(filters);
    const filteredEntries = entries.filter(([, value]) => value !== null);
    console.log(entries);
    console.log(filteredEntries);
    setNonNullFilters(filteredEntries);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFilter]);

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
  };

  function handleViewReceipt(receipt: receiptType) {
    console.log(`You are viewing receipt with id  ${receipt.id}`);
    windowToDisplay({ window: "ViewReceipt", id: receipt.id });
  }

  /*   function deleteReceipt(id: number) {
    console.log(`you have deleted receipt with this id ${id}`);
  } */

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    console.log(filteredReceipts);
    console.log(search);
  }

  return (
    <>
      <div className={`h-screen ${isMobile ? "pt-5" : "ml-5 mt-10"}`}>
        {/* <h1 className="text-center mt-4 text-2xl font-semibold">Receipts</h1> */}
        <div className="flex justify-center items-center  mr-5">
          <div className="input flex items-center gap-2 w-full mx-5 shadow-[0_0_7px_1px_rgba(0,0,0,0.3)] rounded-full">
            <input
              type="text"
              value={search}
              className="grow"
              placeholder="Search"
              onChange={handleSearchChange}
            />
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
          </div>
          <div className="border-black border-inherit rounded">
            <svg
              onClick={() => setShowFilter(!showFilter)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="-4 -4 32 32"
              strokeWidth={1}
              stroke={`${showFilter ? "white" : "gray"}`}
              className={`size-10 rounded hover:cursor-pointer ${
                showFilter ? "bg-gradient-to-b from-lightblue to-darkblue" : ""
              }`}
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
          <div className="p-4 rounded-3xl m-5 shadow-[0_0_7px_1px_rgba(0,0,0,0.3)] bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center mb-4">
                <label htmlFor="company" className="mr-2">
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  value={filters.company !== null ? filters.company : ""}
                  onChange={handleFilterChange}
                  placeholder="Company"
                  className="input w-full bg-slate-100"
                />
              </div>

              <div className="flex items-center mb-4">
                <label htmlFor="amountFrom" className="mr-2">
                  Amount from
                </label>
                <input
                  id="amountFrom"
                  type="number"
                  name="amountFrom"
                  value={filters.amountFrom !== null ? filters.amountFrom : ""}
                  onChange={handleFilterChange}
                  placeholder="Amount From"
                  className="input w-full bg-slate-100"
                />
              </div>

              <div className="flex items-center mb-4">
                <label htmlFor="amountTo" className="mr-2">
                  Amount to
                </label>
                <input
                  id="amountTo"
                  type="number"
                  name="amountTo"
                  value={filters.amountTo !== null ? filters.amountTo : ""}
                  onChange={handleFilterChange}
                  placeholder="Amount To"
                  className="input w-full bg-slate-100"
                />
              </div>

              <div className="flex items-center mb-4">
                <label htmlFor="currency" className="mr-2">
                  Currency
                </label>
                <input
                  id="currency"
                  type="text"
                  name="currency"
                  value={filters.currency !== null ? filters.currency : ""}
                  onChange={handleFilterChange}
                  placeholder="Currency"
                  className="input w-full bg-slate-100"
                />
              </div>

              <div className="flex items-center mb-4">
                <label htmlFor="dateFrom" className="mr-2">
                  Date from
                </label>
                <input
                  id="dateFrom"
                  type="date"
                  name="dateFrom"
                  value={filters.dateFrom !== null ? filters.dateFrom : ""}
                  onChange={handleFilterChange}
                  placeholder="Date From"
                  className="input w-full bg-slate-100"
                />
              </div>

              <div className="flex items-center mb-4">
                <label htmlFor="dateTo" className="mr-2">
                  Date to
                </label>
                <input
                  id="dateTo"
                  type="date"
                  name="dateTo"
                  value={filters.dateTo !== null ? filters.dateTo : ""}
                  onChange={handleFilterChange}
                  placeholder="Date To"
                  className="input w-full bg-slate-100"
                />
              </div>

              <div className="flex items-center mb-4">
                <label htmlFor="project" className="mr-2">
                  Project
                </label>
                <input
                  id="project"
                  type="text"
                  name="project"
                  value={filters.project !== null ? filters.project : ""}
                  onChange={handleFilterChange}
                  placeholder="Project"
                  className="input w-full bg-slate-100"
                />
              </div>

              <div className="flex items-center mb-4">
                <label htmlFor="category" className="mr-2">
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  name="category"
                  value={filters.category !== null ? filters.category : ""}
                  onChange={handleFilterChange}
                  placeholder="Category"
                  className="input w-full bg-slate-100"
                />
              </div>
            </div>
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={applyFilters}
                className="btn bg-gradient-to-b from-lightblue to-darkblue text-white"
              >
                Apply filters
              </button>
            </div>
          </div>
        )}
        {nonNullFilters.length !== 0 ? (
          <div className="active-filters flex flex-col justify-center items-center">
            <h3 className="mb-1">Active Filters:</h3>
            {nonNullFilters.map((filter, index) => (
              <div key={index} className="mb-1  flex items-center">
                <span className="font-semibold mr-2">{filter[0]}:</span>
                <span>{filter[1]}</span>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        <div className="w-full p-4 ">
          <div className=" hover:h-full overflow-y-auto rounded-lg relative ">
            <table className="receipt-table w-full border-collapse mb-36">
              <thead className=" ">
                <tr className="text-gray-400 grid grid-cols-[1fr,1fr,1fr,1fr] ">
                  {/* <th className="p-2 border-b-2 border-black text-left">
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox text-white bg-white"
                      />
                    </label>
                  </th> */}
                  <th className="p-2 border-b border-gray-300 text-left text-base font-normal">
                    Company
                  </th>
                  <th className="p-2 border-b border-gray-300 text-left text-base font-normal">
                    Date
                  </th>
                  <th className="p-2 border-b border-gray-300 text-left text-base font-normal">
                    Project
                  </th>
                  <th className="p-2 border-b border-gray-300 text-right text-base font-normal">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredReceipts?.map((receipt: receiptType) => (
                  <tr
                    onClick={() => {
                      handleViewReceipt(receipt);
                    }}
                    key={receipt.id}
                    className="hover:bg-gray-100 hover:cursor-pointer  grid grid-cols-[1fr,1fr,1fr,1fr]"
                  >
                    {/* <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          onSelect={() => {
                            console.log(receipt);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                      </label>
                    </th> */}
                    <td className="p-2 border-b border-gray-300 text-left">
                      {receipt.company}
                    </td>
                    <td className="p-2 border-b border-gray-300">
                      {receipt.purchaseDate}
                    </td>
                    <td className="p-2 border-b border-gray-300 text-left">
                      {receipt.project}
                    </td>
                    <td className="p-2 border-b border-gray-300 text-right">{`${receipt.amount} ${receipt.currency}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {receipts?.length === 0 && (
          <div className="flex justify-center items-center p-4 text-center rounded m-2">
            <p className="text-gray-400">
              Hi {user?.name}, start adding receipts by clicking on the Add
              Receipt button.
            </p>
          </div>
        )}
        <div className="">
          {!showFilter && (
            <div
              className={`fixed bg-gradient-to-t from-gray-50 flex justify-center ${
                isMobile ? "w-full bottom-20" : "w-1/2 bottom-0"
              }`}
            >
              <button
                className={`m-5 btn bg-gradient-to-b from-lightblue to-darkblue text-white md:w-1/3 lg:w-1/3 w-1/2 ${
                  isMobile ? "" : ""
                }`}
                onClick={() => windowToDisplay({ window: "AddReceipt" })}
              >
                Add Receipt
              </button>
            </div>
          )}
        </div>
        {fetchError && (
          <p className="text-red-500 break-words whitespace-normal text-center">{`Sorry, we are unable to retrieve your data. Please try again later. ERROR MESSAGE - ${fetchErrorLog}`}</p>
        )}
      </div>
    </>
  );
}

export default ListReceipts;

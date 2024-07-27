import img from "../assets/financial-analysts-doing-income-statement-with-calculator-laptop-income-statement-company-financial-statement-balance-sheet-concept.png";

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

export type NewPost = {
  projectId: string;
  taxId: string;
};

export type project = {
  title: string;
  id: string;
};

export type projects = {
  project: project[];
};

export type taxCategory = {
  title: string;
  id: string;
  description: string;
};

type TaxCardProps = {
  taxCategory: taxCategory;
};

function TaxCard({ taxCategory }: TaxCardProps) {
  return (
    <div className="bg-[#4a00ff] shadow-lg rounded-lg overflow-hidden w-full max-w-sm mx-auto m-6">
      <div className="flex justify-center items-center">
        <img
          src={img}
          alt="Card Image"
          className="object-cover p-2 h-48 w-full"
        />
      </div>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-white mb-2 text-center">
          {taxCategory.title}
        </h1>
        <p className="text-white text-sm text-center">
          {taxCategory.description}
        </p>
      </div>
    </div>
  );
}

export default TaxCard;

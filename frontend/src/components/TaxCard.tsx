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
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          {taxCategory.title}
        </h1>
        <p className="text-gray-600 text-base">{taxCategory.description}</p>
      </div>
    </div>
  );
}

export default TaxCard;

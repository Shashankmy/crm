import { SUMMARY_CARDS } from "@/lib/constants";

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {SUMMARY_CARDS.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-5 border border-neutral-100">
          <div className="flex items-center">
            <div className={`flex-shrink-0 ${card.iconBg} p-3 rounded-full`}>
              <span className={`material-icons ${card.iconColor}`}>{card.icon}</span>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-neutral-500">{card.title}</p>
              <p className="text-2xl font-semibold text-neutral-800">{card.value}</p>
            </div>
          </div>
          <div className={`mt-2 flex items-center text-sm ${
            card.changeType === 'positive' 
              ? 'text-success-500' 
              : card.changeType === 'negative' 
                ? 'text-danger-500' 
                : 'text-warning-500'
          }`}>
            <span className="material-icons text-sm">
              {card.changeType === 'positive' 
                ? 'arrow_upward' 
                : card.changeType === 'negative' 
                  ? 'arrow_downward' 
                  : 'remove'}
            </span>
            <span className="ml-1">{card.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;

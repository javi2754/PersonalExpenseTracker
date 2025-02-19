import { getTransactions } from "../firestoreFunctions";
import { auth } from "../firebase"; 

const fetchFilteredTransactions = async (startDate, endDate) => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
        throw new Error("You must be logged in to fetch transactions.");
        return;
    }

    try {
        const data = await getTransactions(userId);

        const transactionData = data
            .filter((txn) => txn.date && txn.amount !== undefined)
            .map((txn) => ({
                date: txn.date.toDate().toLocaleDateString("en-CA"), 
                amount: txn.amount,
                type: txn.type,
            }));

        const start = new Date(startDate).toISOString().split("T")[0];
        const end = new Date(endDate).toISOString().split("T")[0];

        const filtered = transactionData.filter(
            (txn) => txn.date >= start && txn.date <= end
        );

        const aggregated = filtered.reduce((acc, txn) => {
            if (!acc[txn.date]) {
                acc[txn.date] = 0;
            }
            acc[txn.date] += txn.type === "income" ? txn.amount : -txn.amount;
            return acc;
        }, {});

        const dates = Object.keys(aggregated).sort();
        const amounts = dates.map((date) => aggregated[date]);

        let balance = 0;
        const balances = amounts.map((amount) => {
            balance += amount; 
            return balance;
        });


        return { dates, amounts, balances };
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
};

export default fetchFilteredTransactions;

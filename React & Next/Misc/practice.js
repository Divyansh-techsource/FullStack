/*function processData(input) {
    //Enter your code here
    const lines=input.trim().split("\n");
    let index=0;
    const N=parseInt(lines[index++],10);
    let transactions=[];
    for(let i=0;i<N;i++){
        const [text,amountStr]=lines[index++].split(" ");
        transactions.push({
            id: i+1,
            text: text,
            amount: Number(amountStr)
        });
    }
    const newText=lines[index++].trim();
    const newAmount=Number(lines[index++].trim());
    const deleteId=Number(lines[index++].trim());
    function sum(transactions){
        return transactions.reduce((acc,curr)=>{
            if(curr.amount>0){
                acc.income+=curr.amount;
            }else{
                acc.expense+=Math.abs(curr.amount);
            }
            return acc;
        },{income:0,expense:0});
    }
    function handleSubmit(text,amount,transactions){
        if (!text||text.trim()=== ""||amount === 0){
            return transactions;
        }
        const maxId=transactions.length ? Math.max(...transactions.map(t => t.id)) : 0;
        const newTransaction={
            id: maxId+1,
            text,
            amount
        };
        return [...transactions, newTransaction];
    }
    function renderTransactions(transactions){
        return transactions.map(t =>`${t.text}:${t.amount}`);
    }
    function deleteTransaction(transactions,id){
        return transactions.filter(t =>t.id!==id);
    }
    transactions=handleSubmit(newText,newAmount,transactions);
    transactions=deleteTransaction(transactions,deleteId);
    const totals=sum(transactions);
    const renderedList=renderTransactions(transactions);
    const output={
        transactions,
        totals,
        renderedList
    };
    console.log(JSON.stringify(output));
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
*/
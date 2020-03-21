// Connected Queries
// Problem Description
// There are a number of computers which are connected to each other. Each computer has a storage capacity which can be used to store data. When a computer is connected to another, they form a set of computers and the storage capacity of the set is the sum of the storage capacities of the computers in the set.

// You are given the set of connections between the computers by the arrays connections_from and connections_to (The connections are bi-directional). The initial storage capacities are denoted by storage[storage[0],...,storage[connections_nodes-1]]. Also, you are given a threshold of storage capacity. After every connection, you are required to find the number of sets of computers which have storage capacity less than or equal to threshold.

// Note: Initially there are no connections between the computers and each computer can be considered as a set with 1 computer.

// For example, connections_nodes = 3. storage = {2, 3, 6}, connections_from = {0, 0, 2}, connections_to = {1, 2, 1}, threshold = 6.

// After 1st connection {0, 1}: {5, 6} (2 values are less than or equal to 6)

// After 2nd connection {0, 2}: {11} (no value is less than or equal to 6)

// After 3rd connection {2, 1}: {11} (no value is less than or equal to 6)

 

// Return a array containing the answer after each connection.

 

// Function Description

// Complete the function getStorage in the editor below. The function must return a vector.

// getStorage has the following parameter(s):

//     connections_nodes: an integer denoting the number of computers

//     connections_from: an array of integers denoting the ith connection

//     connections_to: an array of integers denoting the ith connection

//     storage: an array of integers denoting the initial storage capacities

//     threshold: an integer

 

// Constraints

// 1 ≤ connections_nodes ≤ 105  
// 1 ≤ connections_edges ≤ min( (connections_nodes) * (connections_nodes-1)/2, 105)
// 0 ≤ connections_fromi, connections_toi < connections_nodes
// 1 ≤ storagei  ≤ 104  
// 1 ≤ threshold ≤ 109  
// The graph does not contain a self-loop or multiple edges between two nodes.
 

// Input Format For Custom Testing

// The first line contains 2 space-separated integers, connections_nodes and connections_edges, denoting the number of computers and number of connections respectively.
// Each line i of the connections_edges subsequent lines (where 0 ≤ i < connections_edges) contains 2 space-separated integers describing connections_fromi and connections_toi.

// The next line contains an integer, connections_nodes, denoting the number of elements in storage.

// Each line i of the connections_nodes subsequent lines (where 0 ≤ i < connections_nodes) contains an integer storagei.

// The last line contains the integer threshold.

// Sample Case 0

// Sample Input For Custom Testing

// 5 3
// 0 1
// 1 4
// 0 4
// 5
// 1
// 2
// 3
// 4
// 5
// 4
// Sample Output

// 3
// 2
// 2
// Explanation

// Initial storage capacities: {1, 2, 3, 4, 5}

// After 1st connection {0, 1}: {3, 3, 4, 5} (3 values are less than or equal to 4)

// After 2nd connection {1, 4}: {3, 4, 8} (2 value is less than or equal to 4)

// After 3rd connection {0, 4}: {3, 4, 8} (2 value is less than or equal to 4)

// Sample Case 1

// Sample Input For Custom Testing

// 3 2
// 0 1
// 1 2
// 3
// 1
// 2
// 3
// 4
// Sample Output

// 2
// 0
// Explanation

// Initial storage capacities: {1, 2, 3}

// After 1st connection {0, 1}: {3, 3} (2 values are less than or equal to 4)

// After 2nd connection {1, 2}: {6} (no value is less than or equal to 4)

// Sample code to perform I/O:
process.stdin.resume();
process.stdin.setEncoding("utf-8");

let stdin_input = "";

process.stdin.on("data", function (input) {
    stdin_input += input; // Reading input from STDIN
});

process.stdin.on("end", function () {
    main(stdin_input);
});

function main(input) {
    let inputArray = input.split("\n");
    let lineOne = inputArray[0].split(" ");
    let connections_nodes = parseInt(lineOne[0]), connections_edges = parseInt(lineOne[1]);
    let connections_from = [], connections_to = [], storage = [], threshold = parseInt(inputArray[connections_nodes + connections_edges + 2]);
    for (i = 0; i < connections_edges; i++) {
        connections_from.push(parseInt(inputArray[i + 1].charAt(0)));
        connections_to.push(parseInt(inputArray[i + 1].charAt(2)));
    }
    for (i = 0; i < connections_nodes; i++) {
        storage.push(parseInt(inputArray[i + connections_edges + 2]));
    }
    
    process.stdout.write(solve(connections_nodes, connections_edges, connections_from, connections_to, storage, threshold)); // Writing output to STDOUT
}

// Write your code here
function solve(connections_nodes, connections_edges, connections_from, connections_to, storage, threshold) {
    let count = [], output = "\n";
    let refArray = new Array(connections_nodes).fill(0).map((_, i) => i);
    let countStorage = [...storage];

    for (i = 0; i < connections_edges; i++) {
        if (refArray[connections_from[i]] !== refArray[connections_to[i]]) {
            let min = Math.min(connections_from[i], connections_to[i], refArray[connections_from[i]], refArray[connections_to[i]]); 
            
            refArray[connections_from[i]] = min;
            refArray[connections_to[i]] = min;

            let tempSum = storage[connections_from[i]] + storage[connections_to[i]];
            countStorage[connections_from[i]] = -1;
            countStorage[connections_to[i]] = -1;
            countStorage[min] = tempSum;

            storage = refArray.map((i, j) => {
                if (i === min) {
                    return tempSum;
                } else {
                    return storage[j];
                }
            });
        } 

        let roundCount = countStorage.reduce((sum, item) => {
            if (item <= threshold && item !== -1) {
                return sum + 1;
            } else {
                return sum;
            }
        }, 0);

        count.push(roundCount);
        output = output + count[i] + "\n";
    }

    // console.log("\nConnection Nodes: " + connections_nodes);
    // console.log("Connection Edges: " + connections_edges);
    // console.log("Connection From: " + connections_from);
    // console.log("Connection To: " + connections_to);
    // console.log("Storage: " + storage);
    // console.log("Threshold: " + threshold);

    return output;
}

// Hoisting
let len, n;
// (() => {})();

// [0, 1]
let a = [0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1];
console.log(a);
len = a.length;

let i = 0, j = len - 1;
n = 0;

while (i < j) {
    n++;
    if (a[i] === 0) {
        i++;
    } else if (a[j] === 1) {
        j--;
    } else {
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;

        i++;
        j--;
    }
}

console.log(a, n);

// [0, 1, 2]
let b = [2, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 2, 1, 0, 2, 2, 2, 2];
console.log(b);
len = b.length;

let low = 0, high = len - 1, mid = 1;
n = 0;

while (mid <= high) {
    n++;
    if (b[mid] === 0) {
        let temp = b[mid];
        b[mid] = b[low];
        b[low] = temp;

        low++;
    } else if (b[mid] === 1) {
        mid++;
    } else if (b[mid] === 2) {
        let temp = b[mid];
        b[mid] = b[high];
        b[high] = temp;

        high--;
    }
}

console.log(b, n);

// [m] + [n] = [m+n] SORTED
let m = [1, 2, 3, 4, 6, 7, 9, 9, 10];
let l = [0, 1, 2, 3, 4, 6, 6, 6, 7, 7, 9, 9, 10];

console.log(m, l);

len = m.length + l.length;
let o = new Array(len);

i = 0, j = 0, k = 0, n = 0;

while (i + j < len) {
    n++;
    if (m[i] < l[j]) {
        o[k] = m[i];
        k++;
        i++;
    } else if (m[i] > l[j]) {
        o[k] = l[j];
        k++;
        j++;
    } else {
        o[k] = m[i];
        o[k + 1] = l[j];
        k+=2;
        i++;
        j++;
    }
}

console.log(o, n);
class Random {

    static nextDouble(low, high) {
        return Math.random() * (high - low) + high;
    }

    static nextInt(low, high) {
        low = Math.ceil(low);
        high = Math.floor(high);
        return Math.floor(Math.random() * (high - low)) + low;
    }

    static nextElement(arr) {
        return arr[Random.nextInt(0, arr.length - 1)]
    }
}
const r=Random.nextElement([4,8,6,3]);
console.log(r);


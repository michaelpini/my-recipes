/**
 * creates a deferred object with the following properties:
 * - promise: a Promise that can be awaited for
 * - resolve: method to resolve the promise
 * - reject: method to reject promise
 * @example:
 * const deferred = new Deferred();
 *
 * async function waitForIt() {
 *     console.log('waiting...');
 *     await deferred.promise;
 *     console.log('resolved!');
 * }
 * waitForIt();
 * setTimeout(() => deferred.resolve(), 1000);
 */
class Deferred<T> {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (error: string | Error) => void;

    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

/**
 * Returns a random id as UUID 8-4-4-4-12
 * - Uses ``crypto.randomUUID()`` in secure environments and if supported by browser.
 * - Uses ``crypto.getRandomValues()`` otherwise to construct a UUID
 * @example
 * const id = getRandomId();  // "895964fc-31d6-2daf-7603-4f651a90200d"
 * @returns {string}
 */
function getRandomId(): string {
    try {
        return crypto.randomUUID();
    }
    catch (error) {
        let [n1, n2, n3, n4, n5] = crypto.getRandomValues(new BigUint64Array(5));
        const s1= n1.toString(16).slice(-8);
        const s2 = n2.toString(16).slice(-4);
        const s3 = n3.toString(16).slice(-4);
        const s4 = n4.toString(16).slice(-4);
        const s5 = n5.toString(16).slice(-12);
        return `${s1}-${s2}-${s3}-${s4}-${s5}`
    }
}

/**
 * **Sorts an array of objects by a property / key**
 * @param array {object[]} array of objects to be sorted
 * @param prop {string} property / key name to sort by
 * @param descending {boolean} indicates whether to sort in descending order - default ascending
 * @param clone {boolean} indicates whether to return a copy of the array - default returns original
 * @returns {object[]}
 * @example Sorts arr by name in ascending order (***modifies the original array*** and returns it)
 * const arr = [
 *     {name: 'John Doe', age: 23},
 *     {name: 'Jane Doe', age: 45},
 * ]
 * sortObjectArray(arr, 'name');
 * @example Returns a ***copy of the original array***, sorted by age in descending order
 * const sortedCopy = sortObjectArray(arr, 'age', true, true);
 */
function sortObjectArray(array: object[], prop: string|number|symbol, descending = false, clone = false): object[] {
    if (!Array.isArray(array) || !array.length || !Object.hasOwn(array[0], prop)) return array;
    const arr: object[] = clone ? [...array] : array;
    arr.sort((a, b) => {
        if (a[prop] > b[prop]) return descending ? -1 : 1;
        if (a[prop] < b[prop]) return descending ? 1 : -1;
        return 0
    })
    return arr;
}

/**
 * Saves an object as json to a file. The file is downloaded by the browser to the default download location.
 * @param obj {object} The object to save
 * @param filename {string} filename (without .json, will be added)
 * @example
 * const data = [ { name: Michael, age: 56 } ];
 * saveToFile(data, 'membersList');
 * // %userprofile%\downloads\membersList.json
 */
function saveToFile (obj: object, filename: string) {
    const blob = new Blob([JSON.stringify(obj, null, 2)], {
        type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

/**
 * Sets the src property of an \<img> tag to a placeholder image if the src is broken. <br>
 * The brokenImg is hardcoded, update as needed
 * @param {ErrorEvent} e
 * @example
 * <img src="???" onerror="setBrokenImage(event)" />   (vanilla.js)
 * <img src="???" (error)="setBrokenImage($event)" />  (Angular)
 */
function setBrokenImage(e: ErrorEvent) {
    const brokenImg =  '/assets/broken_img.jpg';
    const target = e.target as HTMLImageElement;
    if (!target.src.includes(brokenImg)) target.src = brokenImg;
}

export { Deferred, getRandomId, sortObjectArray, saveToFile, setBrokenImage };

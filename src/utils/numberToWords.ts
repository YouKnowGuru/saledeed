export function numberToWords(num: number): string {
    if (num === 0 || isNaN(num)) return 'zero';

    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    const convertLessThanThousand = (n: number): string => {
        if (n === 0) return '';
        if (n < 10) return ones[n];
        if (n < 20) return teens[n - 10];
        if (n < 100) {
            return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
        }
        return ones[Math.floor(n / 100)] + ' hundred' + (n % 100 !== 0 ? ' and ' + convertLessThanThousand(n % 100) : '');
    };

    const convert = (n: number): string => {
        if (n === 0) return '';
        if (n < 1000) return convertLessThanThousand(n);
        if (n < 100000) {
            return convertLessThanThousand(Math.floor(n / 1000)) + ' thousand' + (n % 1000 !== 0 ? ' ' + convertLessThanThousand(n % 1000) : '');
        }
        if (n < 10000000) {
            return convertLessThanThousand(Math.floor(n / 100000)) + ' lakh' + (n % 100000 !== 0 ? ' ' + convert(n % 100000) : '');
        }
        return convertLessThanThousand(Math.floor(n / 10000000)) + ' crore' + (n % 10000000 !== 0 ? ' ' + convert(n % 10000000) : '');
    };

    return convert(num);
}

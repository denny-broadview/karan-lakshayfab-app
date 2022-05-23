import I18n from 'react-native-i18n';
import moment from 'moment';
import {exp} from 'react-native-reanimated';

// Format the integer with commas based on its locale
export function formatNumber(num, locale = I18n.locale) {
    if (isNaN(num)) {
        return '';
    } else {
        return new Intl.NumberFormat(locale).format(num);
    }
}

// Format the date based on its locale and addtional options
export function formatDate(date, options = {
    year: 'long',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
}, locale = I18n.locale) {
    return date.toLocaleDateString(locale, options);
}

export function formatOrderDate(date) {
    return moment(date).format('Do MMMM  YYYY');

}

export function formatOddReportDate(date){
    return moment(date).format('Do MMMM,YYYY h:mm a');
}

export function address(str) {



}

export function formatFilterDate(date) {
    return moment(date).format('YYYY-MM-DD');

}

export function formatDateIN(date) {
    return moment(date).format('DD-MM-YYYY');

}


// Format the date based on its locale and addtional options
export function convertStringToNumber(str) {
    return Number(str);
}

// Format the date based on its locale and addtional options
export function calculateTotalPrice(list) {
    if (!list) {
        return 0;
    } else {
      return list.reduce(function (prev, cur) {
            return prev + convertStringToNumber(cur.totalPrice);
        }, 0);
    }
}

// Format the date based on its locale and addtional options
export function calculateTotalPieces(list) {
    if (!list) {
        return 0;
    } else {
        return list.reduce(function (prev, cur) {
            return prev + convertStringToNumber(cur.qty);
        }, 0);
    }
}



// Format the date based on its locale and addtional options
export function calculateTotalQty(list) {
    if (!list) {
        return 0;
    } else {
        return list.reduce(function (prev, cur) {
            return prev + convertStringToNumber(cur.product_min_qty)+convertStringToNumber(cur.added_piece);
        }, 0);
    }
}



// Check if the string is empty
export function isEmpty(str) {
    if (str === undefined || str == null || (typeof str === 'string' && (str.length == 0 || str.trim().length == 0)) || str == 'undefined' || str == '') {
        return true;
    } else {
        return false;
    }
}

// Format a string such as 'abcd, {0} {1}' with an array of arguments
export function formatString(str, ...args) {
    for (let i = 0; i < args.length; i++) {
        str = str.replace('{' + i + '}', args[i]);
    }
    return str;
}

// Get the relative time by passing only date
export function getRelativeTimeFromNow(date) {
    return moment(date).fromNow();
}

// Format the given phone number
export function formatPhoneNumber(string) {
    if (isEmpty(string)) {
        return string;
    }
    string = string.replace(/-/g, '');
    var size = string.length;
    if (size < 4) {
        string = string;
    } else if (size < 7) {
        string = string.substring(0, 3) + '-' + string.substring(3, 6);
    } else {
        string = string.substring(0, 3) + '-' + string.substring(3, 6) + '-' + string.substring(6, 10);
    }
    return string;
}

export function formatDateString(dateString) {
    return moment(dateString).format('ll');
}

export function hasHtmlTags(text) {
    return text && text.match(/<[a-zA-Z][^<>]*>/) !== null;
}

export function hasOnlyReducedHtmlTagsWithNoStyle(text) {
    // Checks whether the text object contain at most html tags from a limited set,
    // without any embedded styling information
    let plain = text.replace(this.reMatchLimitedHtmlTags, '');
    plain = plain.replace(/<(img|a(?=\s))/gi, ''); // do special cleaning for images, since they may contain attributes like src
    if (hasHtmlTags(plain)) {
        return false;
    }
    return true;
}

export function cleanHtml(text) {
    if (!text) {
        return text;
    }

    let old;

    if (hasHtmlTags(text)) {
        // try to see if by removing some well formatting tags we get a plain text item
        let plain = text.replace(/[\t\n\r ]+/g, ' ');
        plain = plain.replace(/<br\s*\/?>((\s*<\/?(i|b|em|strong|span|div)>)*\s*<\/p>)/ig, '$1'); // <br> </em> </p> => </em> </p>
        plain = plain.replace(/<br\s*\/?>/ig, '\n');
        plain = plain.replace(/^\s*<(p|span|div)>\s*/i, '');
        plain = plain.replace(/\s*<\/(p|span|div)>\s*$/i, '');
        do {
            // we can apply this pattern multiple times to clean: <p> <em> </em> </p>
            old = plain;
            plain = plain.replace(/<([a-zA-Z]+)>\s*<\/\1>/ig, '');
        } while (plain != old);
        plain = plain.replace(/<\/p>\s*<p>/ig, '\n\n');
        plain = plain.replace(/[ ]+/g, ' ');

        if (!hasHtmlTags(plain)) {
            // if we have created with success a plain text object, then use it further
            text = plain;
        } else if (hasOnlyReducedHtmlTagsWithNoStyle(text)) {
            // if the text can be rendered with a simplified component, do some additional clean up
            text = text.replace(/[\t\n\r ]+/g, ' ');
            text = text.replace(/<br\s*\/?>((\s*<\/?(i|b|em|strong|span|div)>)*\s*<\/p>)/ig, '$1'); // <br> </em> </p> => </em> </p>
            do {
                // we can apply this pattern multiple times to clean: <p> <em> </em> </p>
                old = text;
                text = text.replace(/<([a-zA-Z]+)>\s*<\/\1>/ig, '');
            } while (text != old);
            text = text.replace(/[ ]+/g, ' ');
        }
    }

    text = text.replace(/&amp;/ig, '&');
    text = text.replace(/&quot;/ig, '"');

    // trim leftover whitespaces
    text = text.trim();

    return text;
}

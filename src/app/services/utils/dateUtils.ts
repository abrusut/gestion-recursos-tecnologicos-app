
import * as moment from 'moment';

export  class DateUtils {

    static defaultFormatDate = 'YYYY-MM-DD HH:mm:ss';

    public static convertStringToDate(dateS: any, format: string= this.defaultFormatDate): Date {
        if (dateS) {
        const date: Date = moment(dateS, format).toDate();
        return date;
        } else {
            return null;
        }
    }

    public static convertDateToString(date: Date, format: string= this.defaultFormatDate): any {
        if (date) {
        const dateS: string = moment(date).format(format);
        return dateS;
        } else {
            return null;
        }
    }
}

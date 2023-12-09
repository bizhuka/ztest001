import Locale from "sap/ui/core/Locale";
import DateFormat from "sap/ui/core/format/DateFormat";


export type Properties = {
    now: () => number,
    locale: Locale
}
export default class DateFormatter {
    private timeFormat: DateFormat
    private weekdayFormat: DateFormat
    private dateFormat: DateFormat
    private now: () => number

    constructor(oProperties?: Properties) {
        this.timeFormat = DateFormat.getTimeInstance({
            style: "short"
        }, oProperties ? oProperties.locale : null);

        this.weekdayFormat = DateFormat.getDateInstance({
            pattern: "EEEE"
        }, oProperties.locale);

        this.dateFormat = DateFormat.getDateInstance({
            style : "medium"
        }, oProperties.locale);

        this.now = oProperties.now;
    }

    format(oDate?: Date) {
        if (!oDate) {
            return "";
        }
        const iElapsedDays = this._getElapsedDays(oDate);
        if (iElapsedDays === 0) {
            return this.timeFormat.format(oDate);
        } else if (iElapsedDays === 1) {
            return "Yesterday";
        } else if (iElapsedDays < 7) {
            return this.weekdayFormat.format(oDate);
        }

        return this.dateFormat.format(oDate);
    }

    private _getElapsedDays(oDate: Date) {
        const iElapsedMilliseconds = this.now() - oDate.getTime();
        const fElapsedDays = iElapsedMilliseconds / 1000 / 60 / 60 / 24;
        return Math.floor(fElapsedDays);
    }
}
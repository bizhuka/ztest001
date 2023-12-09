import Locale from "sap/ui/core/Locale";
import UI5Date from "sap/ui/core/date/UI5Date";
import DateFormatter, { Properties } from "ztest001/model/DateFormatter";



let oFormatter: DateFormatter = null;
QUnit.module("DateFormatter", {
    beforeEach: function () {
        oFormatter = new DateFormatter({
            now: function (): number {
                return UI5Date.getInstance(2015, 2, 14, 14, 0, 0, 0).getTime();
            },

            locale: new Locale("en-US")
        } as Properties);
    }
});

// QUnit.test("initial", function (assert) {
//     assert.ok(new DateFormatter());
// });

QUnit.test("Should return empty string if no date is given", function (assert) {
    // const oFormatter = new DateFormatter();
    const sFormattedDate = oFormatter.format(null);
    assert.strictEqual(sFormattedDate, "");
});

QUnit.test("Should return time if date from today", function (assert) {
    // const oFormatter = new DateFormatter({
    //     locale: new Locale("en-US")
    // } as Properties);
    const oDate = UI5Date.getInstance(2015, 2, 14, 12, 5, 0, 0);
    const sFormattedDate = oFormatter.format(oDate);

    // Date with Narrow No-Break Space
    assert.strictEqual(sFormattedDate, `12:05${'\u202F'}PM`);
});

QUnit.test("Should return 'Yesterday' if date from yesterday", function (assert) {
    const oDate = UI5Date.getInstance(2015, 2, 13);
    const sFormattedDate = oFormatter.format(oDate);
    assert.strictEqual(sFormattedDate, "Yesterday");
});

QUnit.test("Should return day of the week if date < 7 days ago", function (assert) {
    const oDate = UI5Date.getInstance(2015, 2, 8);
    const sFormattedDate = oFormatter.format(oDate);
    assert.strictEqual(sFormattedDate, "Sunday");
});

QUnit.test("Should return date w/o time if date > 7 days ago", function (assert) {
    const oDate = UI5Date.getInstance(2015, 2, 7);
    const sFormattedDate = oFormatter.format(oDate);
    assert.strictEqual(sFormattedDate, "Mar 7, 2015");
});
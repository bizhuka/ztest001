import { ValueState } from "sap/ui/core/library";
import DateFormatter, { Properties } from "./DateFormatter";

export default {
	formatValue: (value: string) => {
		return value?.toUpperCase();
	},

	/**
	 * Rounds the number unit value to 2 digits
	 *
	 * @public
	 * @param {string} sValue the number string to be rounded
	 * @returns {string} sValue with 2 digits rounded
	 */
	numberUnit: (sValue: string): string => {
		if (!sValue) {
			return "";
		}

		return parseFloat(sValue).toFixed(2);
	},

	priceState: (iPrice: number): ValueState => {
		if (iPrice < 50) {
			return ValueState.Success;
		} else if (iPrice >= 50 && iPrice < 250) {
			return ValueState.None;
		} else if (iPrice >= 250 && iPrice < 2000) {
			return ValueState.Warning;
		}
		return ValueState.Error;
	},

	formatDate: (date: Date): string => {
		return new DateFormatter({ now: Date.now } as Properties).format(date);
	}

};

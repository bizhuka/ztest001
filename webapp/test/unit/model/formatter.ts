/*global QUnit*/

import formatter from "ztest001/model/formatter";
import { ValueState } from "sap/ui/core/library";

type Option = {
	price: number,
	expected: ValueState,
	assert: {
		strictEqual: (actual: ValueState, expected: ValueState, message: string) => void
	}
}

QUnit.module("Price State");

function priceStateTestCase(oOptions: Option) {
	// Act
	const sState = formatter.priceState(oOptions.price);

	// Assert
	oOptions.assert.strictEqual(sState, oOptions.expected, "The price state was correct");
}

QUnit.test("Should format the products with a price lower than 50 to Success", function (assert) {
	priceStateTestCase({
		assert: assert,
		price: 42,
		expected: ValueState.Success
	});
});

QUnit.test("Should format the products with a price of 50 to Normal", function (assert) {
	priceStateTestCase({
		assert: assert,
		price: 50,
		expected: ValueState.None
	});
});

QUnit.test("Should format the products with a price between 50 and 250 to Normal", function (assert) {
	priceStateTestCase({
		assert: assert,
		price: 112,
		expected: ValueState.None
	});
});

QUnit.test("Should format the products with a price between 250 and 2000 to Warning", function (assert) {
	priceStateTestCase({
		assert: assert,
		price: 798,
		expected: ValueState.Warning
	});
});

QUnit.test("Should format the products with a price higher than 2000 to Error", function (assert) {
	priceStateTestCase({
		assert: assert,
		price: 2001,
		expected: ValueState.Error
	});
});
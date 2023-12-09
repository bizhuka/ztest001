import Opa5 from "sap/ui/test/Opa5";
import Press from "sap/ui/test/actions/Press";
import AggregationLengthEquals from "sap/ui/test/matchers/AggregationLengthEquals";
import I18NText from "sap/ui/test/matchers/I18NText";
import BindingPath from "sap/ui/test/matchers/BindingPath";
import EnterText from "sap/ui/test/actions/EnterText";

const viewName = "ztest001.view.Main";

export default class Worklist extends Opa5 {

	sTableId = "table"
	sViewName = "Worklist"


	// Actions
	__iPressTheSayHelloWithDialogButton() {
		this.waitFor({
			id: "helloButton",
			viewName,
			actions: new Press(),
			errorMessage: "Did not find the 'Say Hello With Dialog' button on the Main view"
		});
	}

	__iPressTheOkButtonInTheDialog() {
		this.waitFor({
			controlType: "sap.m.Button",
			searchOpenDialogs: true,
			viewName,
			actions: new Press(),
			errorMessage: "Did not find the 'OK' button in the Dialog"
		});
	}

	iPressOnMoreData() {
		// Press action hits the "more" trigger on a table
		return this.waitFor({
			id: this.sTableId + '-trigger',
			viewName: this.sViewName,
			actions: new Press(),
			errorMessage: "The table does not have a trigger."
		});
	}

	iShouldSeeTheTable() {
		return this.waitFor({
			id: this.sTableId,
			viewName: this.sViewName,
			success: function () {
				Opa5.assert.ok(true, "The table is visible");
			},
			errorMessage: "Was not able to see the table."
		});
	}

	iPressOnTheItemWithTheID(sId: string) {
		return this.waitFor({
			controlType: "sap.m.ColumnListItem",
			viewName: this.sViewName,
			matchers: new BindingPath({
				path: "/Posts('" + sId + "')"
			}),
			actions: new Press(),
			errorMessage: "No list item with the id " + sId + " was found."
		});
	}

	iSearchFor(sSearchString: string) {
		return this.waitFor({
			id: "searchField",
			viewName: this.sViewName,
			actions: new EnterText({
				text: sSearchString
			}),
			errorMessage: "SearchField was not found."
		});
	}

	// Assertions
	__iShouldSeeTheHelloDialog() {
		this.waitFor({
			controlType: "sap.m.Dialog",
			success: function () {
				// we set the view busy, so we need to query the parent of the app
				Opa5.assert.ok(true, "The dialog is open");
			},
			errorMessage: "Did not find the dialog control"
		});
	}

	__iShouldNotSeeTheHelloDialog() {
		this.waitFor({
			controlType: "sap.m.App", // dummy, I just want a check function, where I can search the DOM. Probably there is a better way for a NEGATIVE test (NO dialog).
			check: function () {
				return document.querySelectorAll(".sapMDialog").length === 0;
			},
			success: function () {
				Opa5.assert.ok(true, "No dialog is open");
			}
		});
	}

	theTableShouldHavePagination() {
		return this.waitFor({
			id: this.sTableId,
			viewName: this.sViewName,
			matchers: new AggregationLengthEquals({
				name: "items",
				length: 20
			}),
			success: function () {
				Opa5.assert.ok(true, "The table has 20 items on the first page");
			},
			errorMessage: "The table does not contain all items."
		});
	}

	theTableShouldHaveAllEntries() {
		return this.waitFor({
			id: this.sTableId,
			viewName: this.sViewName,
			matchers: new AggregationLengthEquals({
				name: "items",
				length: 23
			}),
			success: function () {
				Opa5.assert.ok(true, "The table has 23 items");
			},
			errorMessage: "The table does not contain all items."
		});
	}

	theTitleShouldDisplayTheTotalAmountOfItems() {
		return this.waitFor({
			id: "tableHeader",
			viewName: this.sViewName,
			matchers: new I18NText({
				key: "worklistTableTitleCount",
				propertyName: "text",
				parameters: [23]
			}),
			success: function () {
				Opa5.assert.ok(true, "The table header has 23 items");
			},
			errorMessage: "The table header does not contain the number of items: 23"
		});
	}

	theTableHasOneItem() {
		return this.waitFor({
			id: this.sTableId,
			viewName: this.sViewName,
			matchers: new AggregationLengthEquals({
				name: "items",
				length: 1
			}),
			success: function () {
				Opa5.assert.ok(true, "The table contains one corresponding entry");
			},
			errorMessage: "The table does not contain one item."
		});
	}
}

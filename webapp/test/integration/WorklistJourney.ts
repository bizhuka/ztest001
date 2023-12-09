/* eslint-disable @typescript-eslint/no-floating-promises */
import opaTest from "sap/ui/test/opaQunit";
import Worklist from "./pages/Worklist";
import Startup from "./arrangements/Startup";


export class WorklistJourney {
	static testAll() {
		const onTheMainPage = new Worklist();
		QUnit.module("Posts");

		opaTest("Should see the table with all posts", function (Given: Startup) { // Given: Opa5, When, Then	
			// Arrangements
			Given.iStartMyApp();

			// Assertions
			onTheMainPage.theTableShouldHavePagination().   // Then.onTheWorklistPage
				and.theTitleShouldDisplayTheTotalAmountOfItems();

			// // Cleanup
			// onTheMainPage.iTeardownMyApp(); 
		});

		opaTest("Should be able to load more items", function () { // Given, When, Then
			//Actions
			onTheMainPage.iPressOnMoreData(); // When.onTheWorklistPage

			// Assertions
			onTheMainPage.theTableShouldHaveAllEntries(); // Then.onTheWorklistPage

			// Cleanup
			// onTheMainPage.iTeardownMyApp(); // Then
		});

		opaTest("Should be able to search for items", function () { // Given, When, Then
			//Actions
			onTheMainPage.iSearchFor("Bear");   // When.onTheWorklistPage
	
			// Assertions
			onTheMainPage.theTableHasOneItem(); // Then.onTheWorklistPage
	
			// Cleanup
			onTheMainPage.iTeardownMyApp(); // Then
		});


		// QUnit.module("Sample Hello Journey");

		// opaTest("Should open the Hello dialog", function () {
		// 	// Arrangements
		// 	onTheMainPage.iStartMyUIComponent({
		// 		componentConfig: {
		// 			name: "ztest001"
		// 		}
		// 	});

		// 	// Actions
		// 	onTheMainPage.iPressTheSayHelloWithDialogButton();

		// 	// Assertions
		// 	onTheMainPage.iShouldSeeTheHelloDialog();

		// 	// Actions
		// 	onTheMainPage.iPressTheOkButtonInTheDialog();

		// 	// Assertions
		// 	onTheMainPage.iShouldNotSeeTheHelloDialog();

		// 	// Cleanup
		// 	onTheMainPage.iTeardownMyApp();
		// });

		// opaTest("Should close the Hello dialog", function () {
		// 	// Arrangements
		// 	onTheMainPage.iStartMyUIComponent({
		// 		componentConfig: {
		// 			name: "ztest001"
		// 		}
		// 	});

		// 	// Actions
		// 	onTheMainPage.iPressTheSayHelloWithDialogButton();
		// 	onTheMainPage.iPressTheOkButtonInTheDialog();

		// 	// Assertions
		// 	onTheMainPage.iShouldNotSeeTheHelloDialog();

		// 	// Cleanup
		// 	onTheMainPage.iTeardownMyApp();
		// });

	}
}

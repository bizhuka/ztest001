import opaTest from "sap/ui/test/opaQunit";
import Startup from "./arrangements/Startup";
import Worklist from "./pages/Worklist";
import Post from "./pages/Post";
import Browser from "./pages/Browser";


export class PostJourney {
    static testAll() {
        QUnit.module("Post");

        const onTheMainPage = new Worklist();
        const onThePostPage = new Post();
        const onTheBrowser = new Browser();

        opaTest("Should see the post page when a user clicks on an entry of the list", function (Given: Startup) { // When, Then
            // Arrangements
            Given.iStartMyApp();

            //Actions
            onTheMainPage.iPressOnTheItemWithTheID("PostID_15"); // When.onTheWorklistPage

            // Assertions
            onThePostPage.theTitleShouldDisplayTheName("Jeans"); // Then.onThePostPage
        });

        opaTest("Should go back to the TablePage", function () { //Given, When, Then
            // Actions
            onThePostPage.iPressTheBackButton(); //When.onThePostPage

            // Assertions
            onTheMainPage.iShouldSeeTheTable(); // Then.onTheWorklistPage
        });

        opaTest("Should be on the post page again when the browser's forward button is pressed", function () { //Given, When, Then
            // Actions
            onTheBrowser.iPressOnTheForwardButton(); // When.onTheBrowser

            // Assertions
            onThePostPage.theTitleShouldDisplayTheName("Jeans"); // Then.onThePostPage

            // Cleanup
            // onTheMainPage.iTeardownMyApp(); //Then
        });

        opaTest("Should select the statistics tab", function () { // Given, When, Then
			// Actions
			onThePostPage.iPressOnTheTabWithTheKey("statistics"); // When.onThePostPage

			// Assertions
			onThePostPage.iShouldSeeTheViewCounter()  // Then.onThePostPage
				.and.iTeardownMyApp();
		});
    }
}
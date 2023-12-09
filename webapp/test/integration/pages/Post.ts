import Opa5, { Matcher } from "sap/ui/test/Opa5";
import Press from "sap/ui/test/actions/Press";
import Properties from "sap/ui/test/matchers/Properties";

export default class Post extends Opa5 {
    sViewName = "Post";

    iPressTheBackButton() {
        return this.waitFor({
            id: "page",
            viewName: this.sViewName,
            actions: new Press(),
            errorMessage: "Did not find the nav button on object page"
        });
    }

    iPressOnTheTabWithTheKey(sKey: string) {
        return this.waitFor({
            controlType: "sap.m.IconTabFilter",
            viewName: this.sViewName,
            matchers: new Properties({
                key: sKey
            }) as Matcher,
            actions: new Press(),
            errorMessage: "Cannot find the icon tab bar"
        });
    }

    iShouldSeeTheViewCounter () {
        return this.waitFor({
            id: "viewCounter",
            viewName: this.sViewName,
            success: function () {
                Opa5.assert.ok(true, "The view counter was visible");
            },
            errorMessage: "The view counter could not be found"
        });
    }

    theTitleShouldDisplayTheName(sName: string) {
        return this.waitFor({
            success: () => {
                return this.waitFor({
                    id: "objectHeader",
                    viewName: this.sViewName,
                    matchers: new Properties({
                        title: sName
                    }) as Matcher,
                    success: function () { // oPage
                        Opa5.assert.ok(true, "was on the remembered detail page");
                    },
                    errorMessage: "The Post " + sName + " is not shown"
                });
            }
        });
    }
}
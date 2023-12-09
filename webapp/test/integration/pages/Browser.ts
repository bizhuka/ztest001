import Opa5 from "sap/ui/test/Opa5";

export default class Browser extends Opa5 {

    iPressOnTheForwardButton() {
        return this.waitFor({
            success: function () {
                Opa5.getWindow().history.forward();
            }
        });
    }
}
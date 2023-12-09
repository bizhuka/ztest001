import Opa5 from "sap/ui/test/Opa5";
import Startup from "./arrangements/Startup";
import { WorklistJourney } from "./WorklistJourney";
import { PostJourney } from "./PostJourney";

Opa5.extendConfig({
	arrangements: new Startup(),
	viewNamespace: "ztest001.view.",
	autoWait: true
});


WorklistJourney.testAll()
PostJourney.testAll()

export {

}

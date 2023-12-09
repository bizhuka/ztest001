import MessageBox from "sap/m/MessageBox";
import mockserver from "ztest001/localService/mockserver";


export default class InitMock {

	static {


		// const aMockservers = [];

		// // initialize the mock server
		// aMockservers.push(new mockserver.init());

		// Promise.all(aMockservers).catch(function (oError) {
		// 	MessageBox.error(oError.message);
		// }).finally(function () {
		// 	// initialize the embedded component on the HTML page
		// 	sap.ui.require(["sap/ui/core/ComponentSupport"]);
		// });


		// initialize the mock server
		try {
			void new mockserver().init();
		} catch (oError) {
			MessageBox.error((oError as Error).message);
		}

		// initialize the embedded component on the HTML page
		sap.ui.require(["sap/ui/core/ComponentSupport"]);
	}
}

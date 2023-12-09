import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import Opa5 from "sap/ui/test/Opa5";
import mockserver, { Option } from "ztest001/localService/mockserver";

export default class Startup extends Opa5 {

	/**
	 * Initializes mock server, then starts the app component
	*/
	iStartMyApp(oOptionsParameter?: Option) {
		const oOptions = oOptionsParameter || {} as Option;

		this._clearSharedData();

		// start the app with a minimal delay to make tests fast but still async to discover basic timing issues
		oOptions.delay = oOptions.delay || 1;

		// configure mock server with the current options
		const oMockserverInitialized = new mockserver().init(oOptions);

		this.iWaitForPromise(oMockserverInitialized);
		// start the app UI component
		this.iStartMyUIComponent({
			componentConfig: {
				name: "ztest001",
				async: true
			},
			hash: oOptions.hash,
			autoWait: oOptions.autoWait
		});
	}

	_clearSharedData() {
		// clear shared metadata in ODataModel to allow tests for loading the metadata
		ODataModel.mSharedData = { server: {}, service: {}, meta: {} };
	}

}
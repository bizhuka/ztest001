import BaseController from "./BaseController";

/**
 * @namespace ztest001.controller
 */
export default class App extends BaseController {
	public onInit(): void {
		// apply content density mode to root view
		this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

		// const oViewModel = new JSONModel({
		// 	busy: true,
		// 	delay: 0
		// });

		// this.setModel(oViewModel, "appView");

		// this.getOwnerComponent().getModel().metadataLoaded().then(function () {
		// 	oViewModel.setProperty("/busy", false);
		// });
	}
}

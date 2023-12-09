// import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import Table from "sap/m/Table";
import JSONModel from "sap/ui/model/json/JSONModel";
import { URLHelper } from "sap/m/library";
import { ListBase$UpdateFinishedEvent } from "sap/m/ListBase";
import ListBinding from "sap/ui/model/ListBinding";
import FlaggedType from "ztest001/model/FlaggedType";
import Event from "sap/ui/base/Event";
import ColumnListItem from "sap/m/ColumnListItem";
import { PostItem } from "./Post.controller";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import { SearchField$SearchEvent } from "sap/m/SearchField";
// import formatter from "ztest001/model/formatter";

/**
 * @namespace ztest001.controller
 */

export default class Worklist extends BaseController {
	// public sayHello(): void {
	// 	MessageBox.show("Hello World!");
	// }

	types = {
		flagged: new FlaggedType()
	}
	// formatter: formatter,

	/* =========================================================== */
	/* lifecycle methods                                           */
	/* =========================================================== */

	/**
	 * Called when the worklist controller is instantiated.
	 */
	onInit() {
		const oTable = this.byId("table") as Table;

		// Put down worklist table's original value for busy indicator delay,
		// so it can be restored later on. Busy handling on the table is
		// taken care of by the table itself.
		const iOriginalBusyDelay = oTable.getBusyIndicatorDelay();

		// Model used to manipulate control states
		const oViewModel = new JSONModel({
			worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
			shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
			shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [window.location.href]),
			tableBusyDelay: 0
		});
		this.setModel(oViewModel, "worklistView");

		// Make sure, busy indication is showing immediately so there is no
		// break after the busy indication for loading the view's meta data is
		// ended (see promise 'oWhenMetadataIsLoaded' in AppController)
		oTable.attachEventOnce("updateFinished", function () {
			// Restore original busy indicator delay for worklist's table
			oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
		});
	}

	/* =========================================================== */
	/* event handlers                                              */
	/* =========================================================== */

	/**
	 * Triggered by the table's 'updateFinished' event: after new table
	 * data is available, this handler method updates the table counter.
	 * This should only happen if the update was successful, which is
	 * why this handler is attached to 'updateFinished' and not to the
	 * table's list binding's 'dataReceived' method.
	 */
	public onUpdateFinished(oEvent: ListBase$UpdateFinishedEvent) {
		// update the worklist's object counter after the table update
		const oTable = oEvent.getSource();
		const iTotalItems = oEvent.getParameter("total");

		let sTitle: string
		// only update the counter if the length is final and
		// the table is not empty
		if (iTotalItems && (oTable.getBinding("items") as ListBinding).isLengthFinal()) {
			sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
		} else {
			sTitle = this.getResourceBundle().getText("worklistTableTitle");
		}
		(this.getModel("worklistView") as JSONModel).setProperty("/worklistTableTitle", sTitle);
	}

	/* =========================================================== */
	/* internal methods                                            */
	/* =========================================================== */

	/**
	 * Sets the item count on the worklist view header
	 * @param {int} iTotalItems the total number of items in the table
	 */
	private _updateListItemCount(iTotalItems: number) {
		// No call debugger

		const oTable = this.byId("table") as Table;
		const oBinding = oTable.getBinding("items") as ListBinding;

		// only update the counter if the length is final
		if (oBinding.isLengthFinal()) {
			const sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);

			const oViewModel = this.getModel("worklistView") as JSONModel;
			oViewModel.setProperty("/worklistTableTitle", sTitle);
		}
	}

	public onFilterPosts(oEvent: SearchField$SearchEvent) {
		// build filter array
		const aFilter = [];
		const sQuery = oEvent.getParameter("query");
		if (sQuery) {
			aFilter.push(new Filter("Title", FilterOperator.Contains, sQuery));
		}

		// filter binding
		const oTable = this.byId("table");
		const oBinding = oTable.getBinding("items") as ListBinding;
		oBinding.filter(aFilter);
	}

	public onPress(oEvent: Event) {
		const listItem: ColumnListItem = oEvent.getSource()
		this.getRouter().navTo("post", {
			// The source is the list item that got pressed
			postId: listItem.getBindingContext().getProperty("PostID") as string
		} as PostItem);
	}

	/**
	 * Event handler when the share by E-Mail button has been clicked
	 */
	public onShareEmailPress() {
		const oViewModel = this.getModel("worklistView");
		URLHelper.triggerEmail(
			null,
			oViewModel.getProperty("/shareSendEmailSubject") as string,
			oViewModel.getProperty("/shareSendEmailMessage") as string
		);
	}

}

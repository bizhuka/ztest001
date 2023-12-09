import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "./BaseController";
import { Route$MatchedEvent } from "sap/ui/core/routing/Route";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";

/**
 * @namespace ztest001.controller
*/

export type PostItem = {
    postId: string
}


export default class Post extends BaseController {

    onInit() {
        // Model used to manipulate control states. The chosen values make sure,
        // detail page is busy indication immediately so there is no break in
        // between the busy indication for loading the view's meta data
        const oViewModel = new JSONModel({
            busy: false
        });
        this.getRouter().getRoute("post").attachPatternMatched(this._onPostMatched.bind(this));
        this.setModel(oViewModel, "postView");
    }
    /* =========================================================== */
    /* event handlers                                              */
    /* =========================================================== */
    /**
     * Navigates back to the worklist
     * @function
     */
    onNavBack() {
        super.onNavBack("worklist");
    }
    /* =========================================================== */
    /* internal methods                                            */
    /* =========================================================== */
    /**
     * Binds the view to the post path.
     */
    private _onPostMatched(oEvent: Route$MatchedEvent) {
        console.log(this.getModel().getMetadata().getName())
        const oViewModel = this.getModel("postView") as JSONModel
        const oDataModel = this.getModel() as ODataModel
        this.getView().bindElement({
            path: "/Posts('" + (oEvent.getParameter("arguments") as PostItem).postId + "')",
            events: {
                dataRequested() {
                    void oDataModel.metadataLoaded().then(function () {
                        // Busy indicator on view should only be set if metadata is loaded,
                        // otherwise there may be two busy indications next to each other on the
                        // screen. This happens because route matched handler already calls '_bindView'
                        // while metadata is loaded.
                        oViewModel.setProperty("/busy", true);
                    });
                },
                dataReceived() {
                    oViewModel.setProperty("/busy", false);
                }
            }
        });
    }
}

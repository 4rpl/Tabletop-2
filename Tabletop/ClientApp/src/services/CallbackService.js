export default class CallbackService {

    static instance = null;

    static getInstance() {
        if (!this.instance) {
            this.instance = new CallbackService();
            document.onmousemove = e => {
                if (!this.instance.__wait) {
                    for (let client of this.instance.__onMouseMove) {
                        this.instance.__wait = true;
                        client.action(e);
                    }
                }
            }
            document.onmouseup = e => {
                for (let client of this.instance.__onMouseUp) {
                    client.action(e);
                }
            }
            document.onmousedown = e => {
                for (let client of this.instance.__onMouseDown) {
                    client.action(e);
                }
            }
        }
        return this.instance;
    }

    constructor() {
        setInterval(() => this.__wait = false, this.__delay);
    }

    __onMouseMove = [];
    __onMouseUp = [];
    __onMouseDown = [];
    __wait = false;
    __delay = 1000 / 60;

    onMouseMove(id, action) {
        this.__onMouseMove.push({
            id,
            action
        });
    }
    onMouseUp(id, action) {
        this.__onMouseUp.push({
            id,
            action
        });
    }
    onMouseDown(id, action) {
        this.__onMouseDown.push({
            id,
            action
        });
    }

    unsubscribeOnMouseMove(id) {
        this.__onMouseMove = this.__onMouseMove.filter(i => i.id !== id);
    }
    unsubscribeOnMouseUp(id) {
        this.__onMouseUp = this.__onMouseUp.filter(i => i.id !== id);
    }
    unsubscribeOnMouseDown(id) {
        this.__onMouseDown = this.__onMouseDown.filter(i => i.id !== id);
    }
}
export default class CallbackService {

    static instance = null;

    static getInstance() {
        if (!this.instance) {
            this.instance = new CallbackService();
            document.onmousemove = e => {
                for (let client of this.instance.__onMouseMove) {
                    client.action(e);
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

    __onMouseMove = [];
    __onMouseUp = [];
    __onMouseDown = [];

    onMouseMove(id, action) {
        console.log(id, 'on mouse move');
        this.__onMouseMove.push({
            id,
            action
        });
    }
    onMouseUp(id, action) {
        console.log(id, 'on mouse up');
        this.__onMouseUp.push({
            id,
            action
        });
    }
    onMouseDown(id, action) {
        console.log(id, 'on mouse down');
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
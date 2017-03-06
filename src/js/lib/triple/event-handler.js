import noop from 'noop2';

class EventHandler {
    constructor(eventHooks) {
        this.counter = 0;
        this.disabledHandles = [];

        // Protected handles are callbacks that cannot be blocked and thus
        // protected.
        this.protectedHandles = {};

        // Register the default event hooks.
        this.stack = {};
        for (let i = 0; i < eventHooks.length; i++) {
            let eventHook = eventHooks[i];

            this.stack[eventHook] = [];
        }
    }

    on(hooks, method, caller = 'Anonymous') {
        // Check whether the method is a function.
        if (!(method instanceof Function)) {
            console.error('EventHandler: Provided handler is not a function.');
            return;
        }

        // Convert hooks to an array to keep flow similar.
        if (!(hooks instanceof Array)) {
            hooks = [hooks];
        }

        // Register the handle on all hooks.
        let newHandles = [];
        for (let i = 0; i < hooks.length; i++) {
            let hook = hooks[i];

            if (!this.stack[hook]) {
                this.stack[hook] = [];
            }

            let newHandle = this._createHandler(caller, method);
            this.stack[hook].push(newHandle);

            newHandles.push({
                id: newHandle.id,
                hook: hook,
            });
        }

        // Return an array of objects that can be used to remove the handlers.
        return newHandles;
    }

    one(hook, block, method, caller = 'Anonymous') {
        // Check whether block is present, if not change parameters
        if (typeof block !== 'boolean') {
            caller = method;
            method = block;
            block = false;
        }

        // Check whether the method is a function.
        if (!(method instanceof Function)) {
            console.error('EventHandler: Provided handler is not a function.');
            return;
        }

        if (!this.stack[hook]) {
            this.stack[hook] = [];
        }

        if (!this.stack[hook].one) {
            this.stack[hook].one = [];
        }

        let newHandle = this._createHandler(caller, method, block);
        this.stack[hook].one.push(newHandle);

        // Return an object that can be used to remove the handler.
        return {
            id: newHandle.id,
            hook: hook,
        };
    }

    _createHandler(caller, method, block = false) {
        let newHandle = {
            id: this.counter,
            caller: caller,
            method: method,
            block: block,
        };

        this.counter++;

        return newHandle;
    }

    remove(events) {
        // Convert hooks to an array to keep flow similar.
        if (!(events instanceof Array)) events = [events];

        for (let i = 0; i < events.length; i++) {
            let eventObject = events[i];
            let removed = false;

            // First check the single handlers.
            if (this.stack[eventObject.hook].one) {
                for (let i = 0; i < this.stack[eventObject.hook].one.length; i++) {
                    let trigger = this.stack[eventObject.hook].one[i];

                    // Since ID's are unique break after finding one.
                    if (trigger.id === eventObject.id) {
                        this.stack[eventObject.hook].one.splice(i, 1);
                        removed = true;
                        break;
                    }
                }

                // No more single handlers so delete the array.
                if (this.stack[eventObject.hook].one.length === 0) {
                    delete this.stack[eventObject.hook].one;
                }

                // Again, since ID's are unique don't bother checking the rest after removing one.
                if (removed) continue;
            }

            // Now check regular handlers.
            for (let i = 0; i < this.stack[eventObject.hook].length; i++) {
                let trigger = this.stack[eventObject.hook][i];

                // Since ID's are unique break after finding one.
                if (trigger.id === eventObject.id) {
                    this.stack[eventObject.hook].splice(i, 1);
                    break;
                }
            }
        }
    }

    trigger(...args) {
        // Extract the first element as the hook.
        let hook = args.splice(0, 1)[0];

        // Check whether the event exists.
        if (!this.stack[hook]) {
            // console.warn(`EventHandler: '${hook}' is not a registered event.`);
            return;
        }

        // Check whether the event has been disabled.
        if (this.disabledHandles.indexOf(hook) !== -1) {

            // Check whether we have a protected handler if we do trigger that.
            if (this.protectedHandles[hook]) {
                this.protectedHandles[hook](args);
            }

            console.debug(`EventHandler: '${hook}' is disabled, skipping trigger`);
            return;
        }

        // Check whether there are any registered handlers.
        if (this.stack[hook].length === 0 && !this.stack[hook].one) {
            // console.debug(`EventHandler: no handlers registered for '${hook}'`);
            return;
        }

        if (this.stack[hook].one) {
            let block = false;

            for (var i = 0; i < this.stack[hook].one.length; i++) {
                let single = this.stack[hook].one[i];

                // Only check for blocking when not already blocked.
                if (!block) block = single.block;

                try {
                    single.method.apply(null, args);
                } catch (e) {
                    console.error(`EventHandler: Handle from '${single.caller}' for '${hook}' failed. Error: ${e}`);
                }
            }

            delete this.stack[hook].one;

            // Should block, do not trigger regular handlers.
            if (block) return;
        }

        // Trigger all regular handles associated with the hook.
        for (let i = 0; i < this.stack[hook].length; i++) {
            let eventHandle = this.stack[hook][i];

            try {
                eventHandle.method.apply(null, args);
            } catch (e) {
                console.error(`EventHandler: Handle from '${eventHandle.caller}' for '${hook}' failed. Error: ${e}`);
            }
        }
    }

    disable(hook, callback = noop) {
        this.protectedHandles[hook] = callback;

        if (this.disabledHandles.indexOf(hook) === -1) {
            this.disabledHandles.push(hook);
        }
    }

    enable(hook) {
        this.protectedHandles[hook] = noop;

        let hookIndex = this.disabledHandles.indexOf(hook);

        if (hookIndex !== -1) {
            this.disabledHandles.splice(hookIndex, 1);
        }
    }
}

export default EventHandler;

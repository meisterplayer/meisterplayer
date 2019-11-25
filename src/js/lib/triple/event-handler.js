import noop from 'noop2';

class EventHandler {
    constructor(eventHooks, debug) {
        this.debug = debug;
        this.counter = 0;
        this.disabledHandles = [];

        // Protected handles are callbacks that cannot be blocked and thus
        // protected.
        this.protectedHandles = {};

        // Register the default event hooks.
        this.stack = {};
        for (let i = 0; i < eventHooks.length; i += 1) {
            const eventHook = eventHooks[i];

            this.stack[eventHook] = [];
        }
    }

    on(hooks, method, caller = 'Anonymous') {
        // Check whether the method is a function.
        if (!(method instanceof Function)) {
            console.error('EventHandler: Provided handler is not a function.');
            return null;
        }

        // Convert hooks to an array to keep flow similar.
        const hooksArray = Array.isArray(hooks) ? hooks : [hooks];

        // Register the handle on all hooks.
        const newHandles = [];
        hooksArray.forEach((hook) => {
            if (!this.stack[hook]) {
                this.stack[hook] = [];
            }

            const newHandle = this._createHandler(caller, method);
            this.stack[hook].push(newHandle);

            newHandles.push({
                id: newHandle.id,
                hook,
            });
        });

        // Return an array of objects that can be used to remove the handlers.
        return newHandles;
    }

    one(hookArg, blockArg, methodArg, callerArg = 'Anonymous') {
        const hook = hookArg;
        let block = blockArg;
        let method = methodArg;
        let caller = callerArg;

        // Check whether block is present, if not change parameters
        if (typeof blockArg !== 'boolean') {
            caller = method;
            method = block;
            block = false;
        }

        // Check whether the method is a function.
        if (!(method instanceof Function)) {
            console.error('EventHandler: Provided handler is not a function.');
            return null;
        }

        if (!this.stack[hook]) {
            this.stack[hook] = [];
        }

        if (!this.stack[hook].one) {
            this.stack[hook].one = [];
        }

        const newHandle = this._createHandler(caller, method, block);
        this.stack[hook].one.push(newHandle);

        // Return an object that can be used to remove the handler.
        return {
            id: newHandle.id,
            hook,
        };
    }

    _createHandler(caller, method, block = false) {
        const newHandle = {
            id: this.counter,
            caller,
            method,
            block,
        };

        this.counter += 1;

        return newHandle;
    }

    remove(events) {
        // Convert hooks to an array to keep flow similar.
        const eventsArray = Array.isArray(events) ? events : [events];

        eventsArray.forEach((eventObject) => {
            // First check the single handlers.
            if (this.stack[eventObject.hook].one) {
                this.stack[eventObject.hook].one = this.stack[eventObject.hook].one.filter(handle => handle.id !== eventObject.id);

                if (this.stack[eventObject.hook].one.length === 0) {
                    delete this.stack[eventObject.hook].one;
                }
            }

            // Now check regular handlers.
            this.stack[eventObject.hook] = this.stack[eventObject.hook].filter(handle => handle.id !== eventObject.id);
        });
    }

    // Removes all events from eventhandler.
    // This can be used to release memory when the application is finished.
    destroy() {
        Object.keys(this.stack).forEach((key) => {
            this.stack[key].forEach((event) => {
                this.remove({ id: event.id, hook: key });
            });
        });
    }

    trigger(...args) {
        // Extract the first element as the hook.
        const hook = args.splice(0, 1)[0];

        // Check whether the event exists.
        if (!this.stack[hook]) {
            return;
        }

        // Check whether the event has been disabled.
        if (this.disabledHandles.indexOf(hook) !== -1) {
            // Check whether we have a protected handler if we do trigger that.
            if (this.protectedHandles[hook]) {
                this.protectedHandles[hook](args);
            }

            if (this.debug) {
                console.debug(`EventHandler: '${hook}' is disabled, skipping trigger`);
            }

            return;
        }

        // Check whether there are any registered handlers.
        if (this.stack[hook].length === 0 && !this.stack[hook].one) {
            return;
        }

        if (this.stack[hook].one) {
            let block = false;

            for (let i = 0; i < this.stack[hook].one.length; i += 1) {
                const single = this.stack[hook].one[i];

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
        for (let i = 0; i < this.stack[hook].length; i += 1) {
            const eventHandle = this.stack[hook][i];

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

        const hookIndex = this.disabledHandles.indexOf(hook);

        if (hookIndex !== -1) {
            this.disabledHandles.splice(hookIndex, 1);
        }
    }
}

export default EventHandler;

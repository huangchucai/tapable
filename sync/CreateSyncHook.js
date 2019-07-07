class CreateSyncHook {
    constructor(...args) {
        this._args = args;
        this.tasks = [];
    }

    tap(...args) {
        const callback = args.pop();
        this.tasks.push(callback);
    }

    call(...args) {
        this.tasks.forEach(fn => {
            fn.call(this, ...args);
        });
    }
}



let l = new CreateSyncHook();
l.tap('node', name => {
    console.log('node', name);
});
l.tap('react', name => {
    console.log('react', name);
});
l.call('hcc');

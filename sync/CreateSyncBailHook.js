class CreateSyncBailHook { // 有保护性的同步钩子
    constructor(...args) {
        this._args = args;
        this.tasks = [];
    }

    tap(name, task) {
        this.tasks.push(task);
    }

    call(...args) {
        let index = 0;
        let res;
        do {
            res = this.tasks[index++](...args);
        } while (res === undefined && index < this.tasks.length);
    }
}


let l = new CreateSyncBailHook();
l.tap('node', name => {
    console.log('node', name);
});
l.tap('react', name => {
    console.log('react', name);
});
l.call('hcc');

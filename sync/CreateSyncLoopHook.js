class CreateSyncLoopHook {
    constructor(...args) {
        this._args = args;
        this.tasks = [];
    }

    tap(...args) {
        const callback = args.pop();
        this.tasks.push(callback);
    }

    call(...args) {
        // 每一个callback都需要执行，然后某个函数的返回值不等于undefined的时候重新执行
        this.tasks.forEach(task => {
            let res;
            do {
                res = task(...args);
            } while (res !== undefined);
        });
    }
}


let l = new CreateSyncLoopHook();
let index = 0;
l.tap('node', name => {
    console.log('node', name);
    return ++index === 3 ? undefined : '继续看';
});
l.tap('react', name => {
    console.log('react', name);
});
l.call('hcc');

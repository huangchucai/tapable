class CreateSyncWaterfallHook { // 同步执行，上一个函数的返回值给下一个回调函数
    constructor(...args) {
        this._args = args;
        this.tasks = [];
    }

    tap(name, task) {
        this.tasks.push(task);
    }

    call(...args) {
        // 首先执行第一个函数，然后读取返回值
        let [first, ...others] = this.tasks;
        let res = first(...args); // 获取第一个函数的返回值
        return others.reduce((res, task) => {
           return task(res);
        }, res)

    }
}


let l = new CreateSyncWaterfallHook();
l.tap('node', name => {
    console.log('node', name);
    return '第一个函数的返回';
});
l.tap('react', name => {
    console.log('react', name);
});
l.call('hcc');

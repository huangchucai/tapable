/***
 * 异步串行, 第一个执行之后，第二个依次执行(Promise)
 */
class AsyncSeriesWaterfallHook {
    constructor(...args) {
        this._args = args;
        this.tasks = [];
    }

    tapPromise(...args) {
        const callback = args.pop();
        this.tasks.push(callback);
    }

    promise(...args) {
        const [first, ...others] = this.tasks;
        return others.reduce((p, task) => {
            return p.then((data) => task(data));
        }, first(...args));
    }
}


let l = new AsyncSeriesWaterfallHook();
l.tapPromise('node', (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name);
            resolve("node 学习完成");
        }, 3000);
    });
});
l.tapPromise('react', (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', data);
            resolve();
        }, 2000);
    });
});
l.promise('hcc').then(() => {
    console.log('end');
});



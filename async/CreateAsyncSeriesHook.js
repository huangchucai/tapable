/***
 * 异步串行, 第一个执行之后，第二个依次执行
 */
class CreateAsyncSeriesHook {
    constructor(...args) {
        this._args = args;
        this.tasks = [];
    }

    tapAsync(...args) {
        const callback = args.pop();
        this.tasks.push(callback);
    }

    callAsync(...args) {
        const finalCallback = args.pop();
        let index = 0;
        let next = () => {
            if (index === this.tasks.length) {
                return finalCallback();
            }
            this.tasks[index++](...args, next);
        };
        next();
    }
}


let l = new CreateAsyncSeriesHook();
l.tapAsync('node', (name, cb) => {
    setTimeout(() => {
        console.log('node', name);
        cb();
    }, 2000);
});
l.tapAsync('react', (name, cb) => {
    setTimeout(() => {
        console.log('react', name);
        cb();
    }, 1000);
});
l.callAsync('hcc', () => {
    console.log('end');
});



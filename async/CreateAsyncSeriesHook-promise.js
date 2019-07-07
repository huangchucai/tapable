/***
 * 异步串行, 第一个执行之后，第二个依次执行(Promise)
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
        const [first, ...others] = this.tasks;
        return others.reduce((p, task) => {
            return p.then(() => task(...args));
        }, first(...args));
    }
}


let l = new CreateAsyncSeriesHook();
l.tapAsync('node', (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name);
            resolve();
        }, 3000);
    });
});
l.tapAsync('react', (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name);
            resolve();
        }, 2000);
    });
});
l.callAsync('hcc').then(() => {
    console.log('end');
});



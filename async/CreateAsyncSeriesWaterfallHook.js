class AsyncSeriesWaterfallHook {
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
        let next = (err, data) => {
            const task = this.tasks[index];
            if (!task) return finalCallback();
            if (index === 0) {
                task(...args, next);
            } else {
                task(data, next);
            }
            index++;
        };
        next();
    }
}


let l = new AsyncSeriesWaterfallHook();
l.tapAsync('node', (name, cb) => {
    setTimeout(() => {
        console.log('node', name);
        cb(null, '结果');
    }, 2000);
});
l.tapAsync('react', (data, cb) => {
    setTimeout(() => {
        console.log('react', data);
        cb(null);
    }, 1000);
});
l.callAsync('hcc', () => {
    console.log('end');
});



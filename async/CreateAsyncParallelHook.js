class CreateAsyncParallelHook {
    constructor(...args) {
        this._args = args;
        this.tasks = [];
    }

    tapAsync(...args) {
        const callback = args.pop();
        this.tasks.push(callback);
    }

    tapPromise(...args) {
        this.tapAsync(...args);
    }

    promise(...args) {
        const promiseArr = this.tasks.map(task => task(...args));
        return Promise.all(promiseArr);
    }

    callAsync(...args) {
        const finalCallback = args.pop();
        let index = 0;

        const done = () => { // 类似于Promise.all
            if (++index == this.tasks.length) {
                finalCallback();
            }
        };

        this.tasks.forEach(task => {
            task(...args, done);
        });
    }
}


let l = new CreateAsyncParallelHook();
l.tapPromise('node', (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name);
            resolve();
        });
    });
});
l.tapPromise('react', (name) => {
    return new Promise((resolve => {
        setTimeout(() => {
            console.log('react', name);
            resolve();
        });
    }))
});
l.promise('hcc').then(() => {
    console.log('end');
});



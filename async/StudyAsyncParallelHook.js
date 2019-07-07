const {AsyncParallelHook} = require('tapable');

/***
 * 异步代码
 * 并行异步执行注册事件，等待事件全部完成调用对应的回调函数
 * 1. tapAsync tapPromise
 * 2. callAsync promise
 */


// 1. tapAsync/callAsync
class StudyAsyncParallelHook {

    constructor() {
        this.hooks = {
            arch: new AsyncParallelHook(['AsyncParallelHook'])
        };
    }

    tap() { // 注册的监听函数
        this.hooks.arch.tapAsync('node', (name, cb) => {
            setTimeout(() => {
                console.log('node', name);
                cb();
            });
        });
        this.hooks.arch.tapAsync('react', (name, cb) => {
            setTimeout(() => {
                console.log('react', name);
                cb();
            });
        });
    }

    start() {
        this.hooks.arch.callAsync('hcc', () => {
            console.log('都学习完了');
        });
    }
}

let l = new StudyAsyncParallelHook();
l.tap();
l.start();


// 2. tapPromise/promise
class PromiseAsyncParallelHook {

    constructor() {
        this.hooks = {
            arch: new AsyncParallelHook(['AsyncParallelHook'])
        };
    }

    tap() { // 注册的监听函数
        this.hooks.arch.tapPromise('node', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('node', name);
                    resolve();
                }, 1000);
            });
        });
        this.hooks.arch.tapPromise('react', (name) => {
            return new Promise((resolve => {
                setTimeout(() => {
                    console.log('react', name);
                    resolve();
                });
            }))
        });
    }

    start() {
        this.hooks.arch.promise('hcc').then(() => {
            console.log('都学习完了');
        });
    }
}

let l2 = new PromiseAsyncParallelHook();
l2.tap();
l2.start();

### 用gulp配合git进行代码部署上传
在项目中我们经常会需要先执行打包命令(比如npm run build)，再进行git部署,此时我们就需要进行多步操作，显然会很繁琐。使用这个gulp脚本即可完成一行命令打包部署,并且可以自定义commit内容。

### 安装
#### 克隆项目
`git clone git@github.com:Hzy0913/gulp-push.git`
#### 安装依赖
`npm install`

### 具体实现代码

```
var gulp = require('gulp');
var exec = require('child_process').exec;
var gulpSequence = require('gulp-sequence')
var argv = require('minimist')(process.argv.slice(2));



//RUN  npm run build   打包命令(按照你项目的打包命令配置)
gulp.task('build', function (cb) {
    exec('npm run build', function (err, stdout, stderr) {
        cb(err);
    });
});

//RUN cd child 进到子目录
var child='administrator'  //设置子目录变量名
gulp.task('child', function (cb) {
    exec('cd '+child, function (err, stdout, stderr) {
        cb(err);
    });
});

// cmd back 返回上一层
gulp.task('back', function (cb) {
    exec('cd ..', function (err, stdout, stderr) {
        cb(err);
    });
});

// add   等同于执行 git add * 命令(具体可以自己配置,如 add -A或者add .)
gulp.task('add', function (cb) {
  exec('git add *', function (err, stdout, stderr) {
    cb(err);
  });
});


// push  执行git push 操作
gulp.task('push', function (cb) {
  exec('git push', function (err, stdout, stderr) {
    cb(err);
  });
});

// pull  执行git pull 操作
gulp.task('pull', function (cb) {
  exec('git pull', function (err, stdout, stderr) {
    cb(err);
  });
});

// commit   附加自定义commit的push操作
var commitdefault='s'
gulp.task('commit', function (cb) {
  if(!argv.a){
    commitcon=commitdefault
  }else {
    var commitcon=argv.a
  }
  exec('git commit -m '+commitcon, function (err, stdout, stderr) {
    cb(err);
  });
});


//**********************具体使用命令*****************************

//  默认  gulp 命令推送到仓库  (如需自定义 commit  执行  gulp -a 自定义commit)
gulp.task( 'default', gulpSequence( 'add','commit', 'push'));

//    gulp b 命令执行build打包，并且推送到仓库 (如需自定义 commit  执行  gulp b -a 自定义commit)
gulp.task( 'b', gulpSequence( 'build','add', 'commit', 'push'));

//    gulp c 命令执行 子目录build打包，并且推送到仓库
gulp.task( 'c', gulpSequence( 'child','build','back','add', 'commit','push'));

//    gulp p 命令更新远程仓库
gulp.task( 'p', gulpSequence('pull'));

```
####  使用命令（____注意命令需要在你的Git Bash 中使用____）
1.__直接push代码到远程仓库__（git add * +git commit -m 's'  +git push）
`gulp`

2.__自定义commit内容push代码到远程仓库__（git add * +git commit -m 's' +git push）
`gulp -a 自定义commit`

3.__打包后push代码到远程仓库__（build后 git add * +git commit -m 自定义 +git push）
`gulp b`


4.__自定义commit内容push代码到远程仓库__（build后 git add * +git commit -m 自定义 +git push）
`gulp b -a 自定义commit`

5.__更新远程代码仓库__（git pull）
`gulp p`

__自定义commit命令并打包上传（在你的git bash命令行中）__
![](http://img.binlive.cn/upload/1508211655986)
__代码仓库已更新__
![](http://img.binlive.cn/upload/1508211720347)

const express = require('express');
const router = express.Router();
const Task = require('../model/task');
const { request } = require('express');

// ! Show Home (Index) - get: ========================================

// ! 1st Way: Two CallBAck Functions
router.get('/',function(request, response){
    Task.find(function(err, tasks){
        if ( err) return console.log(err);

        response.render('index',{tasks});
    });
});

// ! 2nd Way: Async Await with One CallBack Function

/* router.get('/', async (req,res)=>{

    const tasks = await Task.find();

    response.render('index',{tasks});
}); */

// ! Post data from Home (Index) - post: ========================================

// ! 1st Way: Two CallBAck Functions

router.post('/add', function(request, response){
    new Task(request.body).save(function(err, Task){
        response.redirect('/');
    });
});

// ! 2nd Way: Two CallBAck Functions long definition

/* router.post('/add', function(request, response){
    new Task({title:request.body.title,description:request.body.description}).save(function(err, Task){
        response.redirect('/');
    });
});
 */
// ! 3rd Way: Async Await with One CallBack Function

/* router.post('/add', async (req,res, next)=>{
    const task = new Task(req.body);

    await task.save();
    res.redirect('/');
});
 */

 // ! Delete your existing data - get: ========================================

 // ! 1st Way: Two CallBAck Functions

 router.get('/delete/:id', function(requset, response){

    let {id} = request.params;

    if (id){
        Task.deleteOne({_id:id},function(err, tasks){
            if(err) throw err;
            response.redirect('/');
        });
    } else {
        response.send('Please enter Id');
        response.end();
    }
 });

 // ! 2nd Way: Async Await with One CallBack Function

/*  router.get('/delete/:id', async (req,res,next)=>{
    let {id}=req.params;

    await Task.deleteOne({_id:id});
    res.redirect('/');
 }); */

  // ! Edit Page - get: ========================================

  // ! 1st Way: Two CallBAck Functions

  router.get('/edit/:id', function(request,response){
        Task.findById(request.params.id, function(err, task){
            if (err) return console.log(err);
            response.render('edit',{task});
        });
  });

  // ! 2nd Way: Async Await with One CallBack Function

/* 
  router.get('/edit/:id', async (req,res,next)=>{
        const task = await Task.findById(req.params.id);
        console.log(task);

        res.render('edit',{task});
  }); */

// ! Edit Page - post: ========================================

// ! 1st Way: Two CallBAck Functions

router.post('/edit/:id', function(request,response){

    let {id}= request.params;

    if(id){
        Task.update({_id:id}, request.body, function(err, tasks){
            if(err) throw err;
            response.redirect('/');
        });
    } else {
        response.send('Please enter Id');
        response.end();
    }
});

// ! 2nd Way: Async Await with One CallBack Function

/* router.post('/edit/:id', async (req,res,next)=>{
    const {id} = request.params;

    await Task.update({_id:id}, req.body);
    res.redirect('/');
}) */

// ! Turn (change) button color - get: ========================================

// ! 1st Way: Two CallBAck Functions

router.get('/turn/:id', function(request,response){
    let {id} = request.params;

    Task.findById(id, function(err, task){
        task.status = !task.status;

        task.save();
        response.redirect('/');
    });
});

// ! 2nd Way: Async Await with One CallBack Function

/* router.get('/turn/:id', async (req,res,next)=>{
    let {id} = request.params;

    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();

    response.redirect('/');
});
 */

 // ! Export Router to app.js: ========================================

 module.exports = router;
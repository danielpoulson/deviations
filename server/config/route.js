const router = module.exports = require('express').Router();
const auth = require('./auth');
const changes = require('../controllers/changes');
const projects = require('../controllers/projects');
const tasks = require('../controllers/tasks');
const files = require('../controllers/files');
const users = require('../controllers/users');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '.././uploaded/')
  },

  filename: function (req, file, cb) {
    cb(null, file.fieldname);
  }
});

const upload = multer({ storage: storage });

//*******************Start Login routes*********************

// router.get('/login', function (req, res) {
//     res.render('login.html');
// });

router.post('/login', auth.authenticate);
// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }));

router.get('/logout', function (req, res) {
    req.logout();
    res.sendStatus(200);
});

// function loginRequired (req, res, next) {
//     if (req.isAuthenticated()) {
//        exports.required = loginRequired;   res.redirect('/login');
//     }
// }

//*******************End Login routes*********************

//**********User Routes ***************
   router.get('/api/allusers', users.getAllUsers);
   router.get('/api/user/:id', users.getUser);
   router.get('/api/loggeduser', users.getLoggedUser);
   router.put('/api/updateuser/:username', users.updateUser);
   // TODO: MED Remove when new create user is complete.
   router.post('/signup', users.createUser);
   router.post('/api/user', users.createUser);
   router.delete('/api/user/:id', users.deleteUser);


//**********User Routes ***************

//--------- Changes--------------------

router.route('/api/changes/:status')
    .get(changes.getChanges);

router.post('/api/changes', changes.createChange);
router.put('/api/changelog/:id', changes.updateChangeComment);

// TODO: LOW (MAJOR) - Get files and tasks that are associated with a change when download a change
// A change requires the associated tasks and files to be downloaded at the same time however
// currently these are all downloaded with seperate calls. At the application level the state of a change
// should be associated with the task and the files so changes to state are managed together.
router.route('/api/change/:id')
    .get(changes.getChangeById)
    .put(changes.updateChange);

router.post('/export/changes', changes.dumpChanges);

router.get('/api/userdashboard/:user', changes.getUserDashboard);

//--------- Changes--------------------


router.route('/api/projects/:status')
//    .all(console.log("chirps route"),
//        login.required
//})
    .get(projects.getProjects);


    //Projects
    router.post('/api/projects', projects.createProject);

  router.route('/api/project/:id')
    .get(projects.getProjectById)
	.put(projects.updateProject)
 	.post(projects.createProject);
  // app.delete('/api/project/:id', projects.deleteProject);

router.route('/api/projectList/:status')
//    .all(console.log("chirps route"),
//        login.required
//})
    .get(projects.getProjectList);

  //Task

  router.get('/api/project/tasks/:id', tasks.getProjectTaskList);
//  app.get('/api/tasks', tasks.getTasks);
  router.get('/api/alltasks/:status', tasks.getTasks);
  router.get('/api/task/:id', tasks.getTaskById);
  router.put('/api/task/:id', tasks.updateTask);
  router.post('/api/task', tasks.createTask);
  router.delete('/api/tasks/:id', tasks.deleteTask);
  router.post('/export/tasks', tasks.dumpTasks);

  router.get('/api/files/:files', files.getFiles);
  router.get('/api/files/:files', files.getFiles);
  router.get('/api/filecount/:id', files.getFileCount);
  router.put('/api/filebooked/:id', files.updateFileBook);

    //**********File function ***************
 router.get('/server/upload/:file', files.downloadFile);
 router.get('/server/upload/:file', files.downloadFile);
  //app.post('/api/files', files.createFile);
  router.post('/server/upload', upload.any(), files.uploadFile);
  router.delete('/server/delete/:id', files.deletefile);
  //router.get('/api/exportcsv', deviations.dumpDeviation);

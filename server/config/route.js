const router = module.exports = require('express').Router();
const auth = require('./auth');
const deviations = require('../controllers/deviations');
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

router.post('/login', auth.authenticate);

router.get('/logout', function (req, res) {
    req.logout();
    res.sendStatus(200);
});

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

// router.route('/api/changes/:status')
//     .get(changes.getChanges);
//
// router.post('/api/changes', changes.createChange);
// router.put('/api/changelog/:id', changes.updateChangeComment);
//
// // TODO: LOW (MAJOR) - Get files and tasks that are associated with a change when download a change
// // A change requires the associated tasks and files to be downloaded at the same time however
// // currently these are all downloaded with seperate calls. At the application level the state of a change
// // should be associated with the task and the files so changes to state are managed together.
// router.route('/api/change/:id')
//     .get(changes.getChangeById)
//     .put(changes.updateChange);
//
// router.post('/export/changes', changes.dumpChanges);
//
// router.get('/api/userdashboard/:user', changes.getUserDashboard);
//

 //*************Deviation Routes************************
 router.get('/api/deviationlist/:status/:cust', deviations.getDeviations);
 router.get('/api/deviation/:id', deviations.getDeviationById);
 router.get('/api/deviation/tasks/:id', tasks.getDeviationTaskList);
 router.put('/api/deviations/:id', deviations.updateDeviation);
 router.post('/api/deviations', deviations.createDeviation);
// //--------- Changes--------------------
//
//
// router.route('/api/projects/:status')
//     .get(projects.getProjects);
//
//
//     //Projects
//     router.post('/api/projects', projects.createProject);
//
//   router.route('/api/project/:id')
//     .get(projects.getProjectById)
// 	.put(projects.updateProject)
//  	.post(projects.createProject);
//
// router.route('/api/projectList/:status')
//     .get(projects.getProjectList);

  //Task

 //  router.get('/api/project/tasks/:id', tasks.getProjectTaskList);
  router.get('/api/alltasks/:status/:capa', tasks.getTasks);
  router.get('/api/task/:id', tasks.getTaskById);
  router.put('/api/task/:id', tasks.updateTask);
  router.post('/api/task', tasks.createTask);
  router.delete('/api/tasks/:id', tasks.deleteTask);
 //  router.post('/export/tasks', tasks.dumpTasks);
 //
 
  router.get('/api/files/:files', files.getFiles);
  router.get('/api/filecount/:id', files.getFileCount);
 //  router.put('/api/filebooked/:id', files.updateFileBook);
 //
 //    //**********File function ***************
 // router.get('/server/upload/:file', files.downloadFile);
 // router.get('/server/upload/:file', files.downloadFile);
 //  router.post('/server/upload', upload.any(), files.uploadFile);
 //  router.delete('/server/delete/:id', files.deletefile);

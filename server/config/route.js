const router = module.exports = require('express').Router();
const auth = require('./auth');
const deviations = require('../controllers/deviations');
const tasks = require('../controllers/tasks');
const files = require('../controllers/files');
const users = require('../controllers/users');
const loggers = require('../controllers/loggers');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '.././uploads/')
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

 //*************Deviation Routes************************
 router.get('/api/deviationlist/:status/:cust', deviations.getDeviations);
 router.get('/api/deviation/:id', deviations.getDeviationById);
 router.get('/api/deviation/tasks/:id', tasks.getDeviationTaskList);
 router.put('/api/deviations/:id', deviations.updateDeviation);
 router.post('/api/deviations', deviations.createDeviation);
//*************Deviation Routes************************

//*************Logger Routes************************
router.post('/api/logger', loggers.createLog);
router.get('/api/logger/:id', loggers.getLog);
//*************Logger Routes************************
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
  router.put('/api/filebooked/:id', files.updateFileBook);
 //
 //    //**********File function ***************
router.get('/server/upload/:file', files.downloadFile);
router.get('/server/upload/:file', files.downloadFile);
router.post('/server/upload', upload.any(), files.uploadFile);
router.delete('/server/delete/:id', files.deletefile);

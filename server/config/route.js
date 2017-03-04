const router = module.exports = require('express').Router();
const auth = require('./auth');
const deviations = require('../controllers/deviations');
const tasks = require('../controllers/tasks');
const files = require('../controllers/files');
const users = require('../controllers/users');
const loggers = require('../controllers/loggers');
const multer = require('multer');
const config = require('./config');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.uploads);
  },

  filename: function (req, file, cb) {
    cb(null, file.fieldname);
  }
});

const upload = multer({ storage: storage });

// TODO: (2) Add authentication by using "auth.required" to protect routes

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
 router.get('/api/loggeduser', auth.required, users.getLoggedUser);
 router.put('/api/updateuser/:username', users.updateUser);
 router.post('/signup', users.createUser);
 router.post('/api/user', users.createUser);
 router.delete('/api/user/:id', auth.required, users.deleteUser);

 // router.get('/usermaint', users.formatDB);


//**********User Routes ***************

//*************Deviation Routes************************
router.get('/api/deviationlist/:status/:cust', deviations.getDeviations);
router.get('/api/deviation/:id', deviations.getDeviationById);
router.get('/api/deviation/tasks/:id', tasks.getDeviationTaskList);
router.put('/api/deviations/:id', deviations.updateDeviation);
router.post('/api/deviations', deviations.createDeviation);
router.post('/export/deviations', deviations.dumpDeviations);

router.get('/api/userdashboard/:user', deviations.getUserDashboard);
router.get('/api/graphdata', deviations.getGraphData);
// router.get('/api/olddashboard', deviations.getDashboard);
//*************Deviation Routes************************

//*************Logger Routes************************
router.post('/api/logger', loggers.createLog);
router.get('/api/logger/:id', loggers.getLog);
//*************Logger Routes************************

//Task

router.get('/api/alltasks/:status/:capa', tasks.getTasks);
router.get('/api/task/:id', tasks.getTaskById);
router.put('/api/task/:id', tasks.updateTask);
router.post('/api/task', tasks.createTask);
router.delete('/api/tasks/:id', tasks.deleteTask);
router.post('/export/tasks', tasks.dumpTasks);

router.get('/api/files/:files', files.getFiles);
router.get('/api/filecount/:id', files.getFileCount);
router.put('/api/filebooked/:id', files.updateFileBook);
//
//    //**********File function ***************
router.get('/server/upload/:file', files.downloadFile);
router.post('/server/upload', upload.any(), files.uploadFile);
router.delete('/server/delete/:id', files.deletefile);

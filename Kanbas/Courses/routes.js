import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsdao from "../Assignments/dao.js";

export default function CourseRoutes(app) {


  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(course);
  })

  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });
 

 app.delete("/api/courses/:courseId", async (req, res) => {
   const { courseId } = req.params;
   const status = await dao.deleteCourse(courseId);
   res.send(status);
 });


 app.put("/api/courses/:courseId", async (req, res) => {
  const { courseId } = req.params;
  const courseUpdates = req.body;
  const status = await dao.updateCourse(courseId, courseUpdates);
  res.send(status);
});



  //Modules
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });
 


  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    console.log("In routes: ",module);
    const newModule = await modulesDao.createModule(module);
    console.log("In routes after create: ",newModule);
    res.send(newModule);
  });


  //Assignments
app.get("/api/courses/:courseId/assignments", async (req, res) => {
  const { courseId } = req.params;
  const assignments = await assignmentsdao.findAssignmentsForCourse(courseId);
  res.json(assignments);
});


app.post("/api/courses/:courseId/assignments", async (req, res) => {
  const { courseId } = req.params;
  const assignment = {
    ...req.body,
    course: courseId,
  };
  const newAssignment = await assignmentsdao.createAssignment(assignment);
  res.send(newAssignment);
});


//Users for a course

 

//   // Route to enroll a user in a course
//   app.get("/api/users/:userId/courses", (req, res) => {
//     let { userId } = req.params;
//     if (userId === "current") {
//       const currentUser = req.session["currentUser"];
//       if (!currentUser) {
//         res.sendStatus(401);
//         return;
//       }
//       userId = currentUser._id;
//     }
//     const courses = courseDao.findCoursesForEnrolledUser(userId);
//     res.json(courses);
//   });
// }
}






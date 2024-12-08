import * as modulesDao from "./dao.js";
export default function ModuleRoutes(app) {

  // app.post("/api/courses/:courseId/modules", async (req, res) => {
  //   const { courseId } = req.params;
  //   const module = {
  //     ...req.body,
  //     course: courseId,
  //   };
  //   console.log("In routes: ",module);
  //   const newModule = await modulesDao.createModule(module);
  //   res.send(newModule);
  // });
 

  app.delete("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const status = await modulesDao.deleteModule(moduleId);
    res.send(status);
  });
 
  app.put("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = await modulesDao.updateModule(moduleId, moduleUpdates);
    res.send(status);
  });
 

}
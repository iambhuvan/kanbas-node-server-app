import * as assignmentsdao from "./dao.js";
export default function AssignmentsRoutes(app) {
 app.delete("/api/assignments/:assignmentId",async (req, res) => {
   const { assignmentId } = req.params;
   await assignmentsdao.deleteAssignment(assignmentId);
   res.sendStatus(204);
 });

 app.put("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    await assignmentsdao.updateAssignment(assignmentId, assignmentUpdates);
    res.sendStatus(204);
  });

}
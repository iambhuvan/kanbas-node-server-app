// Kanbas/Assignments/routes.js
import db from "../Database/index.js";

function AssignmentRoutes(app) {
    // Get all assignments for a course
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.filter((a) => a.course === cid);
        res.json(assignments);
    });

    // Get assignment by ID
    app.get("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignment = db.assignments.find((a) => a._id === aid);
        if (!assignment) {
            res.status(404).send("Assignment not found");
            return;
        }
        res.json(assignment);
    });

    // Create assignment
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.assignments.unshift(newAssignment);
        res.json(newAssignment);
    });

    // Update assignment
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
        if (assignmentIndex === -1) {
            res.status(404).send("Assignment not found");
            return;
        }
        db.assignments[assignmentIndex] = {
            ...db.assignments[assignmentIndex],
            ...req.body,
        };
        res.json(db.assignments[assignmentIndex]);
    });

    // Delete assignment
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
        if (assignmentIndex === -1) {
            res.status(404).send("Assignment not found");
            return;
        }
        db.assignments.splice(assignmentIndex, 1);
        res.sendStatus(200);
    });
}

export default AssignmentRoutes;
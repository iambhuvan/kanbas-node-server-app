import * as dao from "./dao.js";
import * as enrollmentsDao from "../Database/enrollments.js"

export default function EnrollmentRoutes(app) {
    app.get("/api/users/:userId/enrollments", (req, res) => {
        const { userId } = req.params;
        try {
            const enrollments = dao.findEnrollmentsForUser(userId);
            res.json(enrollments);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });

    // Enroll a user in a course
    app.post("/api/users/:userId/enrollments", (req, res) => {
        const { userId } = req.params;
        const { courseId } = req.body;

        try {
            const newEnrollment = dao.enrollUserInCourse(userId, courseId);
            res.status(201).json(newEnrollment);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    });

    // Unenroll a user from a course
    app.delete("/api/users/:userId/enrollments/:courseId", (req, res) => {
        const { userId, courseId } = req.params;

        try {
            dao.unenrollUserFromCourse(userId, courseId);
            res.sendStatus(204); // No content
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
}